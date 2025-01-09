import React, { createContext, useContext, useState } from "react";
import strings from "./stringLibrary";

type Language = "ru" | "en" | "ua";

interface LocalizationContextProps {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: keyof typeof strings) => string;
}

const LocalizationContext = createContext<LocalizationContextProps | undefined>(undefined);

export const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("ru");

  const t = (key: keyof typeof strings) => {
    const translations = strings[key];
    const languageIndex = currentLanguage === "ru" ? 0 : currentLanguage === "en" ? 1 : 2;
    return translations[languageIndex];
  };

  return <LocalizationContext.Provider value={{ currentLanguage, setLanguage: setCurrentLanguage, t }}>{children}</LocalizationContext.Provider>;
};

export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error("useLocalization must be used within a LocalizationProvider");
  }
  return context;
};
