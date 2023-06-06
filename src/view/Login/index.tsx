import React from "react";

import "./login.less";
// 引入登录表单
import LoginForm from "./LoginForm";
// 引入注册表单
import RegisterForm from "./RegisterForm";
import { useBoolean } from "ahooks";
export default function Login() {
  const [isLogin, { setTrue, setFalse }] = useBoolean(true);
  return (
    <div className="login_module h_100 flex ">
      <div className="login_module_l"></div>
      <div className="login_module_r flex center">
        <div className="loginBox flex">
          <div>
            {isLogin ? (
              <LoginForm setFalse={setFalse} />
            ) : (
              <RegisterForm setTrue={setTrue}/>
            )}
          </div>
        </div>
      </div>

      <div className="header_logo flex center">
        <span></span>
        TRAVELER
      </div>
    </div>
  );
}
