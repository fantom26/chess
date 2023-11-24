import { PIECE_ICONS } from "@constants";
import { useChessContext, useGameContext } from "@hooks";
import { COLLECTIONS } from "@utils/enums";
import { ICell, TFIgure } from "@utils/types";
import { Color, Square } from "chess.js";
import { FC, useRef } from "react";

interface PieceProps {
  figureColor: Color;
  cell: ICell;
  setFromPos: (pos: Square, piece: TFIgure) => void;
}

export const Piece: FC<PieceProps> = ({ cell, setFromPos, figureColor }) => {
  const { chessStore } = useChessContext();
  const element = useRef<HTMLDivElement | null>(null);
  const figure = cell.piece.toLowerCase() as TFIgure;
  const { player } = useGameContext();

  const handleDragStart = () => {
    setFromPos(cell.pos, cell.piece);
    setTimeout(() => {
      if (element.current) {
        element.current.style.display = "none";
      }
    }, 0);
  };

  const handleDragEnd = () => {
    if (element.current) {
      element.current.style.display = "flex";
    }
  };

  return (
    <div
      className="piece"
      data-piece={cell.piece}
      data-color={figureColor}
      draggable={player?.color === figureColor}
      ref={element}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {PIECE_ICONS[chessStore.peaceTheme.value as COLLECTIONS][figure]}
    </div>
  );
};
