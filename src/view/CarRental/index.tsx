import { Anchor } from "antd";
import React from "react";
import "./index.less";
const { Link } = Anchor;

// 车型管理
// 车型挑选
export default function CarRental() {
  return (
    <div className="CarRental h_100 flex">
      <div className="CarRental_l h_100">
        <Anchor
          getContainer={() => {
            const ele: any = document.getElementById("CarRental");
            return ele;
          }}
        >
          <Link
            href="#components-anchor-cxgl"
            title={
              <div className="anchor-nav-item flex center">
                <span className="cxgl-icon"></span>
                车型管理
              </div>
            }
          />
          <Link
            href="#components-anchor-cxtx"
            title={
              <div className="anchor-nav-item flex center">
                <span className="cxtx-icon"></span>
                车型挑选
              </div>
            }
          />
        </Anchor>
      </div>
      <div className="CarRental_r h_100" id="CarRental">
        <div className="h_100" id="components-anchor-cxgl">
          222222222
        </div>
        <div className="h_100" id="components-anchor-cxtx">
          333333333
        </div>
      </div>
    </div>
  );
}
