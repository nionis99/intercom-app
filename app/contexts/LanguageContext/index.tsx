import React, { useContext } from "react";
import { createContext, useState } from "react";

import i18n from "#utils/i18n";

interface Props {
  children: React.ReactNode;
}

type LanguageContextType = {
  isChangeLanguageModalVisible: boolean;
  setIsChangeLanguageModalVisible: (state: boolean) => void;
  changeLanguage: (language: string) => void;
  getLanguage: () => string;
  currentLanguageCode: string;
  getLanguageFromFlagCode: (flagCode: string) => string;
};

export const LanguageContext = createContext({} as LanguageContextType);

export const LanguageProvider = ({ children }: Props) => {
  const [
    isChangeLanguageModalVisible,
    setIsChangeLanguageModalVisible,
  ] = useState(false);

  const changeLanguage = (language: string) => i18n.changeLanguage(language);

  const getLanguage = () => i18n.language;

  const currentLanguageCode = i18n.language === "en" ? "GB" : "LT";
  const getLanguageFromFlagCode = (flagCode: string) =>
    flagCode === "GB" ? "en" : "lt";

  return (
    <LanguageContext.Provider
      value={{
        isChangeLanguageModalVisible,
        setIsChangeLanguageModalVisible,
        changeLanguage,
        getLanguage,
        currentLanguageCode,
        getLanguageFromFlagCode,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguageContext() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error(
      "useLanguageContext must be used within the LanguageProvider"
    );
  }
  return context;
}
