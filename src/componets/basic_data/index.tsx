// 路由导航配置
export const routerPaths = [
  {
    key: "/root/home",
    icon: "zy_icon",
    path: "/root/home",
    name:"主页",
  },
  {
    key: "/root/hotel",
    icon: "jD_icon",
    path: "/root/hotel",
    name:"酒店",
  },
  {
    key: "/root/B",
    icon: "jd_icon",
    path: "/root/B",
    name:"景点",
  },
  {
    key: "/root/C",
    icon: "dt_icon",
    path: "/root/C",
    name:"地图",
    children:[
      {
        key: "/root/C/F",
        icon: "",
        path: "/root/C/F",
        name:"面板F",
      },
      {
        key: "/root/C/G",
        icon: "",
        path: "/root/C/G",
        name:"面板G",
      }
    ]
  },
  {
    key: "/root/D",
    icon: "ms_icon",
    path: "/root/D",
    name:"美食",
  },
  {
    key: "/root/E",
    icon: "fj_icon",
    path: "/root/E",
    name:"卡点",
  },
  {
    key: "/root/carRental",
    icon: "car_icon",
    path: "/root/carRental",
    name:"汽车租赁",
  },
  {
    key: "/root/dataManage",
    icon: "fl_icon",
    path: "/root/dataManage",
    name:"数据管理",
  },
];
