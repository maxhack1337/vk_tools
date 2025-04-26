import React, { useEffect } from "react";
import { useLocalization } from "../../../../Localization/LocalizationContext";

interface LanguageSelectorProps {
  displayNone?: boolean;
}

const LanguageSelector = ({ displayNone }: LanguageSelectorProps) => {
  const { currentLanguage, setLanguage } = useLocalization();
  const { getLang: t } = useLocalization();

  useEffect(() => {
    chrome.storage.local.get(["language"], (result) => {
      const storedLanguage = result.language;
      if (storedLanguage) {
        setLanguage(storedLanguage);
      }
    });
  }, [setLanguage]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value as "ru" | "en" | "ua";
    setLanguage(newLanguage);
    chrome.storage.local.set({ language: newLanguage });
  };

  return (
    <div id="selectLanguage" style={{ textAlign: "center", display: displayNone ? "none" : "flex" }}>
      <div id="langName">{t("lang")}</div>
      <div className="selectLanguageSelect">
        <select id="languageSelect" value={currentLanguage} onChange={handleLanguageChange}>
          <option value="ru">Русский</option>
          <option value="en">English</option>
          <option value="ua">Українська</option>
        </select>
      </div>
    </div>
  );
};

export default LanguageSelector;
