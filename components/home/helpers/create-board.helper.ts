import { LETTERS, PIECE } from "@utils/enums";
import { ICell, TFIgure } from "@utils/types";
import { Square } from "chess.js";

class Cell implements ICell {
  pos: Square;

  piece: TFIgure;

  constructor(pos: Square, piece: TFIgure) {
    this.pos = pos;
    this.piece = piece;
  }
}
//  returns an array of range 1, n
const range = (n: number) => Array.from({ length: n }, (_, i) => i + 1);

export const createBoard = (fenString: string) => {
  const [fen] = fenString.split(" "); //Get the first portion

  const fenPieces = [...fen.replaceAll("/", "")]; //rnbqkbnrpppppppp8888PPPPPPPPRNBQKBNR

  const pieces: TFIgure[] = [];

  fenPieces.forEach((item) => {
    if (isFinite(+item)) {
      pieces.push(...Array(+item).fill(PIECE.EMPTY));
    } else {
      pieces.push(item as TFIgure);
    }
  });

  const rows = range(8)
    .map((n) => n.toString())
    .reverse(); //["8", "7", "6", "5", "4", "3", "2", "1"]

  const columns = [LETTERS.A, LETTERS.B, LETTERS.C, LETTERS.D, LETTERS.E, LETTERS.F, LETTERS.G, LETTERS.H];

  const cells: Square[] = []; //[a1, b1, c1..., h8]

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    for (let j = 0; j < columns.length; j++) {
      const square = `${columns[j]}${row}`;
      cells.push(square as Square); //e.g a1, b1, c1...
    }
  }

  const board = [];

  for (let i = 0; i < cells.length; i++) {
    //'cells', and 'pieces' have the same length of 64
    board.push(new Cell(cells[i], pieces[i]));
  }

  return board;
};
