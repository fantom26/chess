import { BLACK, WHITE } from "chess.js";
import { useGameContext } from "./use-game-context";

export const useGetPlayerByColor = () => {
  const { opponent, player } = useGameContext();
  const players = [opponent, player];
  console.log("player", player);

  const wPlayer = players.find((p) => p?.color === WHITE) || null;
  const bPlayer = players.find((p) => p?.color === BLACK) || null;

  return {
    wPlayer,
    bPlayer
  };
};
