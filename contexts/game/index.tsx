import { Dispatch, ReactNode, createContext, useReducer } from "react";
import { AppActions, GameReducer } from "./reducer";
import { Color, WHITE } from "chess.js";

export interface IStore {
  possibleMoves: string[];
  turn: Color;
  check: boolean;
  dispatch: Dispatch<AppActions>;
}

const initialState: IStore = {
  possibleMoves: [],
  turn: WHITE, //w or b. w goes first so its the default
  check: false, //true if the side to move (current turn) is in check
  dispatch: () => {}
};

export const GameContext = createContext(initialState);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(GameReducer, initialState);

  return <GameContext.Provider value={{ ...state, dispatch }}>{children}</GameContext.Provider>;
};
