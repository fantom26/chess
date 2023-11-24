import { ICell, TFIgure } from "@utils/types";
import { FC } from "react";
import { Tile } from "../tile";
import { useChessContext, useGameContext, useGetPlayerByColor } from "@hooks";
import { Chess, Square } from "chess.js";
import { useSearchParams } from "next/navigation";
import { QUERY_PARAMS } from "@utils/enums";
import { Player } from "../player";

export interface BoardProps {
  cells: ICell[];
  chess: Chess;
  flipped: boolean;
  makeMove: (pos: string) => void;
  setFromPos: (pos: Square, piece: TFIgure) => void;
}

export const Board: FC<BoardProps> = (props) => {
  const { cells, flipped, ...rest } = props;
  const { chessStore } = useChessContext();
  const { turn, player } = useGameContext();
  const { bPlayer, wPlayer } = useGetPlayerByColor();
  const searchParams = useSearchParams();
  const hasGameId = searchParams.has(QUERY_PARAMS.GAME_ID);

  return (
    <div className="board-wrapper">
      <Player player={flipped ? wPlayer : bPlayer} />
      <ul className={`board board--${chessStore.boardTheme.value}`} style={{ ...((!hasGameId || turn !== player?.color) && { pointerEvents: "none" }) }}>
        {cells.map((cell, index) => (
          <Tile cell={cell} index={index} key={cell.pos} flipped={flipped} {...rest} />
        ))}
      </ul>
      <Player player={flipped ? bPlayer : wPlayer} />
    </div>
  );
};
