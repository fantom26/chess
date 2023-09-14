import { ICell } from "utils/types";
import { FC } from "react";
import { Tile } from "../tile";
import { useChessContext } from "@hooks";

interface BoardProps {
  cells: ICell[];
  makeMove: (pos: string) => void;
  setFromPos: (pos: string) => void;
}

export const Board: FC<BoardProps> = ({ cells, ...props }) => {
  const { chessStore } = useChessContext();

  return (
    <ul className={`board board--${chessStore.boardTheme.value}`}>
      {cells.map((cell, index) => (
        <Tile cell={cell} index={index} key={cell.pos} {...props} />
      ))}
    </ul>
  );
};
