import { QUERY_PARAMS } from "@utils/enums";
import { useSearchParams } from "next/navigation";
import { StartPlay } from "./start-play";
import { GameRun } from "./game-run";

export const SideBar = () => {
  const searchParams = useSearchParams();

  const hasGameId = searchParams.has(QUERY_PARAMS.GAME_ID);

  return <section className="sidebar">{hasGameId ? <GameRun /> : <StartPlay />}</section>;
};
