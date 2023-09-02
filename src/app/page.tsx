"use client";
import { ChessSettingsModal } from "@/components/dialogs";
import { useChessContext, useModalContext } from "@/hooks";
import "@/styles/globals.scss";
import { ICONS } from "@/utils/constants";
import { MODALS } from "@/utils/enums";
import { renderBoard } from "@/utils/helpers";
import { useState } from "react";

export default function Home() {
  const { chessStore } = useChessContext();
  const { generateModalHandlers } = useModalContext();

  const [collection, setCollection] = useState(chessStore.peaceTheme);

  return (
    <>
      <div className="home">
        <div className="container">
          <div className="chess-wrapper">
            <ul className="chess-board">{renderBoard(collection)}</ul>
            <button
              className="chess-settings"
              type="button"
              onClick={generateModalHandlers(MODALS.CHESS_SETTINGS).open}
            >
              {ICONS.settings}
            </button>
          </div>
        </div>
      </div>
      <ChessSettingsModal>
        <h2>test</h2>
      </ChessSettingsModal>
    </>
  );
}
