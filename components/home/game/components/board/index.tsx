import { ICell } from "utils/types";
import { FC } from "react";
import { Tile } from "../tile";

interface BoardProps {
  cells: ICell[];
}

export const Board: FC<BoardProps> = ({ cells }) => (
  <ul className="board">
    {cells.map((cell, index) => (
      <Tile cell={cell} index={index} key={cell.pos} />
    ))}
  </ul>
);
