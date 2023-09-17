import { PIECE_ICONS } from "@constants";
import { useChessContext } from "@hooks";
import { ICell, TCollection, TFIgure } from "@utils/types";
import { BLACK, Square, WHITE } from "chess.js";
import { FC, useRef } from "react";

interface PieceProps {
  cell: ICell;
  setFromPos: (pos: Square) => void;
}

export const Piece: FC<PieceProps> = ({ cell, setFromPos }) => {
  const { chessStore } = useChessContext();
  const element = useRef<HTMLDivElement | null>(null);
  const figureColor = cell.piece === cell.piece.toUpperCase() ? BLACK : WHITE;
  const figure = cell.piece.toLowerCase() as TFIgure;

  const handleDragStart = () => {
    setFromPos(cell.pos);
    setTimeout(() => {
      if (element.current) {
        element.current.style.display = "none";
      }
    }, 0);
  };

  const handleDragEnd = () => {
    if (element.current) {
      element.current.style.display = "block";
    }
  };

  return (
    <div
      className="piece"
      data-piece={cell.piece}
      data-color={figureColor}
      draggable={true}
      ref={element}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {PIECE_ICONS[chessStore.peaceTheme.value as TCollection][figure]}
    </div>
  );
};
