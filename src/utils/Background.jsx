import React from "react";

const Background = ({ children, color }) => {
  return <div className={color}>{children}</div>;
};

export default Background;
