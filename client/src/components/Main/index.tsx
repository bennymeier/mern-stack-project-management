import React from "react";
import SelectRoom from "../Room/SelectRoom";
import "./style.css";
import Insert from "../Message/Insert";
import Show from "../Message/Show/Show";

const Main = () => {
  return (
    <main className="main">
      <SelectRoom />
      <Insert />
      <Show />
    </main>
  );
};

export default Main;
