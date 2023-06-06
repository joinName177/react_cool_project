import { Upload, message } from "antd";
import type { UploadProps } from "antd/es/upload";
import React, { useMemo } from "react";
import { queryAttachment, deleteAttachment } from "../../utils/interface";
import { useRequest } from "ahooks";

/**
 * 资源数据模块
 * @returns
 */
export default function FileManage() {
  const { data = [], run } = useRequest(queryAttachment);
  /*点击上传时触发*/
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    console.log(newFileList);
    setTimeout(()=>{
      run();
    },1000)
  };

  const onRemove = (file: any) => {
    deleteAttachment(file).then((res: any) => {
      if (res.code === 200) {
        message.success("删除成功!");
        run();
      }
    });
    return false;
  };
  const list: any = data;
  const _uploadProps_: UploadProps = {
    action: "http://127.0.0.1:3300/upload",
    listType: "picture-card",
    onChange: handleChange, //0000
    onRemove: onRemove,
    multiple: true,
    fileList: list,
  };

  const renderUpload = useMemo(() => {
    return (
      <Upload {..._uploadProps_}>
        <div>
          <span className="upload_icon"></span>
        </div>
      </Upload>
    );
  }, [data]);

  return (
    <div className="upload_module">
      {renderUpload}
    </div>
  );
}
