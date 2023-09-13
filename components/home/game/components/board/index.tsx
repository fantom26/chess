import { ICell } from "utils/types";
import { FC } from "react";
import { Tile } from "../tile";
import { useChessContext } from "@hooks";

interface BoardProps {
  cells: ICell[];
}

export const Board: FC<BoardProps> = ({ cells }) => {
  const { chessStore } = useChessContext();

  return (
    <ul className={`board board--${chessStore.boardTheme.value}`}>
      {cells.map((cell, index) => (
        <Tile cell={cell} index={index} key={cell.pos} />
      ))}
    </ul>
  );
};
