import { PIECE_ICONS } from "@/utils/constants";
import { TCollection, TFIgure, TPieceColor } from "@/utils/types";
import { FC } from "react";

interface TileProps {
  figure?: TFIgure | null;
  figureColor?: TPieceColor | null;
  number: number;
  collection: TCollection;
}

export const Tile: FC<TileProps> = (props) => {
  const { number, figure, collection, figureColor } = props;
  return (
    <li
      className={number % 2 === 0 ? "tile tile--white" : "tile tile--black"}
      key={number}
    >
      {figure && (
        <div className="piece" data-piece={figure} data-color={figureColor}>
          {PIECE_ICONS[collection][figure]}
        </div>
      )}
    </li>
  );
};
