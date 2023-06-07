import React, { useRef, useState } from "react";
import {
  Avatar,
  DatePicker,
  Form,
  Input,
  Mentions,
  Modal,
  Radio,
  message,
} from "antd";
import { useBoolean, useMount } from "ahooks";
import "./index.less";
import ImageModal from "./ImageModal";
import { updateUsre } from "utils/interface";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
/**
 * 个人中心
 * @returns
 */
interface IndividualProps {
  open: boolean;
  msg: object | any;
  handleCancel: () => void;
  onOk: (storeData: any) => void;
}

export default function Individual({
  open,
  msg,
  handleCancel,
  onOk,
}: IndividualProps) {
  const imgRef = useRef(null);
  const [form] = Form.useForm();
  const [imgUrl, setImgUrl] = useState("");
  const [visible, { setTrue, setFalse }] = useBoolean(false);
  const onFinish = (values: any) => {
    const birthDay = values["birthDay"].format("YYYY-MM-DD");
    updateUsre({
      ...values,
      userId: msg.userId,
      birthDay,
    }).then((_r: any) => {
      message.success("修改成功！");
      onOk({
        ...values,
        birthDay,
      });
    });
  };
  useMount(() => {
    setImgUrl(msg.profile);
    form.setFieldsValue({
      userName: msg.userName,
      profile: msg.profile,
      phone: msg.phone,
      sex: msg.sex,
      email: msg.email,
      birthDay: dayjs(msg.birthDay, "YYYY-MM-DD"),
    });
  });
  return (
    <Modal
      width={400}
      open={open}
      title="个人中心"
      closable={!visible}
      onCancel={handleCancel}
      onOk={() => {
        form.submit();
      }}
    >
      <Form
        name="validate_other"
        form={form}
        {...formItemLayout}
        onFinish={onFinish}
      >
        <Form.Item
          name="userName"
          label="昵称"
          hasFeedback
          rules={[{ required: true, message: "请输入账号!" }]}
        >
          <Input
            size="middle"
            style={{ width: "100%" }}
            placeholder="账号"
          ></Input>
        </Form.Item>
        <Form.Item label="头像" name="profile" hasFeedback>
          <Avatar size={42} src={imgUrl} onClick={setTrue}></Avatar>
        </Form.Item>
        <Form.Item name="phone" label="手机号" hasFeedback rules={[{}]}>
          <Input size="middle" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="性别" hasFeedback rules={[{}]}>
          <Form.Item noStyle name="sex">
            <Radio.Group size="middle">
              <Radio value={0}>男</Radio>
              <Radio value={1}>女</Radio>
            </Radio.Group>
          </Form.Item>
        </Form.Item>
        <Form.Item name="email" label="邮箱" hasFeedback rules={[{}]}>
          <Mentions
            style={{ width: "100%" }}
            defaultValue=""
            options={[
              {
                value: "qq.com",
                label: "qq.com",
              },
              {
                value: "163.com",
                label: "163.com",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="生日"
          name="birthDay"
          hasFeedback
          rules={[
            {
              type: "object" as const,
              required: true,
              message: "请选择出生日期!",
            },
          ]}
        >
          <DatePicker
            clearIcon={false}
            suffixIcon={<div className="global_picker_icon"></div>}
          />
        </Form.Item>
      </Form>
      <ImageModal
        visible={visible}
        onCancel={setFalse}
        isRadio={true}
        ref={imgRef}
        updateFormFied={(url) => {
          setFalse();
          setImgUrl(url);
          form.setFieldValue("profile", url);
        }}
      />
    </Modal>
  );
}
