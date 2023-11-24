import { TFIgure } from "@utils/types";
import { KING } from "chess.js";

export const isKing = (piece: TFIgure) => piece.toLowerCase() === KING;
