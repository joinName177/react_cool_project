import CompontPdf from "componets/html2canvas_jspdf/compont_pdf";
import React from "react";
import "./index.less";
import { useRequest } from "ahooks";
import { queryAttachment } from "utils/interface";
import WaterFall from "componets/waterfall";
export default function E() {
  const { data, loading, refresh } = useRequest(() => queryAttachment());
  console.log(data);
  return (
    <div className="photo_album">
      <CompontPdf>
        <WaterFall imgData={data || []} />
      </CompontPdf>
    </div>
  );
}
