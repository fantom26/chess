"use client";
import { ICONS } from "@constants";
import { langs } from "@constants/shared/common";
import { ICONS_NAME } from "@utils/enums";
import { useTranslation } from "react-i18next";
import { usePathname, useRouter } from "next/navigation";
import i18nConfig from "@i18n.config";

export const Langs = ({ locale }: { locale: string }) => {
  const { t, i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = (lang: string) => {
    const newLocale = lang;

    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `; expires=${date.toUTCString()}`;
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    // redirect to the new locale path
    if (currentLocale === i18nConfig.defaultLocale && !i18nConfig.prefixDefault) {
      router.push(`/${newLocale}${currentPathname}`);
    } else {
      router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`));
    }

    router.refresh();
  };

  return (
    <>
      <div className="langs">
        <div className="langs--current">
          <span>{t(`langs.${locale}`)}</span>
          <span className="langs__triangle">{ICONS[ICONS_NAME.LANG_TRIANGLE]}</span>
        </div>
        <ul className="langs__dropdown">
          {langs
            .filter((l) => l !== locale)
            .map((l, index) => (
              <li key={index} onClick={() => handleChange(l)} className="langs__dropdown-item">
                {t(`langs.${l}`)}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};
