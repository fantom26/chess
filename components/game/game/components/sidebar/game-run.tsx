import { Typography } from "@components/shared";
import { useGameContext } from "@hooks";
import { TagVariant } from "@utils/enums";
import { useTranslation } from "react-i18next";

export const GameRun = () => {
  const { t } = useTranslation();
  const { turn } = useGameContext();

  return (
    <div className={`sidebar-turn ${turn}`}>
      <span className="sidebar-turn__color"></span>
      <Typography tag={TagVariant.H2} variant={TagVariant.H2}>
        {t(`game.turn.${turn}`)}
      </Typography>
    </div>
  );
};
