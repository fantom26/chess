import { Button, ClipboardCopy, Typography } from "@components/shared";
import { ButtonVariant, TagVariant } from "@utils/enums";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const SideBar = () => {
  const [gameID, setGameID] = useState<string | null>(null);
  const { t } = useTranslation();

  const generateGameId = () => {
    const id = Math.random().toString().replace("0.", "");
    setGameID(id);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setGameID(null);
    }, 10000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [gameID]);

  return (
    <section className="sidebar">
      <Typography tag={TagVariant.H1} variant={TagVariant.H1} center>
        {t("pages.home.playVS")}
      </Typography>
      <div className="sidebar__btn">
        <Button>{t("btn.play")}</Button>
      </div>
      <div className="sidebar__btn" onClick={generateGameId}>
        {gameID ? <ClipboardCopy text={gameID as string} /> : <Button variant={ButtonVariant.outlined}>{t("btn.invite-link")}</Button>}
      </div>
    </section>
  );
};
