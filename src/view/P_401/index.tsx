import { Button, Image } from "antd";
import React from "react";
import Img401 from "../../assets/images/401.svg";
import { SendOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
export default function P401() {
  const navigate = useNavigate();
  const jumpLogin = () => {
    navigate("/login");
  };
  return (
    <div
      className="h_100 flex flow center"
      style={{ justifyContent: "center" }}
    >
      <Image preview={false} width={260} src={Img401} />
      <span style={{ fontSize: 62, marginBottom: 12, color: "#d9d9d9" }}>
        401
      </span>
      <Button onClick={jumpLogin} type="primary" icon={<SendOutlined />}>
        去登录
      </Button>
    </div>
  );
}
