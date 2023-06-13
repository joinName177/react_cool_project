import { useBoolean, useRequest } from "ahooks";
import { Image, Space, Spin } from "antd";
import React, { useRef } from "react";
import { addCarousel, deleteCarousel, queryCarousel } from "utils/interface";
import ImageModal from "view/userProfile/component/ImageModal";
import { DeleteOutlined } from "@ant-design/icons";
// declare const window: any;

// 首页轮播数据管理
export default function CarouselManage() {
  const imgRef = useRef<any>(null);
  const [visible, { setTrue, setFalse }] = useBoolean(false);
  const { data, loading, refresh, run } = useRequest(() => queryCarousel());
  const arr = Array.isArray(data) ? data : [];
  const deleteHandel = (uid: string) => {
    deleteCarousel({ uid }).then((res) => {
      console.log(res);
      run();
    });
  };
  const handelImgs = (_arr: Array<any>) => {
    const imgArr = [];
    for (let i = 0; i < _arr.length; i++) {
      const hasSelect = arr.find((_el: any) => _el.uid === _arr[i].uid);
      if (!hasSelect) {
        imgArr.push(_arr[i]);
      }
    }
    return imgArr
  };
  return (
    <div className="home_carouse_manage">
      <Spin spinning={loading} tip="loading...">
        <Space size={[8, 8]} wrap>
          {arr.map((item) => (
            <span className="img_modal_item" key={item.uid}>
              <span className="del-icon" onClick={() => deleteHandel(item.uid)}>
                <DeleteOutlined />
              </span>
              <Image src={item.url} width={84} height={84} />
            </span>
          ))}
          <span
            className="add_btn"
            onClick={() => {
              imgRef.current.handle(arr);
              setTrue();
            }}
          >
            <span className="add_btn_icon"></span>
          </span>
        </Space>
      </Spin>

      <ImageModal
        visible={visible}
        onCancel={setFalse}
        isRadio={false}
        ref={imgRef}
        placement="left"
        updateFormFied={(imgUrls: any) => {
          setFalse();
          if (imgUrls.length > 0) {
            console.log(arr, imgUrls);
            //如果已经上传过的则不需要再进行上传
            const newImgs = handelImgs(imgUrls);
            for (let i = 0; i < newImgs.length; i++) {
              const { uid, url } = newImgs[i];
              addCarousel({ uid, url }).then((res) => {
                refresh();
              });
            }
          }
        }}
      />
    </div>
  );
}
