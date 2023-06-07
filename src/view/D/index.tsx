import React, { useState } from "react";
import { get } from "../../utils/service";
import { useRequest } from "ahooks";
import { Select, Table } from "antd";
import CompontPdf from "componets/html2canvas_jspdf/compont_pdf";
import EmptyData from "componets/emptyData";

/**
 * 测试PDF导出组件
 * @returns 
 */
export default function D() {
  return (
    <CompontPdf title={new Date().getTime()}>
      <DF />
    </CompontPdf>
  );
}

type dataType = {
  city: string;
  future: Array<any>;
  realtime: any;
};
interface DataProps {
  error_code: Number;
  reason: string;
  result: dataType;
}

async function getWather(city: string): Promise<DataProps> {
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
  const columns = [
    {
      title: "日期",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "风向",
      dataIndex: "direct",
      key: "direct",
    },
    {
      title: "温差",
      dataIndex: "temperature",
      key: "temperature",
    },
    {
      title: "风级",
      dataIndex: "x",
      key: "x",
      render: (_: any, item: any) => (
        <div>
          {item.wid.day}-{item.wid.night}
        </div>
      ),
    },
  ];

  console.log(data);

  // future
  if (data?.error_code !== 0) {
    return <EmptyData tips={data?.reason} />;
  }

  return (
    <div className="h_100" style={{ padding: 12 }}>
      {loading && <b>加载中.....</b>}
      {!loading && data && (
        <Table
          title={() => (
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
          )}
          dataSource={data.result.future}
          columns={columns}
          pagination={false}
          showHeader
        />
      )}
    </div>
  );
}
