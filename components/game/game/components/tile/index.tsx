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
  flipped: boolean;
  makeMove: (pos: string) => void;
  setFromPos: (pos: Square) => void;
}

export const Tile: FC<TileProps> = (props) => {
  const { index, cell, flipped, makeMove, setFromPos, chess } = props;
  const squareLight = chess.squareColor(cell.pos);
  const { possibleMoves, check, turn, opponentMoves, opponent } = useGameContext();
  const { chessStore } = useChessContext();
  const isPossibleMove = possibleMoves.includes(cell.pos);
  const figureColor = cell.piece === cell.piece.toUpperCase() ? BLACK : WHITE;
  const [letter, number] = chessStore.squares[index].split("");
  const lastOpponentMove = opponentMoves.at(-1);

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
    } else {
      defaultClassName += " tile--black";
    }

    if (isPossibleMove) {
      defaultClassName += " possible-move";
    }

    if ((lastOpponentMove?.from === cell.pos || lastOpponentMove?.to === cell.pos) && turn !== opponent?.color) {
      defaultClassName += " last-move";
    }

    if (inCheck()) {
      defaultClassName += " check";
    }

    return defaultClassName;
  };

  const Details = () => (
    <>
      {+number === (flipped ? 8 : 1) && <span className="tile-letter">{letter}</span>}
      {letter === (flipped ? LETTERS.H : LETTERS.A) && <span className="tile-number">{number}</span>}
    </>
  );

  return (
    <li className={generateClassNames()} key={cell.pos} onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
      <Details />
      {cell.piece && <Piece figureColor={figureColor} cell={cell} setFromPos={setFromPos} />}
    </li>
  );
};
