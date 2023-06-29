import { useBoolean } from "ahooks";
import { Input, Modal, Space } from "antd";
import React, { useRef, useState } from "react";
import type { DraggableData, DraggableEvent } from "react-draggable";
import Draggable from "react-draggable";
import "./index.less";
import LeftRowTable from "./leftRowTable";
import RightRowTable from "./rightRowTable";
/**
 * 人员选择器组件研发
 * 1) 查询所有的成员信息
 * 2) 展示到左侧待选区域
 * 3) 支持单选多选成员且成员能够被回显到已选区域
 * 4) 左侧支持搜索成员《后续开发》
 * @returns
 */

type userItem = {
  userId: string;
  userName: string;
  profile: string;
};

interface MemberProps {
  visible: boolean; //弹窗显隐状态
  list: Array<userItem>; //用于右侧回显的数据信息
  onCancel: () => void;
  onSure: (_data_: Array<userItem>) => void;
}

export default function MemberSelect({
  list,
  visible,
  onCancel,
  onSure,
}: MemberProps) {
  const leftRef = useRef<any>(null);
  const rightRef = useRef<any>(null);

  const [rightRows, setRightRows] = useState<Array<userItem>>([]);
  const [disabled, { setTrue, setFalse }] = useBoolean(false);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = useRef<HTMLDivElement>(null);

  const handleOk = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    onCancel();
  };

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    onCancel();
  };

  const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  return (
    <Modal
      wrapClassName="member_select_modal"
      width={800}
      bodyStyle={{
        height: 400,
      }}
      title={
        <div
          style={{
            width: "100%",
            cursor: "move",
          }}
          onMouseOver={() => {
            if (disabled) {
              setFalse();
            }
          }}
          onMouseOut={setTrue}
          onFocus={() => {}}
          onBlur={() => {}}
        >
          人员选择
        </div>
      }
      okText="确定"
      cancelText="取消"
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      modalRender={(modal) => (
        <Draggable
          disabled={disabled}
          bounds={bounds}
          onStart={(event, uiData) => onStart(event, uiData)}
        >
          <div ref={draggleRef}>{modal}</div>
        </Draggable>
      )}
    >
      <div className="member_select_content h_100 flex">
        <div className="member_left">
          <Space align="center" style={{ marginBottom: 16 }}>
            <Input />
          </Space>
          <LeftRowTable ref={leftRef} />
        </div>
        <div className="member_right">
          <RightRowTable ref={rightRef} />
        </div>
      </div>
    </Modal>
  );
}
