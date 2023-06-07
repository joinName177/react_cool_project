import { Avatar, Button, Form, Modal, Table, Typography, message } from "antd";
import React, { useState } from "react";
import { queryUsers, updateUsre } from "../../../utils/interface";
import { useMount } from "ahooks";
import EditableCell from "./EditableCell";
import { ManOutlined, WomanOutlined } from "@ant-design/icons";
import "./modal.less";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

/**
 * 封装
 * 可编辑的人员表格组件
 */
interface UserModalProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

export interface UserItem {
  userId?: string;
  userName: string;
  password: string;
  profile: string;
  phone: string;
  isManager: number; //1管理员 2超级管理员
  sex: number; //0男 1女
  email: string; //电子邮件
  birthDay: string;
}

export default function UserManage({
  isModalOpen,
  handleOk,
  handleCancel,
}: UserModalProps) {
  const [form] = Form.useForm();
  const [data, setData] = useState<Array<UserItem>>([]);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record: UserItem) => record.userId === editingKey;
  //查询成员账户信息
  useMount(() => {
    queryUsers().then((data: any) => {
      const newData = data.map((item: UserItem) => {
        return {
          ...item,
          birthDay: dayjs(item.birthDay, "YYYY-MM-DD"),
        };
      });
      setData(newData);
    });
  });
  const edit = (record: Partial<UserItem> & { userId: React.Key }) => {
    form.setFieldsValue({
      userName: "",
      password: "",
      profile: "",
      phone: "",
      email: "",
      ...record,
    });
    setEditingKey(record.userId);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as UserItem;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.userId);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        const birthDay: any = row.birthDay;
        updateUsre({
          ...row,
          userId: key,
          isManager: !!row.isManager ? 1 : 0,
          birthDay:
            Object.prototype.toString.call(birthDay) === "[object String]"
              ? birthDay
              : birthDay.format("YYYY-MM-DD"),
        }).then((_r: any) => {
          message.success("修改成功！");
          setData(newData);
          setEditingKey("");
        });
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "昵称",
      dataIndex: "userName",
      width: "15%",
      editable: true,
    },
    {
      title: "密码",
      dataIndex: "password",
      width: "10%",
      editable: true,
    },
    {
      title: "头像",
      dataIndex: "profile",
      width: "5%",
      editable: true,
      render: (src: string) => {
        return <Avatar src={src}></Avatar>;
      },
    },
    {
      title: "手机",
      dataIndex: "phone",
      width: "10%",
      editable: true,
    },
    {
      title: "权限",
      dataIndex: "isManager",
      width: "15%",
      editable: true,
      render: (num: any) => {
        if (Object.prototype.toString.call(num) === "[object Boolean]") {
          return num ? "管理员" : "";
        }
        return num === 2 ? "超级管理员" : num === 1 ? "管理员" : "";
      },
    },
    {
      title: "邮箱",
      dataIndex: "email",
      width: "15%",
      editable: true,
    },
    {
      title: "性别",
      dataIndex: "sex",
      width: "6%",
      editable: true,
      render: (num: any) => {
        return num === 0 ? (
          <ManOutlined style={{ color: "#1677ff" }} />
        ) : (
          <WomanOutlined style={{ color: "#ff4d4f" }} />
        );
      },
    },
    {
      title: "生日",
      dataIndex: "birthDay",
      width: "15%",
      editable: true,
      render: (date: any) => {
        if (Object.prototype.toString.call(date) === "[object String]") {
          return date;
        }
        return date.format("YYYY-MM-DD");
      },
    },
    {
      title: "操作",
      dataIndex: "operation",
      render: (_: any, record: any) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.userId || "")}
              style={{ marginRight: 8 }}
            >
              保存
            </Typography.Link>
            <Typography.Link onClick={cancel}>取消</Typography.Link>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            修改
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: UserItem) => ({
        record,
        inputType: col.dataIndex,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Modal
      destroyOnClose
      wrapClassName="global_larg_modal manage_modal"
      title={
        <div className="modal_header">
          <span>成员管理</span>
          <span className="cancel" onClick={handleCancel}></span>
        </div>
      }
      closable={false}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={<Button onClick={handleCancel}>cancel</Button>}
    >
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </Modal>
  );
}
