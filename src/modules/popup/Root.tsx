import React from "react";
import Header from "./Header/Header";
import ScrollableBlock from "./ScrollableBlock/ScrollableBlock";
import TabBar from "./TabBar/TabBar";
import { LocalizationProvider } from "../../Localization/LocalizationContext";

export default function Root() {
  return (
    <LocalizationProvider>
      <div className="vkToolsRoot">
        <Header />
        <ScrollableBlock />
        <TabBar />
      </div>
    </LocalizationProvider>
  );
}
