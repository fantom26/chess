import { Color } from "chess.js";

export interface IPlayer {
  name: string;
  color: Color;
  playerID: number;
  gameID: number;
}
