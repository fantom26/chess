import { FC } from "react";

import { Modal } from "components/shared/modal";
import { useGameContext, useModalContext } from "hooks";
import { GAME_STATUS, MODALS } from "@utils/enums";
import { BLACK } from "chess.js";

export const GameOverModal: FC = () => {
  const { modalStore, generateModalHandlers } = useModalContext();

  const { status, turn } = useGameContext();

  let winner;
  if (status !== GAME_STATUS.CONTINUE) {
    if (turn === BLACK) {
      winner = "white";
    } else {
      winner = "black";
    }
  }

  return (
    <Modal width={45} visible={modalStore[MODALS.GAME_OVER]} onClose={generateModalHandlers(MODALS.GAME_OVER).close} bodyClassName="modal-game-over">
      <h1>Game over</h1>
      <p>
        The game ended in a <mark>{status}</mark>
      </p>
      {winner && (
        <p>
          <mark>{winner}</mark> won
        </p>
      )}
    </Modal>
  );
};
