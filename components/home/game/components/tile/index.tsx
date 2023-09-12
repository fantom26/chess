import { PIECE_ICONS } from "@constants";
import { ICell, TCollection, TFIgure, TPieceColor } from "utils/types";
import { FC } from "react";
import { isLightSquare } from "@components/home/helpers";
import { COLLECTIONS } from "@utils/enums";

interface TileProps {
  figure?: TFIgure | null;
  figureColor?: TPieceColor | null;
  cell: ICell;
  index: number;
  collection?: TCollection;
}

export const Tile: FC<TileProps> = (props) => {
  const { figure, collection = COLLECTIONS.CLUB, figureColor, index, cell } = props;
  const light = isLightSquare(cell.pos, index);
  return (
    <li className={light ? "tile tile--white" : "tile tile--black"} key={cell.pos}>
      {figure && (
        <div className="piece" data-piece={figure} data-color={figureColor}>
          {PIECE_ICONS[collection][figure]}
        </div>
      )}
    </li>
  );
};
