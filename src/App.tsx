import React from "react";
//引入react-redux相关文件
import store from "./store";
// 导入Povider组件，利用这个组件包裹项目结构，从而统一维护store
// Provider只是维护store,真正使用store还需要connect。connect可以把组件和store进行关联。
// mapStateToProps: (state, ownProps?) => Object，哪个组件需要接收store的数据，就实现该方法，如果不想订阅store更新可以传入null或者undefined代替mapStateToProps
// mapDispatchToProps?: Object | (dispatch, ownProps?) => Object，哪个组件需要发送store数据，就实现该方法。
import { Provider } from "react-redux";

import RootPage from "./rootIndex";


function App() {
  return (
    <Provider store={store}>
      <RootPage />
    </Provider>
  );
}

export default App;
