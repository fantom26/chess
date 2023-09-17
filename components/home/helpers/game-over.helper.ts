import { GAME_STATUS } from "@utils/enums";
import { Chess } from "chess.js";

export const getGameOverState = (chess: Chess): [boolean, GAME_STATUS] => {
  if (chess.isGameOver()) {
    if (chess.isCheckmate()) {
      return [true, GAME_STATUS.CHECKMATE];
    }

    if (chess.isStalemate()) {
      return [true, GAME_STATUS.STALEMATE];
    }

    if (chess.isInsufficientMaterial()) {
      return [true, GAME_STATUS.SUFFICIENT_MATERIAL];
    }

    if (chess.isThreefoldRepetition()) {
      return [true, GAME_STATUS.THREE_FOLD_REPETITION];
    }

    if (chess.isDraw()) {
      return [true, GAME_STATUS.DRAW];
    }
  }

  return [false, GAME_STATUS.CONTINUE];
};
