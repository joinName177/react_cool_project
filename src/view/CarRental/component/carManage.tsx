
import React from "react";
import { Col, Form, Row } from 'antd';
/**
 * 车型管理
 * @returns EleMent
 */

export default function CarManage() {
  const [form] = Form.useForm();
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  const onFinish = (values: any) => {}
  return (
    <Form
      name="validate_other"
      form={form}
      {...formItemLayout}
      onFinish={onFinish}
    >
        
    </Form>
  );
}
