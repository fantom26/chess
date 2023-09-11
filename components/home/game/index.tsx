"use client";
import { useState, useRef, useEffect } from "react";
import { Chess } from "chess.js";
import { createBoard } from "utils/helpers";
import { Board } from "./components";

const FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export const Game = () => {
  const [fen, setFen] = useState(FEN);
  const { current: chess } = useRef(new Chess(fen));
  const [board, setBoard] = useState(createBoard(fen));

  useEffect(() => {
    setBoard(createBoard(fen));
  }, [fen]);

  return (
    <div className="game">
      <Board cells={board} />
    </div>
  );
};
