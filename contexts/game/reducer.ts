import { ACTIONS } from "@utils/enums";
import { IStore } from ".";
import { Color } from "chess.js";

const getPositions = (moves: string[]) =>
  moves.map((move) => {
    const n = move.length;
    return move.substring(n - 2);
  });

type SET_POSSIBLE_MOVES = { type: ACTIONS.SET_POSSIBLE_MOVES; moves: string[] };
type CLEAR_POSSIBLE_MOVES = { type: ACTIONS.CLEAR_POSSIBLE_MOVES };
type SET_TURN = { type: ACTIONS.SET_TURN; check: boolean; player: Color };

export type AppActions = SET_POSSIBLE_MOVES | CLEAR_POSSIBLE_MOVES | SET_TURN;

export const GameReducer = (state: IStore, action: AppActions) => {
  const { type } = action;

  switch (type) {
    case ACTIONS.SET_POSSIBLE_MOVES:
      return {
        ...state,
        possibleMoves: getPositions(action.moves)
      };
    case ACTIONS.CLEAR_POSSIBLE_MOVES:
      return {
        ...state,
        possibleMoves: []
      };
    case ACTIONS.SET_TURN:
      return { ...state, turn: action.player, check: action.check };
    default:
      return state;
  }
};
