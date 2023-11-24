import { TFIgure } from "@utils/types";
import { BLACK, WHITE } from "chess.js";

// White pieces are designated using uppercase letters ("PNBRQK"), while black pieces use lowercase letters ("pnbrqk")
export const getPieceColor = (piece: TFIgure) => (piece === piece.toUpperCase() ? WHITE : BLACK);
