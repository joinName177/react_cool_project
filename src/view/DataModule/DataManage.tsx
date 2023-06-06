import React from "react";
import FileManage from "./FileManage";
import { Divider } from "antd";
import "./index.less";
import CarVertion from "./CarVertion";
import CarouselManage from "./CarouselManage";
/**
 * 数据中心
 * @returns
 */
export default function DataManage() {
  return (
    <div className="dataManage h_100">
      {/* 附件管理 */}
      <FileManage />
      <Divider orientation="left" plain>
        car
      </Divider>
      <CarVertion />
      <Divider orientation="left" plain>
        Carousel
      </Divider>
      <CarouselManage />
    </div>
  );
}
