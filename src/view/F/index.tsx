import React, { useState } from "react";
import { Provider, Consumer } from "../../utils/context";
import { Button } from "antd";
export default function F() {
  const [name, setName] = useState(0);
  return (
    <div className="h_100">
      <div style={{ border: "2px dashed #6b6e6e", padding: 24 }}>
        <Button
          onClick={() => {
            setName(Math.random() * 10);
          }}
        >
          更新content
        </Button>
        <h1>context组件值传递</h1>
        <Provider value={JSON.stringify(name)}>
          <Son />
        </Provider>
      </div>
    </div>
  );
}

/**
 * 子组件
 * @returns
 */
const Son = () => {
  return (
    <Consumer>
      {(name) => (
        <div
          style={{ color: "#1677ff", border: "2px solid #1677ff", padding: 24 }}
        >
          <h2>子组件获取到的值:{name}</h2>
          <GrandSon />
        </div>
      )}
    </Consumer>
  );
};

const GrandSon = () => {
  return (
    <Consumer>
      {(name) => (
        <div
          style={{ color: "#1bd8cc", border: "1px solid #1bd8cc", padding: 24 }}
        >
          <h2>孙组件获取到的值:{name}</h2>
        </div>
      )}
    </Consumer>
  );
};
