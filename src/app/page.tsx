"use client";
import { ChessSettingsModal } from "@/components/dialogs";
import { useChessContext } from "@/hooks";
import "@/styles/globals.scss";
import { renderBoard } from "@/utils/helpers";
import { useState } from "react";

export default function Home() {
  const { chessStore } = useChessContext();

  const [collection, setCollection] = useState(chessStore.peaceTheme);

  return (
    <>
      <div className="home">
        <div className="container">
          <ul className="chess-board">{renderBoard(collection)}</ul>
        </div>
      </div>
      <ChessSettingsModal>
        <h2>test</h2>
      </ChessSettingsModal>
    </>
  );
}
