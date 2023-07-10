import React, { forwardRef, useImperativeHandle, useState } from "react";
// import Cookies from "js-cookie";
import { useMount, useUnmount } from "ahooks";
import { Tree } from "antd";
import { TreeData } from "./data";
const TreeNode = Tree.TreeNode;
/**
 * #############部门树################
 * _____________默认显示一级部门_______
 * ##异步加载，通过部门请求成员组装到对应的部门下##
 */

const DepartmentTree = forwardRef((_, ref) => {
  const [treeData, setTreeData] = useState<Array<any>>(TreeData);
  useImperativeHandle(ref, () => {});
  useMount(() => {
    // Cookies.set("name", "程志强@wolf");
    // console.log(Cookies.get("name"));
    // 处理人员数据
  });
  useUnmount(() => {
    console.log("组件卸载");
    handeTreeData(TreeData)
    console.log(TreeData)
  });

  const handeTreeData = (arr: Array<any>) => {
    for (let i = 0; i < arr.length; i++) {
      arr[i].title = <span style={{ color: "red" }}>{arr[i].name}</span>;
      if(arr[i].hasChild){
        handeTreeData(arr[i].children)
      }
    }
  };
  return (
    <div className="member_l h_100">
      <Tree checkable treeData={treeData} />
    </div>
  );
});
export default DepartmentTree;
