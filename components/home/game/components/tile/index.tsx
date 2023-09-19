import { ICell } from "@utils/types";
import { FC } from "react";
import { Piece } from "../piece";
import { BLACK, KING, Square, WHITE, Chess } from "chess.js";
import { useChessContext, useGameContext } from "@hooks";
import { LETTERS } from "@utils/enums";

interface TileProps {
  cell: ICell;
  index: number;
  chess: Chess;
  makeMove: (pos: string) => void;
  setFromPos: (pos: Square) => void;
}

export const Tile: FC<TileProps> = (props) => {
  const { index, cell, makeMove, setFromPos, chess } = props;
  const squareLight = chess.squareColor(cell.pos);
  const { possibleMoves, check, turn } = useGameContext();
  const { chessStore } = useChessContext();
  const isPossibleMove = possibleMoves.includes(cell.pos);
  const figureColor = cell.piece === cell.piece.toUpperCase() ? BLACK : WHITE;
  const [letter, number] = chessStore.squares[index].split("");

  const handleDrop = () => {
    makeMove(cell.pos);
  };

  const inCheck = () => {
    const king = cell.piece.toLowerCase() === KING;
    return turn !== figureColor && king && check;
  };

  const generateClassNames = () => {
    let defaultClassName = "tile";

    if (squareLight === "light") {
      defaultClassName += " tile--white";
    } else if (squareLight === "dark") {
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
