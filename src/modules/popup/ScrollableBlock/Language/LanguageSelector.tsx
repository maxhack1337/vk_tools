import React from "react";
import { useLocalization } from "../../../../Localization/LocalizationContext";

const LanguageSelector = () => {
  const { currentLanguage, setLanguage } = useLocalization();
  const { getLang: t } = useLocalization();

  return (
    <div id="selectLanguage" style={{ textAlign: "center" }}>
      <div id="langName">{t("lang")}</div>
      <select id="languageSelect" value={currentLanguage} onChange={(e) => setLanguage(e.target.value as "ru" | "en" | "ua")}>
        <option value="ru">Русский</option>
        <option value="en">English</option>
        <option value="ua">Українська</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
