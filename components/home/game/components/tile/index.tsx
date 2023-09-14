import { ICell } from "utils/types";
import { FC } from "react";
import { isLightSquare } from "@components/home/helpers";
import { Piece } from "../piece";

interface TileProps {
  cell: ICell;
  index: number;
  makeMove: (pos: string) => void;
  setFromPos: (pos: string) => void;
}

export const Tile: FC<TileProps> = (props) => {
  const { index, cell, makeMove, setFromPos } = props;
  const squareLight = isLightSquare(cell.pos, index);
  const handleDrop = () => {
    makeMove(cell.pos);
  };

  if (cell.piece) {
    return (
      <li className={squareLight ? "tile tile--white" : "tile tile--black"} key={cell.pos} onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
        <Piece cell={cell} setFromPos={setFromPos} />
      </li>
    );
  }

  return <li className={squareLight ? "tile tile--white" : "tile tile--black"} key={cell.pos} onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}></li>;
};
