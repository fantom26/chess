import { FC, ReactNode } from "react";

import { Modal } from "../common";
import { useModalContext } from "@/hooks/use-modal-context";
import { MODALS } from "@/utils/enums";

interface BoardSettingsProps {
  children: ReactNode;
  className?: string;
}

export const ChessSettingsModal: FC<BoardSettingsProps> = (props) => {
  const { modalStore, generateModalHandlers } = useModalContext();
  const { children, className } = props;

  return (
    <Modal
      width={61}
      visible={modalStore[MODALS.CHESS_SETTINGS]}
      onClose={generateModalHandlers(MODALS.CHESS_SETTINGS).close}
      bodyClassName={
        className ? `modal-chess-settings ${className}` : "modal-chess-settings"
      }
    >
      {children}
    </Modal>
  );
};
