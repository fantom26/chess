import { ACTIONS } from "@utils/enums";
import { IStore } from ".";

const getPositions = (moves: string[]) =>
  moves.map((move) => {
    const n = move.length;
    return move.substring(n - 2);
  });

type SET_POSSIBLE_MOVES = { type: ACTIONS.SET_POSSIBLE_MOVES; payload: string[] };
type CLEAR_POSSIBLE_MOVES = { type: ACTIONS.CLEAR_POSSIBLE_MOVES };

export type AppActions = SET_POSSIBLE_MOVES | CLEAR_POSSIBLE_MOVES;

export const GameReducer = (state: IStore, action: AppActions) => {
  const { type } = action;

  switch (type) {
    case ACTIONS.SET_POSSIBLE_MOVES:
      return {
        ...state,
        possibleMoves: getPositions(action.payload)
      };
    case ACTIONS.CLEAR_POSSIBLE_MOVES:
      return {
        ...state,
        possibleMoves: []
      };
    default:
      return state;
  }
};
