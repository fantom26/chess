import { PIECE_ICONS } from "@constants";
import { useChessContext } from "@hooks";
import { PIECE_COLORS } from "@utils/enums";
import { ICell, TCollection, TFIgure } from "@utils/types";
import { FC, useRef } from "react";

interface PieceProps {
  cell: ICell;
  setFromPos: (pos: string) => void;
}

export const Piece: FC<PieceProps> = ({ cell, setFromPos }) => {
  const { chessStore } = useChessContext();
  const element = useRef<HTMLDivElement | null>(null);
  const figureColor = cell.piece === cell.piece.toUpperCase() ? PIECE_COLORS.BLACK : PIECE_COLORS.WHITE;
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
