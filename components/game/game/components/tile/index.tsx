import { ICell, TFIgure } from "@utils/types";
import { FC } from "react";
import { Piece } from "../piece";
import { BLACK, KING, Square, WHITE, Chess } from "chess.js";
import { useGameContext } from "@hooks";
import { Details } from "./details";

export interface TileProps {
  cell: ICell;
  index: number;
  flipped: boolean;
  chess: Chess;
  makeMove: (pos: string, piece: TFIgure) => void;
  setFromPos: (pos: Square) => void;
}

export const Tile: FC<TileProps> = ({ cell, makeMove, setFromPos, chess, ...rest }) => {
  const squareLight = chess.squareColor(cell.pos);
  const { possibleMoves, check, turn, opponentMoves, opponent } = useGameContext();
  const isPossibleMove = possibleMoves.includes(cell.pos);
  const figureColor = cell.piece === cell.piece.toUpperCase() ? BLACK : WHITE;
  const lastOpponentMove = opponentMoves.at(-1);

  const handleDrop = (piece: TFIgure) => {
    console.log("piece", piece);
    makeMove(cell.pos, piece);
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

  return (
    <li className={generateClassNames()} key={cell.pos} onDrop={() => handleDrop(cell.piece)} onDragOver={(e) => e.preventDefault()}>
      <Details {...rest} />
      {cell.piece && <Piece figureColor={figureColor} cell={cell} setFromPos={setFromPos} />}
    </li>
  );
};
