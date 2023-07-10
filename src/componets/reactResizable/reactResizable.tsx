import { Table } from "antd";
import React from "react";
import { Resizable } from "react-resizable";
// import "react-resizable/css/styles.css";
// import "../node_modules/react-resizable/css/styles.css";
import './index.less'
const dataSource:any = [
  {
    key: "1",
    name: "张三",
    age: 32,
    address: "西湖区湖底公园1号"
  },
  {
    key: "2",
    name: "李四",
    age: 42,
    address: "西湖区湖底公园1号"
  }
];

const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
    width: 110
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age",
    width: 90
  },
  {
    title: "住址",
    dataIndex: "address",
    key: "address",
    width: 220
  },
  {}
];

const ResizableTitle = (props:any) => {
  const { onResize, width, ...restProps } = props;
  if (width === undefined) {
    return <th {...restProps}></th>;
  }
  return (
    <Resizable width={width} height={0} onResize={onResize}>
      <th {...restProps}></th>
    </Resizable>
  );
};

export default class ReactResizable extends React.Component {
  constructor(props:any) {
    super(props);
    this.state = {
      dataSource,
      columns: columns.map((col:any) => {
        col.onHeaderCell = () => ({
          width: col.width,
          onResize: this.handleResize(col)
        });
        return col;
      })
    };
  }

  components = {
    header: {
      cell: ResizableTitle
    }
  };

  handleResize = (column:any) => (e:any, { size }:any) => {
    this.setState(({ columns }:any) => {
      columns.forEach((item:any) => {
        if (item === column) {
          item.width = size.width;
        }
      });

      return { columns };
    });
  };

  render() {
    const state:any = this.state
    return (
      <div>
        <Table
          bordered
          dataSource={state.dataSource}
          columns={state.columns}
          components={this.components}
         
        />
      </div>
    );
  }
}
