/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { COLLECTIONS } from "../enums";
import { TCollection } from "../types";

interface IStore {
  peaceTheme: TCollection;
}

interface ChessProviderProps {
  children: ReactNode;
}

export interface ChessContextProps {
  chessStore: IStore;
  setChessStore: Dispatch<SetStateAction<IStore>>;
}

const initialState: ChessContextProps = {
  chessStore: {
    peaceTheme: COLLECTIONS.STONE,
  },
  // eslint-disable-next-line no-empty-function
  setChessStore: () => {},
};

export const ChessContext = createContext(initialState);

export const ChessProvider: FC<ChessProviderProps> = (props) => {
  const { children } = props;
  const [chessStore, setChessStore] = useState<IStore>(initialState.chessStore);

  const value = {
    chessStore,
    setChessStore,
  };

  return (
    <ChessContext.Provider value={value}>{children}</ChessContext.Provider>
  );
};
