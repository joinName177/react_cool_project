/**
 * 该文件是创建reducer函数，专门用于处理发送过来的action
 */
const initState = {
  count: 0,
  loginUserInfo:
    !!sessionStorage.getItem("userInfo")
      ? JSON.parse(`${sessionStorage.getItem("userInfo")}`)
      : {
          userId: "",
          userName: "",
          password: "",
          profile: "",
          phone: "",
          isManager: 0, //1管理员 2超级管理员
          sex: 0, //0男 1女
          email: "", //电子邮件
        },
  collapsed: '',
};
// 函数需要传递两个参数：state,action
// @ts-ignore
const rootReducer = (state = initState, action) => {
  // console.log("reducer:", state, action);
  // 根据aciton中的type字段判断是否为发送过来的action，如果是则返回一个新的state
  switch (action.type) {
    case "ADD_ACTION":
      // 在reducer中返回了新的state，才能触发相关的接收组件获取新的数据
      return {
        ...state,
        count: state.count + 1,
      };
    case "LOGIN_USER_INFO":
      const _data_ = {
        userId: action.data.userId,
        userName: action.data.userName,
        password: action.data.password,
        profile: action.data.profile,
        phone: action.data.phone,
        isManager: action.data.isManager,
        sex: action.data.sex,
        email: action.data.email,
        birthDay: action.data.birthDay,
      };
      sessionStorage.setItem("userInfo", JSON.stringify(_data_));
      // console.log("_____登录用户信息______", _data_);
      return {
        ...state,
        loginUserInfo: _data_,
      };
    case "COLLAPSED":
      return {
        ...state,
        collapsed: action.data,
      };
    default:
      return state;
  }
};
export default rootReducer;
