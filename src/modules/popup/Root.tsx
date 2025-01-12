import React, { useState } from "react";
import Header from "./Header/Header";
import ScrollableBlock from "./ScrollableBlock/ScrollableBlock";
import TabBar from "./TabBar/TabBar";
import { LocalizationProvider } from "../../Localization/LocalizationContext";

export default function Root() {
  const [valueFromTabbar, setValueFromTabbar] = useState("tab1");
  return (
    <LocalizationProvider>
      <div className="vkToolsRoot">
        <Header />
        <ScrollableBlock id={valueFromTabbar} />
        <TabBar onTabChange={setValueFromTabbar} />
      </div>
    </LocalizationProvider>
  );
}
