import React, { forwardRef, useImperativeHandle } from "react";

const RightRowTable = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => {});
  return <div></div>;
});
export default RightRowTable;
