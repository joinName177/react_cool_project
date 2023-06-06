import React from "react";
import { Avatar, DatePicker, Form, Input, Switch } from "antd";
import { UserItem } from "./UserManage";
import { ManOutlined, WomanOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import 'dayjs/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "password" | "profile" | "phone" | "isManager" | "email" | "sex";
  record: UserItem;
  index: number;
  children: React.ReactNode;
}
const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  function renderNode() {
    if (inputType === "password") {
      return <Input.Password placeholder="密码" size="middle" />;
    } else if (inputType === "profile") {
      return <Avatar src={record.profile} />;
    } else if (inputType === "phone") {
      return <Input />;
    } else if (inputType === "isManager") {
      if(record.isManager === 2){
        return ""
      }
      return <Switch defaultChecked={!!record.isManager}/>;
    } else if (inputType === "email") {
      return <Input />;
    } else if (inputType === "sex") {
      return (
        <Switch
          checkedChildren={<ManOutlined />}
          unCheckedChildren={<WomanOutlined />}
          defaultChecked={record.sex === 0}
        />
      );
    } else if (inputType === "birthDay") {
      return (
        <DatePicker
          locale={locale}
          clearIcon={false}
          suffixIcon={<div className="global_picker_icon"></div>}
        />
      );
    } else {
      return <Input />;
    }
  }
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `请输入${title}!`,
            },
          ]}
        >
          {renderNode()}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;
