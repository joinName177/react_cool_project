import React from "react";
import { Button, Form, Input, message, Image } from "antd";
import { addUser, findUser } from "utils/interface";
import { uuid } from "utils/utils";
import { SendOutlined,LoginOutlined } from "@ant-design/icons";
import zcIcon from "../../assets/images/zhuce.svg";
const formItemLayout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};
interface RegProps {
  setTrue: () => void;
}
export default function RegisterForm({ setTrue }: RegProps) {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log(values);
    //校验账号是否已被注册
    findUser({ userName: values.userName }).then((data) => {
      console.log(data);
      if (data) {
        return message.error("账号已被注册！请重新输入。");
      }
      const _params_ = {
        ...values,
        userId: uuid(),
        profile: "",
        phone: "",
        isManager: 0, //1管理员 2超级管理员
        sex: 0, //0男 1女
        email: "", //电子邮件
        birthDay:"",
      };
      addUser(_params_).then((res: any) => {
        console.log(res);
        if (res.code === 200) {
          message.success("注册成功!");
          //跳转到登录界面
          setTrue();
        }
      });
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
          <Image width={62} height={62} src={zcIcon} preview={false} />
        </div>
      </Form.Item>
      <Form.Item
        name="userName"
        label=""
        hasFeedback
        rules={[{ required: true, message: "请输入账号！" }]}
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
        rules={[
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                callback("请输入密码！");
              } else {
                const _v = value.replace(/\s*/g, "");
                const reg = /^(?=.*[a-z])(?=.*[0-9]).{6,}$/;
                if (reg.test(_v)) {
                  callback();
                }
                callback("密码格式为6位以上字母+数字");
              }
            },
          },
        ]}
      >
        <Input.Password
          prefix={<span className="per_pwd_icon"></span>}
          placeholder="密码"
          size="large"
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
        <div className="flex between">
          <Button
            type="link"
            style={{ padding: 0, color: "#c7c9c8" }}
            className="flex center"
            icon={<LoginOutlined />}
            onClick={setTrue}
          >
            登录
          </Button>
          <Button type="primary" htmlType="submit" icon={<SendOutlined />}>
            提交
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}
