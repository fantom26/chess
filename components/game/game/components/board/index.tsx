import { ICell } from "@utils/types";
import { FC } from "react";
import { Tile } from "../tile";
import { useChessContext } from "@hooks";
import { Chess, Square } from "chess.js";
import { useSearchParams } from "next/navigation";
import { QUERY_PARAMS } from "@utils/enums";

interface BoardProps {
  cells: ICell[];
  chess: Chess;
  flipped: boolean;
  makeMove: (pos: string) => void;
  setFromPos: (pos: Square) => void;
}

export const Board: FC<BoardProps> = (props) => {
  const { cells, ...rest } = props;
  const { chessStore } = useChessContext();
  const searchParams = useSearchParams();
  const hasGameId = searchParams.has(QUERY_PARAMS.GAME_ID);

  return (
    <ul className={`board board--${chessStore.boardTheme.value}`} style={{ ...(!hasGameId && { pointerEvents: "none" }) }}>
      {cells.map((cell, index) => (
        <Tile cell={cell} index={index} key={cell.pos} {...rest} />
      ))}
    </ul>
  );
};
