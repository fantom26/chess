import { ICell } from "@utils/types";
import { FC } from "react";
import { Tile } from "../tile";
import { useChessContext } from "@hooks";
import { Chess, Square } from "chess.js";

interface BoardProps {
  cells: ICell[];
  chess: Chess;
  makeMove: (pos: string) => void;
  setFromPos: (pos: Square) => void;
}

export const Board: FC<BoardProps> = ({ cells, ...props }) => {
  const { chessStore } = useChessContext();

  console.log("cells", cells);
  return (
    <ul className={`board board--${chessStore.boardTheme.value}`}>
      {cells.map((cell, index) => (
        <Tile cell={cell} index={index} key={cell.pos} {...props} />
      ))}
    </ul>
  );
};
