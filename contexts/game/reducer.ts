import { ACTIONS, GAME_STATUS } from "@utils/enums";
import { IStore } from ".";
import { Color, Move } from "chess.js";

const getPositions = (moves: string[]) =>
  moves.map((move) => {
    const n = move.length;
    return move.substring(n - 2);
  });

type SET_POSSIBLE_MOVES = { type: ACTIONS.SET_POSSIBLE_MOVES; moves: string[] };
type CLEAR_POSSIBLE_MOVES = { type: ACTIONS.CLEAR_POSSIBLE_MOVES };
type SET_TURN = { type: ACTIONS.SET_TURN; check: boolean; player: Color };
type GAME_OVER = { type: ACTIONS.GAME_OVER; status: GAME_STATUS; player: Color };
type SET_PLAYER = { type: ACTIONS.SET_PLAYER; name: string };
type SET_OPPONENT = { type: ACTIONS.SET_OPPONENT; name: string };
type SET_PLAYER_COLOR = { type: ACTIONS.SET_PLAYER_COLOR; color: Color };
type SET_MESSAGE = { type: ACTIONS.SET_MESSAGE; message: string };
type CLEAR_MESSAGE = { type: ACTIONS.CLEAR_MESSAGE };
type SET_OPPONENT_MOVES = { type: ACTIONS.SET_OPPONENT_MOVES; moves: Move[] };
type CLEAR_OPPONENT_MOVES = { type: ACTIONS.CLEAR_OPPONENT_MOVES };

export type AppActions =
  | SET_POSSIBLE_MOVES
  | CLEAR_POSSIBLE_MOVES
  | SET_TURN
  | GAME_OVER
  | SET_PLAYER
  | SET_OPPONENT
  | SET_PLAYER_COLOR
  | SET_MESSAGE
  | CLEAR_MESSAGE
  | SET_OPPONENT_MOVES
  | CLEAR_OPPONENT_MOVES;

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
    case ACTIONS.GAME_OVER:
      return {
        ...state,
        gameOver: true,
        status: action.status,
        turn: action.player
      };
    case ACTIONS.SET_PLAYER:
      return { ...state, playerName: action.name };
    case ACTIONS.SET_PLAYER_COLOR:
      return { ...state, playerColor: action.color };
    case ACTIONS.SET_OPPONENT:
      return { ...state, opponentName: action.name };
    case ACTIONS.SET_MESSAGE:
      return { ...state, message: action.message };
    case ACTIONS.CLEAR_MESSAGE:
      return { ...state, message: "" };
    case ACTIONS.SET_OPPONENT_MOVES:
      return { ...state, opponentMoves: action.moves };
    case ACTIONS.CLEAR_OPPONENT_MOVES:
      return { ...state, opponentMoves: [] };
    default:
      return state;
  }
};
