"use client";
import { Dispatch, ReactNode, createContext, useReducer } from "react";
import { AppActions, GameReducer } from "./reducer";
import { Color, Move, WHITE } from "chess.js";
import { GAME_STATUS } from "@utils/enums";
import { IPlayer } from "@utils/types";

export interface IStore {
  possibleMoves: string[];
  turn: Color;
  check: boolean;
  gameOver: boolean;
  status: GAME_STATUS;
  player: IPlayer | null;
  playerColor: Color;
  opponent: IPlayer | null;
  message: string;
  opponentMoves: Move[];

  dispatch: Dispatch<AppActions>;
}

const initialState: IStore = {
  possibleMoves: [],
  turn: WHITE, //w or b. w goes first so its the default
  check: false, //true if the side to move (current turn) is in check
  gameOver: false,
  status: GAME_STATUS.CONTINUE,
  player: null,
  playerColor: "w",
  opponent: null,
  message: "",
  opponentMoves: [],

  dispatch: () => {}
};

export const GameContext = createContext(initialState);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(GameReducer, initialState);

  return <GameContext.Provider value={{ ...state, dispatch }}>{children}</GameContext.Provider>;
};
