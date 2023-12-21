import React from "react";
import { Avatar, Button, Form, Input, message } from "antd";
import defaultAvatar from "../../assets/images/admin.svg";
import { findUser } from "utils/interface";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
const formItemLayout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};

export interface UserItemProps {
  userId: string;
  userName: string;
  password: string;
  profile: string;
  phone: string;
  isManager: number;
  sex: number
  email: string
}

interface LoginFormProps {
  setFalse: () => void;
  saveStoreUser?: (_u: UserItemProps) => void;
}

function LoginForm({ setFalse, saveStoreUser }: LoginFormProps) {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    //进入主页
    findUser({ userName: values.userName }).then((data: any) => {
      if (!data) {
        return message.error("账号未注册！无法登录。");
      }
      //校验密码
      if (data.password === values.password) {
        //将登录用户信息存入store
        saveStoreUser && saveStoreUser(data)
        //进入主页
        navigate("/root");
      } else {
        message.error("密码错误!");
      }
    });
  };
  return (
    <Form
      name="validate_other"
      form={form}
      {...formItemLayout}
      onFinish={onFinish}
      initialValues={{
        userName: "",
        password: "",
      }}
    >
      <Form.Item>
        <div className="flex" style={{ justifyContent: "center" }}>
          <Avatar size={62} src={defaultAvatar}></Avatar>
        </div>
      </Form.Item>
      <Form.Item
        name="userName"
        label=""
        hasFeedback
        rules={[{ required: true, message: "请输入账号!" }]}
      >
        <Input
          prefix={<span className="per_user_icon"></span>}
          placeholder="账号"
          autoFocus
          size="large"
        ></Input>
      </Form.Item>
      <Form.Item
        name="password"
        label=""
        hasFeedback
        rules={[{ required: true, message: "请输入密码!" }]}
      >
        <Input.Password
          prefix={<span className="per_pwd_icon"></span>}
          placeholder="密码"
          size="large"
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
        <div className="flex" style={{ justifyContent: "space-between" }}>
          <Button
            type="link"
            style={{ padding: 0, color: "#c7c9c8" }}
            className="flex center"
            icon={<span className="zc_button"></span>}
            onClick={setFalse}
          >
            注册
          </Button>
          <Button
            type="primary"
            className="flex center"
            icon={<span className="login_button"></span>}
            htmlType="submit"
          >
            登录
          </Button>
        </div>
      </Form.Item>
    </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
