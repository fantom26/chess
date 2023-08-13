import { Tile } from "@/components";
import { COUNT_SQUARE_IN_ROW, LETTERS_IN_ARRAY } from "@/utils/constants";
import { PIECES } from "./render-pieces.helper";

export const renderBoard = () => {
  let board = [];

  for (let i = COUNT_SQUARE_IN_ROW; i > 0; i--) {
    for (let j = 0; j < LETTERS_IN_ARRAY.length; j++) {
      const number = i + j + 2;
      let image: string | null = null;

      PIECES.forEach((p) => {
        if (p.x === j && p.y === i - 1) {
          image = p.image;
        }
      });

      board.push(<Tile img={image} number={number} />);
    }
  }

  return board;
};
