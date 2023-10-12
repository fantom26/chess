import { ICONS } from "@constants";
import { useTranslation } from "@i18n";
import { languages } from "@i18n/settings";
import { ICONS_NAME } from "@utils/enums";
import Link from "next/link";

export const Langs = async ({ lng }: { lng: string }) => {
  const { t } = await useTranslation(lng, "langs");

  return (
    <>
      <div className="langs">
        <div className="langs--current">
          <span>{t(lng)}</span>
          <span className="langs__triangle">{ICONS[ICONS_NAME.LANG_TRIANGLE]}</span>
        </div>
        <ul className="langs__dropdown">
          {languages
            .filter((l) => l !== lng)
            .map((l, index) => (
              <li key={index} className="langs__dropdown-item">
                <Link href={`/${l}`}>{t(l)}</Link>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};
