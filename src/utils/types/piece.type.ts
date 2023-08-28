import { TFIgure } from ".";
import { PIECE_COLORS } from "../enums";

export interface IPiece {
  figure: TFIgure;
  x: number;
  y: number;
  color: PIECE_COLORS.BLACK | PIECE_COLORS.WHITE;
}

export type TPieceColor = PIECE_COLORS.BLACK | PIECE_COLORS.WHITE;
