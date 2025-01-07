import React from "react";
import VKToolsSVG from "./VKToolsSVG";
import ClearCacheButton from "./clearCacheButton";
import OpenInNewTabButton from "./openInNewTabButton";
import ThemeChangeButton from "./themeChangeButton";

export default function Header() {
  return (
    <div className="vkToolsHeader">
      <div className="vkToolsHeaderButtons">
        <OpenInNewTabButton />
        <VKToolsSVG />
        <ClearCacheButton />
        <ThemeChangeButton />
      </div>
    </div>
  );
}
