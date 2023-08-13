import { IPiece } from "@/utils/types";

export const PIECES: IPiece[] = [];

for (let p = 0; p < 2; p++) {
  const type = p === 0 ? "b" : "w";
  const y = p === 0 ? 7 : 0;

  PIECES.push({ image: `/images/rook_${type}.png`, x: 0, y });
  PIECES.push({ image: `/images/rook_${type}.png`, x: 7, y });
  PIECES.push({ image: `/images/knight_${type}.png`, x: 1, y });
  PIECES.push({ image: `/images/knight_${type}.png`, x: 6, y });
  PIECES.push({ image: `/images/bishop_${type}.png`, x: 2, y });
  PIECES.push({ image: `/images/bishop_${type}.png`, x: 5, y });
  PIECES.push({ image: `/images/queen_${type}.png`, x: 3, y });
  PIECES.push({ image: `/images/king_${type}.png`, x: 4, y });
}

for (let i = 0; i < 8; i++) {
  PIECES.push({ image: "/images/pawn_b.png", x: i, y: 6 });
}

for (let i = 0; i < 8; i++) {
  PIECES.push({ image: "/images/pawn_w.png", x: i, y: 1 });
}
