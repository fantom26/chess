import { ICell } from "@utils/types";
import { FC } from "react";
import { isLightSquare } from "@components/home/helpers";
import { Piece } from "../piece";
import { BLACK, KING, SQUARES, Square, WHITE } from "chess.js";
import { useGameContext } from "@hooks";
import { LETTERS } from "@utils/enums";

interface TileProps {
  cell: ICell;
  index: number;
  makeMove: (pos: string) => void;
  setFromPos: (pos: Square) => void;
}

export const Tile: FC<TileProps> = (props) => {
  const { index, cell, makeMove, setFromPos } = props;

  const squareLight = isLightSquare(cell.pos, index);
  const { possibleMoves, check, turn } = useGameContext();
  const isPossibleMove = possibleMoves.includes(cell.pos);
  const figureColor = cell.piece === cell.piece.toUpperCase() ? BLACK : WHITE;
  const [letter, number] = SQUARES[index].split("");

  const handleDrop = () => {
    makeMove(cell.pos);
  };

  const inCheck = () => {
    const king = cell.piece.toLowerCase() === KING;
    return turn !== figureColor && king && check;
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

    if (inCheck()) {
      defaultClassName += " check";
    }

    return defaultClassName;
  };

  const Details = () => (
    <>
      {+number === 1 && <span className="tile-letter">{letter}</span>}
      {letter === LETTERS.A && <span className="tile-number">{number}</span>}
    </>
  );

  if (cell.piece) {
    return (
      <li className={generateClassNames()} key={cell.pos} onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
        <Details />
        <Piece figureColor={figureColor} cell={cell} setFromPos={setFromPos} />
      </li>
    );
  }

  return (
    <li className={generateClassNames()} key={cell.pos} onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
      <Details />
    </li>
  );
};
