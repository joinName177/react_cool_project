import { Avatar, Dropdown } from "antd";
// import type { MenuProps } from "antd";
import React, { useState } from "react";
import { connect } from "react-redux";
import { UserItemProps } from "view/Login/LoginForm";
import avatarImg from "../../assets/images/admin.svg";
import {
  CoffeeOutlined,
  PoweroffOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useBoolean, useMount } from "ahooks";
import Individual from "./component/Individual";
import UserManage from "./component/UserManage";

interface UserProfileProps {
  loginUserInfo?: UserItemProps;
  saveStoreUser?: (data: UserItemProps) => void;
}

function UserProfile({ loginUserInfo, saveStoreUser }: UserProfileProps) {
  const navigate = useNavigate();
  const [individual, { setTrue, setFalse }] = useBoolean(false);
  const [visible, { setTrue: setTrueManage, setFalse: setFalseManage }] =
    useBoolean(false);
  const [items, setItems] = useState([
    {
      label: "个人中心",
      key: "1",
      icon: <CoffeeOutlined />,
      onClick: setTrue,
    },
    {
      label: "退出登录",
      key: "2",
      icon: <PoweroffOutlined />,
      onClick: () => {
        //重定向到登录页面
        navigate("/login");
        //清空redux存储和sessionStorage
        sessionStorage.setItem("userInfo", "");
      },
    },
  ]);
  
  function getProfile() {
    return {
      avatar: loginUserInfo?.profile ? loginUserInfo?.profile : avatarImg,
      name: loginUserInfo?.profile ? "" : loginUserInfo?.userName,
    };
  }
  const { avatar, name } = getProfile();

  useMount(() => {
    // console.log("____________________--*&(*", loginUserInfo?.isManager === 2);
    console.log(loginUserInfo);
    if(!loginUserInfo?.userId){
      //重定向到401页面
      navigate("/p_401");
      return
    }
    if (loginUserInfo?.isManager === 2) {
      setItems([
        {
          label: "成员管理",
          key: "0",
          icon: <TeamOutlined />,
          onClick: () => {
            setTrueManage()
          },
        },
        ...items,
      ]);
    }
  });
  return (
    <>
      <Dropdown
        overlayClassName="user_info_drop"
        menu={{ items }}
        trigger={["click"]}
      >
        <div className="user_info flex center">
          <span style={{ marginRight: 8 }}>
            欢迎你!{loginUserInfo?.userName}
          </span>
          <Avatar src={avatar}>{name}</Avatar>
        </div>
      </Dropdown>
      {individual && (
        <Individual
          open={individual}
          handleCancel={setFalse}
          msg={loginUserInfo || {}}
          onOk={(data) => {
            setFalse();
            saveStoreUser &&
              saveStoreUser({
                ...loginUserInfo,
                ...data,
              });
          }}
        />
      )}
      {visible && (
        <UserManage
          isModalOpen={visible}
          handleCancel={setFalseManage}
          handleOk={() => {
            setFalseManage();
          }}
        />
      )}
    </>
  );
}
const mapStateToProps = (state: any) => {
  return state;
};

//创建mapDispatchToProps方法-使用箭头函数实现，最后action会被作为一个props传递给组件
const mapDispatchToProps = (dispatch: any) => {
  // 需要返回一个对象
  return {
    // 对象使用key-value的形式。另外根据对redux使用可以知道sendAction也是一个方法实现
    saveStoreUser: (data: any) => {
      // 利用dispatch发送一个action
      dispatch({
        // action必须要有type属性
        type: "LOGIN_USER_INFO",
        data: data,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
