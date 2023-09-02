import { Tile } from "@/components";
import { COUNT_SQUARE_IN_ROW, LETTERS_IN_ARRAY } from "@/utils/constants";
import { PIECES } from "./render-pieces.helper";
import { TCollection, TFIgure, TPieceColor } from "../types";

export const renderBoard = (collection: TCollection) => {
  let board = [];

  for (let i = COUNT_SQUARE_IN_ROW; i > 0; i--) {
    for (let j = 0; j < LETTERS_IN_ARRAY.length; j++) {
      const number = i + j + 2;
      let figure: TFIgure | null = null;
      let color: TPieceColor | null = null;

      PIECES.forEach((p) => {
        if (p.x === j && p.y === i - 1) {
          figure = p.figure;
          color = p.color;
        }
      });

      board.push(
        <Tile
          key={`x=${i}-y=${j}`}
          collection={collection}
          figureColor={color}
          figure={figure}
          number={number}
        />
      );
    }
  }

  return board;
};
