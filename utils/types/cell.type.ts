import { Square } from "chess.js";
import { TFIgure } from "./figure.type";

export interface ICell {
  piece: TFIgure;
  pos: Square;
}
