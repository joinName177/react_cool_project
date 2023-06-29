import { useRequest } from "ahooks";
import { Avatar, Table } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { queryUsers } from "utils/interface";
import { columns } from "./columns";
import { UserItem } from "view/userProfile/component/UserManage";

const LeftRowTable = forwardRef((_, ref) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Array<string>>([]);
  const { data: leftRows, loading } = useRequest(() => queryUsers(), {
    refreshDeps: [], //为后续筛选做准备
  });
  console.log("XXXXXXXXXXX", leftRows);
  useImperativeHandle(ref, () => {});

  const selectRow = (record: UserItem) => {
    const _selectedRowKeys = [...selectedRowKeys];
    if (_selectedRowKeys.indexOf(record.userId) >= 0) {
      _selectedRowKeys.splice(_selectedRowKeys.indexOf(record.userId), 1);
    } else {
      _selectedRowKeys.push(record.userId);
    }
    setSelectedRowKeys(_selectedRowKeys);
    
  };
  const onSelectedRowKeysChange = (selectedRowKeys: Array<string>) => {
    setSelectedRowKeys(selectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectedRowKeysChange,
  };
  return (
    <Table
      rowSelection={rowSelection}
      columns={columns}
      showHeader
      dataSource={leftRows}
      pagination={false}
      scroll={{ y: 260 }}
      onRow={(record) => ({
        onClick: () => {
          selectRow(record);
        },
      })}
      rowKey={(row: UserItem) => row.userId}
    />
  );
});

export default LeftRowTable;
