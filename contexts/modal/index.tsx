/* eslint-disable no-empty-function */
import { FC, ReactNode, createContext, useState } from "react";
import { MODALS } from "../../utils/enums";

interface IStore {
  [MODALS.CHESS_SETTINGS]: boolean;
  [MODALS.GAME_OVER]: boolean;
}

interface ModalProviderProps {
  children: ReactNode;
}

export interface ModalContextProps {
  modalStore: IStore;
  generateModalHandlers: (name: MODALS) => {
    open: () => void;
    close: () => void;
  };
}

const initialState: ModalContextProps = {
  modalStore: {
    [MODALS.CHESS_SETTINGS]: false,
    [MODALS.GAME_OVER]: false
  },
  generateModalHandlers: () => ({
    open: () => {},
    close: () => {}
  })
};

export const ModalContext = createContext(initialState);

export const ModalProvider: FC<ModalProviderProps> = (props) => {
  const { children } = props;
  const [modalStore, setModalStore] = useState<IStore>(initialState.modalStore);

  const generateModalHandlers = (name: MODALS) => {
    const open = () => {
      setModalStore((prev) => ({
        ...prev,
        [name]: true
      }));
    };

    const close = () => {
      setModalStore((prev) => ({
        ...prev,
        [name]: false
      }));
    };

    return {
      open,
      close
    };
  };

  const value = {
    modalStore,
    generateModalHandlers
  };

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};
