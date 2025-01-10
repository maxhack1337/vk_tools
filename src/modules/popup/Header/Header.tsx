import React from "react";
import VKToolsSVG from "./VKToolsSVG";
import ClearCacheButton from "./clearCache/clearCacheButton";
import OpenInNewTabButton from "./openInNewTabButton";
import ThemeChangeButton from "./changeTheme/themeChangeButton";

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
