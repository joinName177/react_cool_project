import React from "react";
//菜单列表
import { HomeOutlined } from "@ant-design/icons";
import { routerPaths } from "../../componets/basic_data/index";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useMount } from "ahooks";
//处理菜单列表的方法
// import menuKeyAndLaber from "@/compented/MenuKeyAndLaber";

export default function Breadcrumbsd({
  updateSelect,
}: {
  updateSelect: (key: string) => void;
}) {
  // 获取页面路由并集合成数组
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);

  // 存放路由和标题对应信息
  const [breadcrumbNameMap, setbreadcrumbNameMap] = useState([]);

  //初始化时对菜单列表进行处理
  useMount(() => {
    console.log('XXXXXXXXXXXXXX',routerPaths)
    setbreadcrumbNameMap(menuKeyAndLaber(routerPaths));
  });

  // 根据路由生成面包屑
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    // 根据路由数组循环遍历
    const url: any = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    console.log(url);
    updateSelect(url);
    if(url ==="/root"){
      return ""
    }
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });

  // 面包屑导航主题
  const breadcrumbItems = [
    //固定的首页面包屑，也可以不用
    <Breadcrumb.Item key="home">
      {/* //使用Link标签可以实现跳转 */}
      <Link to={"/root/home"}>
        <HomeOutlined />
      </Link>
    </Breadcrumb.Item>,
    ...extraBreadcrumbItems,
  ];

  return (
    <div className="breadcrumb">
      <Breadcrumb style={{ fontSize: 12 }}>{breadcrumbItems}</Breadcrumb>
    </div>
  );
}

// 获取菜单中路由和标题的信息
const menuKeyAndLaber = (lists: any) => {
  // debugger
  const list = JSON.parse(JSON.stringify(lists));
  let newObj: any = {};
  const degui = (list: any) => {
    list.forEach((item: any) => {
      for (const key in item) {
        if (key === "key") {
          newObj[item.key] = item.name;
        }
        if (key === "children") {
          //子菜单需要递归
          degui(item[key]);
        }
      }
    });
  };
  degui(list);
  return newObj;
};
