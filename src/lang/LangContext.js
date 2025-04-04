import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';

const LangContext = createContext();

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState('ru');
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const en = await import(`./translations/en.json`);
        const ru = await import(`./translations/ru.json`);
        setTranslations({
          en: en.default,
          ru: ru.default,
        });
      } catch (error) {
        console.error("Error loading translations:", error);
      }
    };

    loadTranslations();
  }, []);


  const changeLang = (newLang) => {
    setLang(newLang);
  };

  const translate = useCallback((key) => {
    return translations[lang]?.[key] || key; // Return the key if translation is missing
  }, [lang, translations]);

  const value = {
    lang,
    changeLang,
    translate,
  };

  return (
    <LangContext.Provider value={value}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => {
  return useContext(LangContext);
};