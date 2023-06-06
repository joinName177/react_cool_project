import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Getrouters from "router/GetRouters";
// 入口文件
function RootIndex() {
  return (
    <div className="wolf_enter_root h_100">
      <Router>
        <Getrouters />
      </Router>
    </div>
  );
}
export default RootIndex;
