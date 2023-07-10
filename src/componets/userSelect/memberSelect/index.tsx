import React, { useRef } from "react";
import { Input, Modal, Watermark } from "antd";
import "./index.less";
import DepartmentTree from "./DepartmentTree";
import SelectedMember from "./SelectedMember";
// import WaterMark from "watermark-component-for-react";
type userItem = {
  userId: string;
  userName: string;
  profile: string;
};

interface TreeModalProps {
  visible: boolean; //弹窗显隐状态
  list: Array<userItem>; //用于右侧回显的数据信息
  onCancel: () => void;
  onSure: (_data_: Array<userItem>) => void;
}
export default function MemberTreeSelect({
  list,
  visible,
  onCancel,
  onSure,
}: TreeModalProps) {
  const memberRef = useRef<any>(null);
  const treeNavRef = useRef<any>(null);
  return (
    <Modal
      open={visible}
      wrapClassName="member_tree_select"
      closable={false}
      destroyOnClose
      width={640}
      bodyStyle={{
        height: 564,
      }}
      title={null}
      footer={null}
    >
      <Watermark
        style={{ height: "100%" }}
        content={"wolf@9527"}
        font={{ fontSize: 16 }}
      >
        <div className="member_content h_100">
          <DepartmentTree ref={treeNavRef} />
          <SelectedMember ref={memberRef} onCancel={onCancel} />
        </div>
      </Watermark>
      
    </Modal>
  );
}
