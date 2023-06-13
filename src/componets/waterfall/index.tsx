import React from "react";
import "./index.less";
interface WaterProps {
  imgData: Array<any>;
}
export default function WaterFall({ imgData }: WaterProps) {
  return (
    <div className="water_fall_box">
      {imgData.map((item: any, index: number) => (
        <div className="item" key={index}>
          <img src={item.url} alt="" />
        </div>
      ))}
    </div>
  );
}
