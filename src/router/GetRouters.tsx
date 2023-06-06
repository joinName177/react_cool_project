import React from "react";
import { useRoutes } from "react-router-dom";
//V6文档
// https://blog.csdn.net/weixin_47431743/article/details/124284878
import MainPage from '../main'
import Hotel from "view/hotel";
import Home from "view/home";
import B from "view/B";
import C from "view/C";
import D from "view/D";
import E from "view/E";
import F from "view/F";
import G from "view/G";
import DataManage from "view/DataModule/DataManage";
import CarRental from "view/CarRental";
import Login from "view/Login";

//动态路由
const Getrouters = () => {
  return useRoutes([
    {
      path: "",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/root",
      element: <MainPage />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "/root/home",
          element: <Home />,
        },
        {
          path: "/root/hotel",
          element: <Hotel />,
        },
        {
          path: "/root/b",
          element: <B />,
        },
        {
          path: "/root/c",
          element: <C />,
          children: [
            {
              path: "",
              element: <F />,
            },
            {
              path: "f",
              element: <F />,
            },
            {
              path: "g",
              element: <G />,
            },
          ],
        },
        {
          path: "/root/d",
          element: <D />,
        },
        {
          path: "/root/e",
          element: <E />,
        },
        {
          path: "/root/carRental",
          element: <CarRental />,
        },
        { path: "/root/dataManage", element: <DataManage /> },
      ],
    },
  ]);
};

export default Getrouters;
