import React from "react";
import CurrentSVG from "./currentSVG";
import { useLocalization } from "../../../Localization/LocalizationContext";

export default function ThemeChangeButton() {
  const { t } = useLocalization();
  return (
    <div id="themechange" className="vkenhancerThemeChanger">
      <button id="changerb" title={t("changeTheme")} type="button" className="vkenhancerButtonMoon vkenhancerButtonHeader">
        <CurrentSVG />
      </button>
    </div>
  );
}
