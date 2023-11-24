import { Typography } from "@components/shared";
import { useGameContext } from "@hooks";
import { TagVariant } from "@utils/enums";
import { useTranslation } from "react-i18next";
import { SideBarProps } from ".";
import { FC } from "react";

export const GameRun: FC<SideBarProps> = ({ chess }) => {
  const { t } = useTranslation();
  const { turn } = useGameContext();

  console.log("chess", chess);

  return (
    <div className={`sidebar-turn ${turn}`}>
      <span className="sidebar-turn__color"></span>
      <Typography tag={TagVariant.H2} variant={TagVariant.H2}>
        {t(`game.turn.${turn}`)}
      </Typography>
    </div>
  );
};
