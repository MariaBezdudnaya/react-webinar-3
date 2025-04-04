import React from 'react';
import { useLang } from './LangContext';
import Select from '../components/select';

const LanguageSwitcher = () => {
  const { lang, changeLang } = useLang();

  const languageOptions = [
    { value: 'ru', label: 'Русский' },
    { value: 'en', label: 'English' },
  ];

  const handleLanguageChange = (event) => {
    changeLang(event.target.value);
  };

  return (
    <Select
      value={lang}
      onChange={handleLanguageChange}
      options={languageOptions}
    />
  );
};

export default LanguageSwitcher;
