import React from "react";
import "./style.css";
export interface MainProps {
  children?: React.ReactNode;
}
const Main: React.FC<MainProps> = (props) => {
  const { children } = props;
  return <main className="main">{children}</main>;
};

export default Main;
