import React, { useRef } from "react";
import * as echarts from "echarts";
import { useMount, useUpdateEffect } from "ahooks";
import { connect } from "react-redux";
let myChart: any = null;
function Barchart(props: any) {
  const mainRef = useRef<any>(null);
  
  useUpdateEffect(() => {
    myChart.resize();
  }, [props.collapsed]);

  useMount(() => {
    myChart = echarts.init(mainRef.current);

    const option = {
      title: {
        text: "Rainfall",
        subtext: "",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["R", "E"],
      },
      toolbox: {
        show: true,
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ["line", "bar"] },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      calculable: true,
      xAxis: [
        {
          type: "category",
          data: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      grid: {
        show: false,
        top: "15%", // 一下数值可为百分比也可为具体像素值
        right: "5%",
        bottom: "5%",
        left: "10%",
      },
      series: [
        {
          name: "R",
          type: "bar",
          data: [
            2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,
          ],
          markPoint: {
            data: [
              { type: "max", name: "Max" },
              { type: "min", name: "Min" },
            ],
          },
          markLine: {
            data: [{ type: "average", name: "Avg" }],
          },
        },
        {
          name: "E",
          type: "bar",
          data: [
            2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,
          ],
          markPoint: {
            data: [
              { name: "Max", value: 182.2, xAxis: 7, yAxis: 183 },
              { name: "Min", value: 2.3, xAxis: 11, yAxis: 3 },
            ],
          },
          markLine: {
            data: [{ type: "average", name: "Avg" }],
          },
        },
      ],
    };
    myChart.setOption(option);
  });
  return <div className="bar_chart h_100" ref={mainRef}></div>;
}

const mapStateToProps = (state: any) => {
  return state;
};
export default connect(mapStateToProps, null)(Barchart);
