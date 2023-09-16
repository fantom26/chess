import { Dispatch, ReactNode, createContext, useReducer } from "react";
import { AppActions, GameReducer } from "./reducer";

export interface IStore {
  possibleMoves: string[];
  dispatch: Dispatch<AppActions>;
}

const initialState: IStore = {
  possibleMoves: [],
  dispatch: () => {}
};

export const GameContext = createContext(initialState);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(GameReducer, initialState);

  return <GameContext.Provider value={{ ...state, dispatch }}>{children}</GameContext.Provider>;
};
