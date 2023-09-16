import { ICell } from "@utils/types";
import { FC } from "react";
import { isLightSquare } from "@components/home/helpers";
import { Piece } from "../piece";
import { Square } from "chess.js";
import { useGameContext } from "@hooks";

interface TileProps {
  cell: ICell;
  index: number;
  makeMove: (pos: string) => void;
  setFromPos: (pos: Square) => void;
}

export const Tile: FC<TileProps> = (props) => {
  const { index, cell, makeMove, setFromPos } = props;
  const squareLight = isLightSquare(cell.pos, index);
  const { possibleMoves } = useGameContext();
  const isPossibleMove = possibleMoves.includes(cell.pos);
  const handleDrop = () => {
    makeMove(cell.pos);
  };

  const generateClassNames = () => {
    let defaultClassName = "tile";

    if (squareLight) {
      defaultClassName += " tile--white";
    } else {
      defaultClassName += " tile--black";
    }

    if (isPossibleMove) {
      defaultClassName += " possible-move";
    }

    return defaultClassName;
  };

  if (cell.piece) {
    return (
      <li className={generateClassNames()} key={cell.pos} onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
        <Piece cell={cell} setFromPos={setFromPos} />
      </li>
    );
  }

  return <li className={generateClassNames()} key={cell.pos} onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}></li>;
};
