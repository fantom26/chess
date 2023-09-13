import { PIECE_ICONS } from "@constants";
import { ICell, TCollection, TFIgure } from "utils/types";
import { FC } from "react";
import { isLightSquare } from "@components/home/helpers";
import { PIECE_COLORS } from "@utils/enums";
import { useChessContext } from "@hooks";

interface TileProps {
  cell: ICell;
  index: number;
}

export const Tile: FC<TileProps> = (props) => {
  const { chessStore } = useChessContext();
  const { index, cell } = props;
  const squareLight = isLightSquare(cell.pos, index);

  if (cell.piece) {
    const figureColor = cell.piece === cell.piece.toUpperCase() ? PIECE_COLORS.WHITE : PIECE_COLORS.BLACK;
    const figure = cell.piece.toLowerCase() as TFIgure;

    return (
      <li className={squareLight ? "tile tile--white" : "tile tile--black"} key={cell.pos}>
        <div className="piece" data-piece={cell.piece} data-color={figureColor} draggable={true}>
          {PIECE_ICONS[chessStore.peaceTheme.value as TCollection][figure]}
        </div>
      </li>
    );
  }

  return <li className={squareLight ? "tile tile--white" : "tile tile--black"} key={cell.pos}></li>;
};
