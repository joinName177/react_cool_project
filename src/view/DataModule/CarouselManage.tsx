import { useBoolean, useRequest } from "ahooks";
import { Image, Space, Spin } from "antd";
import React, { useRef } from "react";
import { addCarousel, queryCarousel } from "utils/interface";
import ImageModal from "view/userProfile/component/ImageModal";
// declare const window: any;

// 首页轮播数据管理
export default function CarouselManage() {
  const imgRef = useRef(null);
  const [visible, { setTrue, setFalse }] = useBoolean(false);
  const { data, loading, refresh } = useRequest(() => queryCarousel());
  const arr = Array.isArray(data) ? data : [];
  return (
    <div className="home_carouse_manage">
      <Spin spinning={loading} tip="loading...">
        <Space size={[8, 8]} wrap>
          {arr.map((item) => (
            <span className="img_modal_item" key={item.uid}>
              <Image src={item.url} width={84} />
            </span>
          ))}
          <span className="add_btn" onClick={setTrue}>
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
        updateFormFied={(imgUrls) => {
          setFalse();
          console.log(imgUrls);
          addCarousel(imgUrls).then((res) => {
            console.log(res);
          });
        }}
      />
    </div>
  );
}
