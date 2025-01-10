import React, { useState, useEffect } from "react";
import CurrentSVG from "./currentSVG";
import { useLocalization } from "../../../../Localization/LocalizationContext";
import "./theme-light.css";

export default function ThemeChangeButton() {
  const { getLang: t } = useLocalization();
  const [isThemeChanged, setIsThemeChanged] = useState<boolean>(false);

  useEffect(() => {
    chrome.storage.local.get("issThemeChanged", (result) => {
      if (result.issThemeChanged) {
        setIsThemeChanged(true);
        document.body.classList.add("light-theme");
      }
    });
  }, []);

  const handleClick = () => {
    if (!isThemeChanged) {
      chrome.storage.local.set({ issThemeChanged: true });
      setIsThemeChanged(true);
      document.body.classList.add("light-theme");
    } else {
      chrome.storage.local.set({ issThemeChanged: false });
      setIsThemeChanged(false);
      document.body.classList.remove("light-theme");
    }
  };

  return (
    <div id="themechange" className="vkenhancerThemeChanger">
      <button id="changerb" title={t("changeTheme")} type="button" className="vkenhancerButtonMoon vkenhancerButtonHeader" onClick={handleClick}>
        <CurrentSVG />
      </button>
    </div>
  );
}
