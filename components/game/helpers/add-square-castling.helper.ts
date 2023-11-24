import { TFIgure } from "@utils/types";
import { getPieceColor } from "./get-piece-color.helper";
import { isKing } from "./is-king.helper";
import { CASTLING_VARIANTS } from "@utils/enums";

const CASTLE_SQUARES = {
  w: {
    [CASTLING_VARIANTS.KING]: "Kg1",
    [CASTLING_VARIANTS.QUEEN]: "Kc1"
  },
  b: {
    [CASTLING_VARIANTS.KING]: "Kg8",
    [CASTLING_VARIANTS.QUEEN]: "Kc8"
  }
};

export const getPositions = (moves: string[], piece: TFIgure) => {
  let updatedMoves = [...moves];
  if (isKing(piece)) {
    const colorPiece = getPieceColor(piece);
    if (updatedMoves.includes(CASTLING_VARIANTS.KING)) {
      updatedMoves = updatedMoves.map((move) => (move === CASTLING_VARIANTS.KING ? CASTLE_SQUARES[colorPiece][CASTLING_VARIANTS.KING] : move));
    }

    if (updatedMoves.includes(CASTLING_VARIANTS.QUEEN)) {
      updatedMoves = updatedMoves.map((move) => (move === CASTLING_VARIANTS.QUEEN ? CASTLE_SQUARES[colorPiece][CASTLING_VARIANTS.QUEEN] : move));
    }
  }

  return updatedMoves.map((move) => {
    const n = move.length;
    return move.substring(n - 2);
  });
};
