"use client";
import { FC } from "react";

import { useGameContext, useModalContext } from "hooks";
import { GAME_STATUS, MODALS, TagVariant } from "@utils/enums";
import { BLACK } from "chess.js";
import { Typography, Modal } from "@components/shared";

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
      <Typography tag={TagVariant.H2} variant={TagVariant.H2} center gutterBottom>
        Game over
      </Typography>
      <Typography tag="p" variant={TagVariant.PARAGRAPH} gutterBottom>
        The game ended in a <mark>{status}</mark>
      </Typography>
      {winner && (
        <p>
          <mark>{winner}</mark> won
        </p>
      )}
    </Modal>
  );
};
