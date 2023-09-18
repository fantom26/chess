"use client";
import { useState, useRef, useEffect } from "react";
import { Chess, DEFAULT_POSITION, Square } from "chess.js";
import { createBoard, getGameOverState } from "../helpers";
import { Board } from "./components";
import { toast } from "react-toastify";
import { useGameContext, useModalContext } from "@hooks";
import { ACTIONS, MODALS } from "@utils/enums";
import { ChessSettingsModal, GameOverModal } from "../dialogs";
import { ICONS } from "@constants";

export const Game = () => {
  const [fen, setFen] = useState(DEFAULT_POSITION);
  const { current: chess } = useRef(new Chess(fen));
  const [board, setBoard] = useState(createBoard(fen));
  const { dispatch } = useGameContext();
  const { generateModalHandlers } = useModalContext();

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

  const flipBoard = () => {
    console.log("fen", fen);
    console.log("reverse", fen.split("").reverse().join(""));
    // setFen((prev) => prev.split("").reverse().join(""));
  };

  useEffect(() => {
    const [gameOver, status] = getGameOverState(chess);

    if (gameOver) {
      dispatch({ type: ACTIONS.GAME_OVER, status, player: chess.turn() });
      generateModalHandlers(MODALS.GAME_OVER).open();
      return;
    }

    dispatch({
      type: ACTIONS.SET_TURN,
      player: chess.turn(),
      check: chess.inCheck()
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fen, dispatch, chess]);

  useEffect(() => {
    setBoard(createBoard(fen));
  }, [fen]);

  return (
    <>
      <Board chess={chess} cells={board} makeMove={makeMove} setFromPos={setFromPos} />
      <div className="chess-btns">
        <button className="chess-settings" type="button" onClick={generateModalHandlers(MODALS.CHESS_SETTINGS).open}>
          {ICONS.settings}
        </button>
        <button type="button" onClick={flipBoard}>
          f
        </button>
      </div>
      <GameOverModal />
      <ChessSettingsModal />
    </>
  );
};
