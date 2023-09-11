class Cell {
  pos: string;

  piece: string;

  constructor(pos: string, piece: string) {
    this.pos = pos;
    this.piece = piece;
  }
}
//  returns an array of range 1, n
const range = (n: number) => Array.from({ length: n }, (_, i) => i + 1);

export const createBoard = (fenString: string) => {
  const [fen] = fenString.split(" "); //Get the first portion

  const fenPieces = [...fen.replaceAll("/", "")]; //rnbqkbnrpppppppp8888PPPPPPPPRNBQKBNR

  let pieces = fenPieces;

  //Save individual pieces for each of the 64 cells
  fenPieces.forEach((item, index) => {
    if (isFinite(+item)) {
      pieces.splice(index, 1, Array(+item).fill("").join());
    }
  });
  pieces = pieces.flat();

  const rows = range(8)
    .map((n) => n.toString())
    .reverse(); //["8", "7", "6", "5", "4", "3", "2", "1"]

  const columns = ["a", "b", "c", "d", "e", "f", "g", "h"];

  const cells = []; //[a1, b1, c1..., h8]

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    for (let j = 0; j < columns.length; j++) {
      cells.push(columns[j] + row); //e.g a1, b1, c1...
    }
  }

  const board = [];

  for (let i = 0; i < cells.length; i++) {
    //'cells', and 'pieces' have the same length of 64
    board.push(new Cell(cells[i], pieces[i]));
  }

  return board;
};
