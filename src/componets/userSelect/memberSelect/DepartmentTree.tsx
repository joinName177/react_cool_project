import React, { forwardRef, useImperativeHandle, useState } from "react";
import Cookies from "js-cookie";
import { useMount, useUnmount } from "ahooks";
import { Tree } from "antd";
import { TreeData } from "./data";
/**
 * #############部门树################
 * _____________默认显示一级部门_______
 * ##异步加载，通过部门请求成员组装到对应的部门下##
 */
interface TreeItemNode {
  title: string;
  key: string;
  isLeaf?: boolean;
  children?: TreeItemNode[];
}
const DepartmentTree = forwardRef((_, ref) => {
  const initTreeData: TreeItemNode[] = [
    { title: "Expand to load", key: "0" },
    { title: "Expand to load", key: "1" },
    { title: "Tree Node", key: "2", isLeaf: true },
  ];
  const [treeData, setTreeData] = useState(initTreeData);
  useImperativeHandle(ref, () => {});
  useMount(() => {
    console.log("组件挂在");
    Cookies.set("name", "程志强@wolf");
    console.log(Cookies.get("name"));
  });
  useUnmount(() => {
    console.log("组件卸载");
  });

  const updateTreeData = (
    list: TreeItemNode[],
    key: React.Key,
    children: TreeItemNode[]
  ): TreeItemNode[] =>
    list.map((node) => {
      if (node.key === key) {
        return {
          ...node,
          children,
        };
      }
      if (node.children) {
        return {
          ...node,
          children: updateTreeData(node.children, key, children),
        };
      }
      return node;
    });

  const onLoadData = ({ key, children }: any) =>
    new Promise<void>((resolve) => {
      if (children) {
        resolve();
        return;
      }
      setTimeout(() => {
        setTreeData((origin) =>
          updateTreeData(origin, key, [
            { title: "Child Node", key: `${key}-0` },
            { title: "Child Node", key: `${key}-1` },
          ])
        );

        resolve();
      }, 1000);
    });

  return (
    <div className="member_l h_100">
      <Tree /*loadData={onLoadData}*/ treeData={TreeData} />
    </div>
  );
});
export default DepartmentTree;
