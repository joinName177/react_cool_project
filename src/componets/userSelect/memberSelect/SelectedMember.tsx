import React, { forwardRef, useImperativeHandle } from "react";

interface SelectedProps {
  onCancel: () => void;
}
const SelectedMember = forwardRef(({ onCancel }: SelectedProps, ref) => {
  useImperativeHandle(ref, () => {});
  return (
    <div className="member_r">
      <div className="member_r_header">
        <span>已选择10人</span>
        <span onClick={onCancel}></span>
      </div>
      <div className="member_r_content"></div>
      <div className="member_r_footer">
        <span>确定</span>
        <span onClick={onCancel}>取消</span>
      </div>
    </div>
  );
});
export default SelectedMember;
