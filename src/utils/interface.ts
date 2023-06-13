//当前模块，API进行统一管理，即对请求接口统一管理
import axios from "axios";
import { type } from "os";
export const httpPrefix = "http://127.0.0.1:3300";

/**
 * 查询附件
 * @returns 
 */
const queryAttachment = (): Promise<Array<any>> => {
  return new Promise((resolve) => {
    axios.post(httpPrefix + "/queryAttachment", {}).then((res) => {
      resolve(res.data);
    });
  });
};
/**
 * 删除附件
 * @param params 
 * @returns 
 */
const deleteAttachment = (params:any) => {
  return new Promise((resolve) => {
    axios.post(httpPrefix + "/deleteAttachment", params).then((res) => {
      resolve(res.data);
    });
  });
};

/**
 * 查询人员信息
 * @param params 
 * @returns 
 */
const findUser = (params:any) => {
  return new Promise((resolve) => {
    axios.post(httpPrefix + "/findUser", params).then((res) => {
      resolve(res.data);
    });
  });
};
/**
 * 新增人员信息
 * @param params 
 * @returns 
 */
const addUser = (params:any) => {
  return new Promise((resolve) => {
    axios.post(httpPrefix + "/addUser", params).then((res) => {
      resolve(res.data);
    });
  });
};
/**
 * 更新人员信息
 * @param params 
 * @returns 
 */
const updateUsre = (params:any)=>{
  return new Promise((resolve) => {
    axios.post(httpPrefix + "/updateUsre", params).then((res) => {
      resolve(res.data);
    });
  });
}

const queryUsers = () => {
  return new Promise((resolve) => {
    axios.post(httpPrefix + "/queryUsers").then((res) => {
      resolve(res.data);
    });
  });
}

const addCarousel = (params:any)=>{
  return new Promise((resolve) => {
    axios.post(httpPrefix + "/addCarousel",params).then((res) => {
      resolve(res.data);
    });
  });
}
const queryCarousel = (): Promise<Array<any>>=>{
  return new Promise((resolve) => {
    axios.post(httpPrefix + "/queryCarousel").then((res) => {
      resolve(res.data);
    });
  });
}
const deleteCarousel = (params:any) => {
  return new Promise((resolve) => {
    axios.post(httpPrefix + "/deleteCarousel", params).then((res) => {
      resolve(res.data);
    });
  });
};
export {
    queryAttachment,
    deleteAttachment,
    findUser,
    addUser,
    updateUsre,
    queryUsers,
    addCarousel,
    queryCarousel,
    deleteCarousel
}
