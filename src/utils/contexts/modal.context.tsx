/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { MODALS } from "../enums";
import { TModals } from "../types";

interface IStore {
  [MODALS.CHESS_SETTINGS]: boolean;
}

interface ModalProviderProps {
  children: ReactNode;
}

export interface ModalContextProps {
  modalStore: IStore;
  generateModalHandlers: (name: TModals) => {
    open: () => void;
    close: () => void;
  };
}

const initialState: ModalContextProps = {
  modalStore: {
    [MODALS.CHESS_SETTINGS]: true,
  },
  generateModalHandlers: (name: TModals) => ({
    open: () => {},
    close: () => {},
  }),
};

export const ModalContext = createContext(initialState);

export const ModalProvider: FC<ModalProviderProps> = (props) => {
  const { children } = props;
  const [modalStore, setModalStore] = useState<IStore>(initialState.modalStore);

  const generateModalHandlers = (name: TModals) => {
    const open = () => {
      setModalStore((prev) => ({
        ...prev,
        [name]: true,
      }));
    };

    const close = () => {
      setModalStore((prev) => ({
        ...prev,
        [name]: false,
      }));
    };

    return {
      open,
      close,
    };
  };

  const value = {
    modalStore,
    generateModalHandlers,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
