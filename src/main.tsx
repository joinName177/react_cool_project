import React, { useRef, useState } from "react";
import { routerPaths } from "componets/basic_data";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./home.less";
import { useBoolean, useMount, useToggle } from "ahooks";
import $c from "classnames";
import { Button, MenuProps, message } from "antd";
import { Dropdown } from "antd";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import Breadcrumbsd from "view/Breadcrumb";
import UserProfile from "view/userProfile";
import { connect } from "react-redux";
import MemberSelect from "componets/userSelect";
import MemberTreeSelect from "componets/userSelect/memberSelect";
import ReactResizable from "componets/reactResizable/reactResizable";
import DragSort from "componets/dragsort/index"
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

const MainPage = (props: any): JSX.Element => {
  const [collapsed, { toggle }] = useToggle(true);
  const [open, { toggle: openToggle }] = useToggle(false);
  const [selectKey, setSelectKey] = useState("");
  // const navigate = useNavigate();
  const pdfRef = useRef(null);

  const [visible, { setFalse, setTrue }] = useBoolean(false);

  const [treeVsible, { setFalse: setTreeFalse, setTrue: setTreeTree }] =
    useBoolean(false);

  useMount(() => {
    // navigate("/root/home");
  });

  const openChatPanel = () => {
    message.success("研发中..........");
  };
  // 可拖拽宽度的表头
  // return <ReactResizable/>

  //拖拽排序
  // return <DragSort/>

  // return (
  //   <div>
  //     <Button onClick={setTrue}>打开成员选择</Button>
  //     <Button onClick={setTreeTree}>打开组织选择</Button>
  //     <MemberSelect
  //       list={[]}
  //       visible={visible}
  //       onCancel={setFalse}
  //       onSure={() => {
  //         setFalse();
  //       }}
  //     />
  //     <MemberTreeSelect
  //       list={[]}
  //       visible={treeVsible}
  //       onCancel={setTreeFalse}
  //       onSure={() => {
  //         setTreeFalse();
  //       }}
  //     />
  //   </div>
  // );

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
            style={{ padding: '0 12px 8px 12px', borderBottom: '1px solid #efefef7a' }}
            className={$c("flex center", {
              between: collapsed,
              flexCenter: !collapsed,
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
              style={{ fontSize: 16, cursor: "pointer", color: "rgb(75 76 79)" }}
            >
              <MenuUnfoldOutlined rotate={collapsed ? 180 : 0} />
            </span>
          </div>
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
                    smallItem: !collapsed
                  })}
                >
                  <span className={`r_item_icon ${item.icon} ${!collapsed ? 'r_item_icon_small' : ""}`}></span>
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
      {/* 沟通图标 */}
      <div className="main_chat" onClick={openChatPanel}></div>
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
