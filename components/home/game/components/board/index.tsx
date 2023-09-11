import { ICell } from "utils/types";
import { FC } from "react";

interface BoardProps {
  cells: ICell[];
}

export const Board: FC<BoardProps> = ({ cells }) => (
  <div className="board">
    {cells.map(({ pos }) => (
      <div key={pos}>{pos}</div>
    ))}
  </div>
);
