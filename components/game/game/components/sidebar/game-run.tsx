import { Typography } from "@components/shared";
import { useGameContext } from "@hooks";
import { TagVariant } from "@utils/enums";
import { useTranslation } from "react-i18next";
import { SideBarProps } from ".";
import { FC, useMemo } from "react";
import { MovesHistory } from "./history-moves";

export const GameRun: FC<SideBarProps> = ({ chess }) => {
  const { t } = useTranslation();
  const { turn } = useGameContext();

  const historyData = useMemo(() => {
    const curHistory = chess.history({ verbose: true });
    const dividedArray = [];
    console.log("curHistory", curHistory);

    for (let i = 0; i < curHistory.length; i += 2) {
      dividedArray.push([curHistory[i], curHistory[i + 1]]);
    }

    console.log("dividedArray", dividedArray);

    return dividedArray;
  }, [turn]);

  console.log("historyData", historyData);

  return (
    <>
      <div className={`sidebar-turn ${turn}`}>
        <span className="sidebar-turn__color"></span>
        <Typography tag={TagVariant.H2} variant={TagVariant.H2}>
          {t(`game.turn.${turn}`)}
        </Typography>
      </div>
      <MovesHistory moves={historyData} />
    </>
  );
};
