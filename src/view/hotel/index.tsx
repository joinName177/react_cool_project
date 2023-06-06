import { Button } from "antd";
import EmptyData from "componets/emptyData";
import React from "react";
import { connect } from "react-redux";
/**
 * 酒店模块
 */
export const index = (props: any) => {
  const { count, handelLogin } = props;
  return (
    <div className="hotel_module h_100">
      {/* <h1>{count}</h1>
      <Button onClick={handelLogin}>加一</Button> */}
        <EmptyData />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return state;
};

//创建mapDispatchToProps方法-使用箭头函数实现，最后action会被作为一个props传递给组件
const mapDispatchToProps = (dispatch: any) => {
  // 需要返回一个对象
  return {
    // 对象使用key-value的形式。另外根据对redux使用可以知道sendAction也是一个方法实现
    handelLogin: () => {
      // 利用dispatch发送一个action
      dispatch({
        // action必须要有type属性
        type: "ADD_ACTION",
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
