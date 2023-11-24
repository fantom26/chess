import { Typography } from "@components/shared";
import { TagVariant } from "@utils/enums";
import { Move } from "chess.js";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface MovesHistoryProps {
  moves: Move[][];
}

export const MovesHistory: FC<MovesHistoryProps> = ({ moves }) => {
  const { t } = useTranslation();
  return (
    <div className="move-history">
      <Typography tag={TagVariant.H2} variant={TagVariant.H3}>
        {t("game.history.title")}
      </Typography>
      <ul className="move-history__list scroll">
        {moves.map(([w, b], index) => (
          <li className="move-history__item" key={index}>
            <span>
              {w.piece.toUpperCase()}
              {w.san}
            </span>
            {b && (
              <span>
                {b.piece.toUpperCase()}
                {b.san}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
