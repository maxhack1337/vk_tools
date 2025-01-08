import React from "react";
import CurrentSVG from "./currentSVG";

export default function ThemeChangeButton() {
  return (
    <div id="themechange" className="vkenhancerThemeChanger">
      <button id="changerb" title="Сменить тему" type="button" className="vkenhancerButtonMoon vkenhancerButtonHeader">
        <CurrentSVG />
      </button>
    </div>
  );
}
