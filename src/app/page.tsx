"use client";
import { ChessSettingsModal } from "@/components/dialogs";
import { Header } from "@/components/section";
import { Container } from "@/components/ui";
import { useChessContext, useModalContext } from "@/hooks";
import "@/styles/globals.scss";
import { ICONS } from "@/utils/constants";
import { MODALS } from "@/utils/enums";
import { renderBoard } from "@/utils/helpers";
import { TCollection } from "@/utils/types";

export default function Home() {
  const { chessStore } = useChessContext();
  const { generateModalHandlers } = useModalContext();

  return (
    <>
      <Header />
      <main>
        <div className="home">
          <Container>
            <div className="chess-wrapper">
              <ul className={`board board--${chessStore.boardTheme.value}`}>{renderBoard(chessStore.peaceTheme.value as TCollection)}</ul>
              <button className="chess-settings" type="button" onClick={generateModalHandlers(MODALS.CHESS_SETTINGS).open}>
                {ICONS.settings}
              </button>
            </div>
          </Container>
        </div>
      </main>
      <ChessSettingsModal />
    </>
  );
}
