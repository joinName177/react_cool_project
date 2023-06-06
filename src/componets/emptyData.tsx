import { Image } from "antd";
import React from "react";
import imgUrl from "../assets/images/暂无数据.png";
interface Empty {
  tips?: string;
  width?: number;
  height?: number;
  hideTips?: boolean;
}

export default function EmptyData({
  tips = "暂无数据",
  width = 180,
  height = 180,
  hideTips = false,
}: Empty) {
  return (
    <div
      className="h_100 flex center"
      style={{ justifyContent: "center" }}
    >
      <div className="flex center flow">
        <Image width={width} height={height} src={imgUrl} preview={false} />
        <p style={{ color: "#b1b5bc" }}>{tips}</p>
      </div>
    </div>
  );
}
