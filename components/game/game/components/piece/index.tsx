import { PIECE_ICONS } from "@constants";
import { useChessContext } from "@hooks";
import { COLLECTIONS } from "@utils/enums";
import { ICell, TFIgure } from "@utils/types";
import { Color, Square } from "chess.js";
import { FC, useRef } from "react";

interface PieceProps {
  figureColor: Color;
  cell: ICell;
  setFromPos: (pos: Square) => void;
}

export const Piece: FC<PieceProps> = ({ cell, setFromPos, figureColor }) => {
  const { chessStore } = useChessContext();
  const element = useRef<HTMLDivElement | null>(null);
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
      {PIECE_ICONS[chessStore.peaceTheme.value as COLLECTIONS][figure]}
    </div>
  );
};
