import { ACTIONS, GAME_STATUS } from "@utils/enums";
import { IStore } from ".";
import { Color, Move } from "chess.js";
import { IPlayer } from "@utils/types";

type SET_POSSIBLE_MOVES = { type: ACTIONS.SET_POSSIBLE_MOVES; moves: string[] };
type CLEAR_POSSIBLE_MOVES = { type: ACTIONS.CLEAR_POSSIBLE_MOVES };
type SET_TURN = { type: ACTIONS.SET_TURN; check: boolean; player: Color };
type GAME_OVER = { type: ACTIONS.GAME_OVER; status: GAME_STATUS; player: Color };

type SET_PLAYER = { type: ACTIONS.SET_PLAYER; player: IPlayer };
type SET_OPPONENT = { type: ACTIONS.SET_OPPONENT; opponent: IPlayer };
type SET_OPPONENT_MOVES = { type: ACTIONS.SET_OPPONENT_MOVES; move: Move };
type CLEAR_OPPONENT_MOVES = { type: ACTIONS.CLEAR_OPPONENT_MOVES };
type UPDATE_SQUARES_COORDS = { type: ACTIONS.UPDATE_SQUARES_COORDS };

export type AppActions =
  | SET_POSSIBLE_MOVES
  | CLEAR_POSSIBLE_MOVES
  | SET_TURN
  | GAME_OVER
  | SET_PLAYER
  | SET_OPPONENT
  | SET_OPPONENT_MOVES
  | CLEAR_OPPONENT_MOVES
  | UPDATE_SQUARES_COORDS;

export const GameReducer = (state: IStore, action: AppActions) => {
  const { type } = action;

  switch (type) {
    case ACTIONS.SET_POSSIBLE_MOVES:
      return {
        ...state,
        possibleMoves: action.moves
      };
    case ACTIONS.CLEAR_POSSIBLE_MOVES:
      return {
        ...state,
        possibleMoves: []
      };
    case ACTIONS.SET_TURN:
      return { ...state, turn: action.player, check: action.check };
    case ACTIONS.GAME_OVER:
      return {
        ...state,
        gameOver: true,
        status: action.status,
        turn: action.player
      };
    case ACTIONS.UPDATE_SQUARES_COORDS:
      return { ...state, squares: state.squares.reverse() };
    case ACTIONS.SET_PLAYER:
      return { ...state, player: action.player };
    case ACTIONS.SET_OPPONENT:
      return { ...state, opponent: action.opponent };
    case ACTIONS.SET_OPPONENT_MOVES:
      return { ...state, opponentMoves: [...state.opponentMoves, action.move] };
    case ACTIONS.CLEAR_OPPONENT_MOVES:
      return { ...state, opponentMoves: [] };
    default:
      return state;
  }
};
