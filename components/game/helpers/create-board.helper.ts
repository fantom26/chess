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

const columns = [LETTERS.A, LETTERS.B, LETTERS.C, LETTERS.D, LETTERS.E, LETTERS.F, LETTERS.G, LETTERS.H];
const rows = Array.from({ length: 8 }, (_, i) => i + 1);

export const createBoard = (fenString: string, boardFlipped: boolean) => {
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

  const cells: Square[] = []; //[a1, b1, c1..., h8]

  if (!boardFlipped) {
    const reversedColumns = [...columns].reverse();
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      for (let j = 0; j < columns.length; j++) {
        const square = `${reversedColumns[j]}${row}`;
        cells.push(square as Square); //e.g a1, b1, c1...
      }
    }
  } else {
    const reversedRows = [...rows].reverse();
    for (let i = 0; i < rows.length; i++) {
      const row = reversedRows[i];
      for (let j = 0; j < columns.length; j++) {
        const square = `${columns[j]}${row}`;
        cells.push(square as Square); //e.g a1, b1, c1...
      }
    }
  }

  const board = [];

  for (let i = 0; i < cells.length; i++) {
    //'cells', and 'pieces' have the same length of 64
    board.push(new Cell(cells[i], pieces[i]));
  }

  return board;
};
