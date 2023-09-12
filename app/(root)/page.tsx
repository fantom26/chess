"use client";
import "@/styles/globals.scss";
import { ChessSettingsModal, Game } from "@components/home";
import { Header, Container } from "@components/shared";
import { useModalContext } from "hooks";
import { ICONS } from "@constants";
import { MODALS } from "utils/enums";

export default function Home() {
  // const { chessStore } = useChessContext();
  const { generateModalHandlers } = useModalContext();

  return (
    <>
      <Header />
      <main>
        <div className="home">
          <Container>
            <div className="chess-wrapper">
              {/* <ul className={`board board--${chessStore.boardTheme.value}`}>{renderBoard(chessStore.peaceTheme.value as TCollection)}</ul> */}
              <Game />
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
