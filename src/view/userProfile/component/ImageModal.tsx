import { Button, Drawer, Image, message } from "antd";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { queryAttachment } from "utils/interface";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useMount, useUnmount } from "ahooks";
/**
 * 图片modal组件
 * @param {*} param0
 * @returns
 */
interface _imgPorps {
  visible: boolean;
  onCancel: () => void;
  updateFormFied: (src: string) => void;
  isRadio: boolean;
  height?: number;
  placement?: any;
}
const ImageModal = forwardRef(
  (
    {
      visible,
      onCancel,
      updateFormFied,
      isRadio,
      height = 492,
      placement = "top",
    }: _imgPorps,
    _ref
  ) => {
    const [images, setImages] = useState([]);
    const [selectItem, setSelectItem] = useState<any>({});
    const [selectItems, setSelectItems] = useState<any>([]);
    //查询附件信息
    useEffect(() => {
      if (!!visible) {
        queryAttachment().then((data: any) => {
          setImages(data);
        });
      }
    }, [visible]);

    useImperativeHandle(_ref, () => ({
      handle: (list: Array<any>) => {
        emptyState()
        //如果list不为空，则选中对应的图片
        if(list.length>0){
          setSelectItems(list)
        }
      },
    }));

    const emptyState = () => {
      setImages([]);
      setSelectItem({});
      setSelectItems([]);
    };

    const isActive = (uid: number) => {
      if (isRadio) {
        return selectItem.uid === uid;
      }
      const isIn = selectItems.find((item: any) => item.uid === uid);
      return !!isIn;
    };

    return (
      <Drawer
        title={null}
        placement={placement}
        closable={false}
        height={height}
        open={visible}
        onClose={onCancel}
        getContainer={false}
        footer={
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button style={{ marginRight: 12 }} onClick={onCancel}>
              取消
            </Button>
            <Button
              type="primary"
              onClick={() => {
                if (isRadio) {
                  updateFormFied(selectItem.url);
                } else {
                  const imgs: any = selectItems.filter((_rl: any) => _rl.url);
                  updateFormFied(imgs);
                }
              }}
            >
              确定
            </Button>
          </div>
        }
        style={{
          position: "absolute",
        }}
      >
        <div className="image_modal">
          {images.map((item: any, index) => (
            <div
              key={index}
              onClick={() => {
                if (isRadio) {
                  setSelectItem(item);
                  return;
                }
                //校验是否已经存在
                let arr: any = [...selectItems];
                const hasSelect = selectItems.find(
                  (_el: any) => _el.uid === item.uid
                );
                if (hasSelect) {
                  arr = selectItems.filter((_el: any) => _el.uid !== item.uid);
                } else {
                  arr.push(item);
                }
                setSelectItems(arr);
              }}
              className={`image_modal_item ${
                isActive(item.uid) ? "active" : ""
              }`}
            >
              <Image
                key={index}
                width={56}
                height={56}
                src={item.url}
                preview={false}
              />
              {isActive(item.uid) && (
                <CheckCircleOutlined className="outlined_icon" />
              )}
            </div>
          ))}
        </div>
      </Drawer>
    );
  }
);

export default ImageModal;
