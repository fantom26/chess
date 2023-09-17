"use client";
import { useState, useRef, useEffect } from "react";
import { Chess, Square } from "chess.js";
import { createBoard } from "@helpers";
import { Board } from "./components";
import { toast } from "react-toastify";
import { useGameContext } from "@hooks";
import { ACTIONS } from "@utils/enums";

const FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export const Game = () => {
  const [fen, setFen] = useState(FEN);
  const { current: chess } = useRef(new Chess(fen));
  const [board, setBoard] = useState(createBoard(fen));
  const { dispatch } = useGameContext();

  useEffect(() => {
    setBoard(createBoard(fen));
  }, [fen]);

  const fromPos = useRef<string | null>(null);

  const makeMove = (pos: string) => {
    try {
      if (fromPos.current) {
        const from = fromPos.current;
        const to = pos;
        chess.move({ from, to });
        dispatch({ type: ACTIONS.CLEAR_POSSIBLE_MOVES });
        setFen(chess.fen());
      }
    } catch (e) {
      toast.warn("Invalid move");
    }
  };

  const setFromPos = (pos: Square) => {
    fromPos.current = pos;

    dispatch({
      type: ACTIONS.SET_POSSIBLE_MOVES,
      moves: chess.moves({ square: pos })
    });
  };

  useEffect(() => {
    dispatch({
      type: ACTIONS.SET_TURN,
      player: chess.turn(),
      check: chess.inCheck()
    });
  }, [fen, dispatch, chess]);

  return (
    <div className="game">
      <Board cells={board} makeMove={makeMove} setFromPos={setFromPos} />
    </div>
  );
};
