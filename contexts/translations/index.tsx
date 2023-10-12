"use client";
import { I18nextProvider } from "react-i18next";
import { useEffect, useState } from "react";
import initTranslations from "@i18n";
import { i18n } from "i18next";
import { ProvidersProps } from "@app/(root)/[locale]/providers";

let i18nObj: i18n;

export const TranslationsProvider = ({ children, locale, namespaces }: ProvidersProps) => {
  const [instance, setInstance] = useState(i18nObj);

  useEffect(() => {
    const init = async () => {
      if (!i18nObj) {
        const newInstance = await initTranslations(locale, namespaces);
        i18nObj = newInstance;
        setInstance(newInstance);
      } else if (i18nObj.language !== locale) {
        i18nObj.changeLanguage(locale);
      }
    };

    init();
  }, [locale, namespaces]);

  if (!instance) {
    return null;
  }

  return (
    <I18nextProvider i18n={instance} defaultNS={(namespaces as string[])[0]}>
      {children}
    </I18nextProvider>
  );
};
