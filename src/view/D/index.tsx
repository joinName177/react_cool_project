import React, { useState } from "react";
import { get, post } from "../../utils/service";
import { useMount, useRequest } from "ahooks";
import { Image, Select } from "antd";
import CompontPdf from "componets/html2canvas_jspdf/compont_pdf";

export default function D() {
  return <CompontPdf>
    
  </CompontPdf>;
}

async function getWather(city: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let $key = encodeURI(city);
    get(
      `/simpleWeather/query?city=${$key}&key=5c5f9610735ae937531b4b1ddc11e096`
    )
      .then((res: any) => resolve(res))
      .catch((err) => reject(err));
  });
}

function DF() {
  const [city, setCity] = useState("成都");
  const { data, loading } = useRequest(() => getWather(city), {
    refreshDeps: [city],
  });
  function handleChange(value: string) {
    setCity(value);
  }
  return (
    <div>
      {data && <p>{JSON.stringify(data)}</p>}
      {loading && <b>加载中.....</b>}
      <Select
        defaultValue="成都"
        style={{ width: 120 }}
        onChange={handleChange}
        options={[
          {
            value: "成都",
            label: "成都",
          },
          {
            value: "北京",
            label: "北京",
          },
          {
            value: "广州",
            label: "广州",
          },
        ]}
      />
    </div>
  );
}
