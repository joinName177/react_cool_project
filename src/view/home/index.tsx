import React, { useState } from "react";
import "./index.less";
import SwiperComp from "componets/swiper/SwiperComp";
import Barchart from "componets/Echarts/barchart";
// import { Input, Badge } from "antd";
import { useMount, useRequest } from "ahooks";
// import { RSA_JM } from "utils/utils";
import { Avatar, Badge,Skeleton, Space } from "antd";
import { get } from "utils/service";
import { TagsOutlined } from "@ant-design/icons";
import EmptyData from "componets/emptyData";
// import GaugeClockk from "componets/Echarts/gaugeClockk";
export default function Home() {
  useMount(() => {
    // const testKey =
    //   "MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAMcSD7J4dc1H4MT8C1zEt9Bhr9VYxnJt8oIRGO0i9jjDqM13M7sNnKZxddIryTkRezeM1ySZpQ";
    // const str1 = RSA_JM("test01", true, testKey);
    // console.log("加密数据为", str1);
    // const str2 = RSA_JM(str1, false, testKey);
    // console.log("解密数据为", str2);
  });

  return <div className="home_module h_100"></div>

  // return (
  //   <div className="home_module h_100">
  //     <div className="home_module_top">
  //       <div>
  //         <Space size={[12, 12]} wrap>
  //           <div className="r_item r_item_1">
  //             <Space size={[6, 8]} wrap>
  //               <span className="r_item_span"></span>
  //               <span className="r_item_span"></span>
  //               <span className="r_item_span"></span>
  //               <span className="r_item_span"></span>
  //               <span className="r_item_span"></span>
  //               <span className="r_item_span"></span>
  //               <span className="r_item_span"></span>
  //               <span className="r_item_span"></span>
  //               <span className="r_item_span"></span>
  //               <span className="r_item_span"></span>
  //             </Space>
  //           </div>
  //           <div className="r_item r_item_2">
  //             <Space size={[12, 8]} wrap>
  //               <span className="r_item_span"></span>
  //               <span className="r_item_span"></span>
  //               <span className="r_item_span"></span>
  //               <span className="r_item_span"></span>
  //               <span className="r_item_span"></span>
  //               <span className="r_item_span"></span>
  //               <span className="r_item_span"></span>
  //               <span className="r_item_span"></span>
  //             </Space>
  //           </div>
  //           <Badge.Ribbon text="carhome" color="cyan">
  //             <div className="r_item r_item_3">
  //               <span className="article_bg"></span>
  //               <span className="article_if">
  //                 <span>Poetry and distance</span>
  //                 <span>The dream is far away very beautiful</span>
  //               </span>
  //             </div>
  //           </Badge.Ribbon>
  //           <Badge.Ribbon text="carlife" color="volcano">
  //             <div className="r_item r_item_4">
  //               <span className="article_bg"></span>
  //               <span className="article_if">
  //                 <span>Dream car</span>
  //                 <span>Lamborghini Poison</span>
  //               </span>
  //             </div>
  //           </Badge.Ribbon>
  //         </Space>
  //       </div>
  //       <div>
  //         {/* 图表时钟 */}
  //         {/* <GaugeClockk/> */}
  //         {/* 新闻模块 */}
  //         <ArticleNew />
  //       </div>
  //     </div>
  //     <div className="home_module_btm">
  //       <div>
  //         {/* 轮播 */}
  //         <SwiperComp />
  //       </div>
  //       <div>
  //         {/* 图表 */}
  //         <Barchart />
  //       </div>
  //     </div>
  //   </div>
  // );
}

// type newIyem = {
//   ctime: String;
//   description: String;
//   id: String;
//   picUrl: String;
//   source: String;
//   title: String;
//   url: String | any;
// };

// type datatype = {
//   allnum: Number;
//   curpage: Number;
//   newslist: Array<newIyem>;
// };

// interface NewsProps {
//   error_code: Number;
//   reason: String;
//   result: datatype;
// }
// async function getFinancialNews(): Promise<NewsProps> {
//   return new Promise((resolve, reject) => {
//     get(
//       "/fapigx/caijing/query?num=30&page=&rand=&word=&key=9ef63ef1e419a8d519d5719efff5a2ed"
//     )
//       .then((res: any) => resolve(res))
//       .catch((err) => reject(err));
//   });
// }

// // 新闻模块组件
// const ArticleNew = () => {
//   // 参数 num（int）请求数量 page（int）翻页 rand（int）是否随机获取 word（string）检索关键字
//   const [word, setWord] = useState("");
//   const { data, loading } = useRequest(() => getFinancialNews(), {
//     refreshDeps: [word],
//   });
//   // useMount(() => {
//   //   //请求news数据
//   // });
//   // console.log(data)
//   if(data?.error_code !==0){
//     const tips:any = data?.reason
//     return <EmptyData tips={tips}/>
//   }
//   return (
//     <div className="article_new_wrap">
//       {loading
//         ? new Array(3)
//             .fill("")
//             .map((_, _i) => (
//               <Skeleton
//                 paragraph={{ rows: 2 }}
//                 key={_i}
//                 loading={loading}
//                 active
//                 avatar
//               ></Skeleton>
//             ))
//         : data?.result.newslist.map(
//             (
//               { title, id, picUrl, description, url, source }: newIyem,
//               index
//             ) => (
//               <div
//                 key={index}
//                 className="article_new_item flex"
//                 onClick={() => {
//                   window.open(url);
//                 }}
//               >
//                 <div style={{ marginRight: 8 }}>
//                   <Avatar shape="square" src={picUrl} />
//                 </div>
//                 <div style={{width:'100%'}}>
//                   <div className="flex between">
//                     <span className="text-ellipsis">
//                       <TagsOutlined />
//                       <span style={{ color: "#545657" }}>{title}</span>
//                     </span>
//                     <span>来源：{source}</span>
//                   </div>
//                   <span className="text-more-ellipsis text-msg">{description}</span>
//                 </div>
//               </div>
//             )
//           )}
//     </div>
//   );
// };
