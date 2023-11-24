import { ICell } from "@utils/types";
import { FC } from "react";
import { Piece } from "../piece";
import { Chess } from "chess.js";
import { useGameContext } from "@hooks";
import { Details } from "./details";
import { BoardProps } from "../board";
import { getPieceColor, isKing } from "@components/game/helpers";

export type TileProps = Pick<BoardProps, "flipped" | "makeMove" | "setFromPos"> & {
  chess: Chess;
  cell: ICell;
  index: number;
};

export const Tile: FC<TileProps> = ({ cell, makeMove, setFromPos, chess, ...rest }) => {
  const squareLight = chess.squareColor(cell.pos);
  const { possibleMoves, check, turn, opponentMoves, opponent } = useGameContext();
  const isPossibleMove = possibleMoves.includes(cell.pos);
  const figureColor = getPieceColor(cell.piece);
  const lastOpponentMove = opponentMoves.at(-1);

  const handleDrop = () => {
    makeMove(cell.pos);
  };

  const inCheck = () => turn !== figureColor && isKing(cell.piece) && check;

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
    <li className={generateClassNames()} key={cell.pos} onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
      <Details {...rest} />
      {cell.piece && <Piece figureColor={figureColor} cell={cell} setFromPos={setFromPos} />}
    </li>
  );
};
