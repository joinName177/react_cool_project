import React, { useRef, useState } from "react";
import { routerPaths } from "componets/basic_data";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./home.less";
import { useMount, useToggle } from "ahooks";
import $c from "classnames";
import {  MenuProps } from "antd";
import { Dropdown } from "antd";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import Breadcrumbsd from "view/Breadcrumb";
import UserProfile from "view/userProfile";
import { connect } from "react-redux";
const items: MenuProps["items"] = [
  {
    key: "1",
    label: <div>主题一</div>,
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        主题二
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        主题三
      </a>
    ),
  },
];

const MainPage = (props: any) => {
  const [collapsed, { toggle }] = useToggle(true);
  const [open, { toggle: openToggle }] = useToggle(false);
  const [selectKey, setSelectKey] = useState("");
  // const navigate = useNavigate();
  const pdfRef = useRef(null);

  useMount(() => {
    // navigate("/root/home");
  });
  return (
    <div className="home_wolf h_100 flex flow" ref={pdfRef}>
      <header className="flex center">
        <div className="logo">
          <span className="flex center between">
            <span className="flex center ">
              <span className="fj_icon"></span>TRAVELER
            </span>
            <UserProfile />
          </span>
        </div>
      </header>
      <div className="my_app_wrap flex">
        <div className={$c("home_wolf_l", { width54: !collapsed })}>
          <div
            className={$c("flex center", {
              between: collapsed,
              flexend: !collapsed,
            })}
          >
            {collapsed && (
              <Breadcrumbsd updateSelect={(key) => setSelectKey(key)} />
            )}
            <span
              onClick={() => {
                props.updateCollapsed(new Date().getTime());
                toggle();
              }}
              style={{ fontSize: 16, cursor: "pointer", color: "#404588" }}
            >
              <MenuUnfoldOutlined rotate={collapsed ? 180 : 0} />
            </span>
          </div>
          <Dropdown
            menu={{ items }}
            trigger={["click"]}
            placement="bottom"
            open={open}
            overlayClassName="homeDropDown"
            arrow={{ pointAtCenter: true }}
            onOpenChange={openToggle}
          >
            <div className="home_worl_l_c flex center">
              <div className="flex center">
                <span className="theme_icon"></span>
                <div
                  className={$c("theme_msg flex flow", { hide: !collapsed })}
                >
                  <span>自定义主题</span>
                  <span className="text-ellipsis">简约</span>
                </div>
              </div>
              <span
                className={$c("drop_down_icon", {
                  open: open,
                  hide: !collapsed,
                })}
              ></span>
            </div>
          </Dropdown>

          <div className="home_worl_l_b">
            {routerPaths.map((item) => (
              <NavLink
                onClick={() => setSelectKey(item.key)}
                to={item.path}
                key={item.key}
              >
                <div
                  className={$c("r_item", {
                    r_item_active: item.key === selectKey,
                  })}
                >
                  <span className={`r_item_icon ${item.icon}`}></span>
                  <span
                    className={$c({
                      hide: !collapsed,
                    })}
                  >
                    {item.name}
                  </span>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
        <div className="home_wolf_r">
          <div className="my_app_right">
            <div className="my_app_content h_100">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
//创建mapDispatchToProps方法-使用箭头函数实现，最后action会被作为一个props传递给组件
const mapDispatchToProps = (dispatch: any) => {
  // 需要返回一个对象
  return {
    updateCollapsed: (timeStr: boolean) => {
      dispatch({
        type: "COLLAPSED",
        data: timeStr,
      });
    },
  };
};
// export default MainPage;
export default connect(null, mapDispatchToProps)(MainPage);
