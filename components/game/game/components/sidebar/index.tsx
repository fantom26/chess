import { QUERY_PARAMS } from "@utils/enums";
import { useSearchParams } from "next/navigation";
import { StartPlay } from "./start-play";
import { GameRun } from "./game-run";
import { FC } from "react";
import { Chess } from "chess.js";

export interface SideBarProps {
  chess: Chess;
}

export const SideBar: FC<SideBarProps> = ({ chess }) => {
  const searchParams = useSearchParams();

  const hasGameId = searchParams.has(QUERY_PARAMS.GAME_ID);

  return <section className="sidebar">{hasGameId ? <GameRun chess={chess} /> : <StartPlay />}</section>;
};
