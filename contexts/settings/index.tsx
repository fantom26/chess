"use client";
/* eslint-disable @typescript-eslint/no-empty-function */
import { Dispatch, FC, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
import { BOARD_COLORS, COLLECTIONS, FORM_FIELDS } from "../../utils/enums";
import { TSelectOption } from "../../utils/validation";
import { localStorageService } from "@services";
import { LOCAL_STORAGE_SETTING_KEY } from "@constants/shared/common";

interface IStore {
  [FORM_FIELDS.PEACE_THEME]: TSelectOption;
  [FORM_FIELDS.BOARD_THEME]: TSelectOption;
  [FORM_FIELDS.HIGHLIGHT_MOVE]: boolean;
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
    [FORM_FIELDS.PEACE_THEME]: {
      label: COLLECTIONS.CLUB,
      value: COLLECTIONS.CLUB
    },
    [FORM_FIELDS.BOARD_THEME]: {
      label: BOARD_COLORS.CLASSIC,
      value: BOARD_COLORS.CLASSIC
    },
    [FORM_FIELDS.HIGHLIGHT_MOVE]: true
  },
  // eslint-disable-next-line no-empty-function
  setChessStore: () => {}
};

export const ChessContext = createContext(initialState);

export const ChessProvider: FC<ChessProviderProps> = (props) => {
  const { children } = props;
  const [chessStore, setChessStore] = useState<ChessContextProps["chessStore"]>(initialState.chessStore);

  const value = {
    chessStore,
    setChessStore
  };

  useEffect(() => {
    const settingsInBrowserStorage = localStorageService.getItem(LOCAL_STORAGE_SETTING_KEY);

    if (settingsInBrowserStorage) {
      setChessStore(settingsInBrowserStorage);
    } else {
      setChessStore(initialState.chessStore);
    }
  }, []);

  useEffect(() => {
    if (chessStore) {
      localStorageService.setItem(LOCAL_STORAGE_SETTING_KEY, chessStore);
    }
  }, [chessStore]);

  return <ChessContext.Provider value={value}>{children}</ChessContext.Provider>;
};
