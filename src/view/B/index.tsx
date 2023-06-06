import React, { useEffect } from "react";
import { Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
//引入每个案例组件
import UseRequest from "./componets/useRequest";
import MoreAHook from "./componets/moreHook";
const { Panel } = Collapse;
export default function B() {
  useEffect(() => {
    document.title = "aHooks练习";
  }, []);
  return (
    <div>
      <Collapse
        accordion
        expandIconPosition="right"
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
      >
        <Panel header={<b>useRequest</b>} key="1">
          <UseRequest />
        </Panel>
        <Panel header={<b>scene更多封装ahooks</b>} key="2">
          <MoreAHook />
        </Panel>
      </Collapse>
    </div>
  );
}
