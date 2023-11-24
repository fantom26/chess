import { BLACK, WHITE } from "chess.js";
import { useGameContext } from "./use-contextes";

export const useGetPlayerByColor = () => {
  const { opponent, player } = useGameContext();
  const players = [opponent, player];

  const wPlayer = players.find((p) => p?.color === WHITE) || null;
  const bPlayer = players.find((p) => p?.color === BLACK) || null;

  return {
    wPlayer,
    bPlayer
  };
};
