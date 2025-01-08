import React from "react";
import Header from "./Header/Header";
import ScrollableBlock from "./ScrollableBlock/ScrollableBlock";

export default function Root() {
  return (
    <div className="vkToolsRoot">
      <Header></Header>
      <ScrollableBlock />
    </div>
  );
}
