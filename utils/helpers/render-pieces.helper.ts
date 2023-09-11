import { IPiece } from "app/_s/types";
import { PIECE, PIECE_COLORS } from "../enums";

export const PIECES: IPiece[] = [];

for (let p = 0; p < 2; p++) {
  const color = p === 0 ? PIECE_COLORS.BLACK : PIECE_COLORS.WHITE;
  const y = p === 0 ? 7 : 0;

  PIECES.push({ figure: PIECE.ROOK, x: 0, y, color });
  PIECES.push({ figure: PIECE.ROOK, x: 7, y, color });
  PIECES.push({ figure: PIECE.KNIGHT, x: 1, y, color });
  PIECES.push({ figure: PIECE.KNIGHT, x: 6, y, color });
  PIECES.push({ figure: PIECE.BISHOP, x: 2, y, color });
  PIECES.push({ figure: PIECE.BISHOP, x: 5, y, color });
  PIECES.push({ figure: PIECE.QUEEN, x: 3, y, color });
  PIECES.push({ figure: PIECE.KING, x: 4, y, color });
}

for (let i = 0; i < 8; i++) {
  PIECES.push({ figure: PIECE.PAWN, x: i, y: 6, color: PIECE_COLORS.BLACK });
}

for (let i = 0; i < 8; i++) {
  PIECES.push({ figure: PIECE.PAWN, x: i, y: 1, color: PIECE_COLORS.WHITE });
}
