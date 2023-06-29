import React from "react";
import { Avatar } from "antd";
export const columns = [
  {
    key: "header_profile",
    title: "头像",
    dataIndex: "header_profile",
    render(_: any, recode: any) {
      console.log(recode);
      return <UserAvater {...recode} />;
    },
  },
  {
    key: "userName",
    title: "姓名",
    dataIndex: "userName",
  },
];

interface AvaterpRops {
  profile: string;
  userName: string;
}
export const UserAvater = ({ profile, userName }: AvaterpRops) => {
  if (!!profile) {
    return <Avatar size={32} src={profile} />;
  }
  return <Avatar size={32}>{userName.substr(-2, 2)}</Avatar>;
};
