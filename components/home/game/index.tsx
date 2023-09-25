"use client";
import { useState, useRef, useEffect } from "react";
import { Chess, DEFAULT_POSITION, Square } from "chess.js";
import { createBoard, getGameOverState, reverseFen } from "../helpers";
import { Board } from "./components";
import { useChessContext, useGameContext, useModalContext } from "@hooks";
import { ACTIONS, GAME_STATUS, ICONS_NAME, MODALS, SOUNDS_EFFECTS } from "@utils/enums";
import { ChessSettingsModal, GameOverModal } from "../dialogs";
import { ICONS } from "@constants";
import useSound from "use-sound";
import { useParams } from "next/navigation";

export const Game = () => {
  const params = useParams();
  const [play] = useSound(`${params.lng}/sounds/effects.mp3`, {
    volume: 1,
    sprite: {
      [SOUNDS_EFFECTS.CAPTURE]: [0, 370.7482993197279],
      [SOUNDS_EFFECTS.CASTLE]: [2000, 267.2789115646257],
      [SOUNDS_EFFECTS.GAME_END]: [4000, 284.69387755102014],
      [SOUNDS_EFFECTS.GAME_START]: [6000, 275.2154195011336],
      [SOUNDS_EFFECTS.ILLEGAL]: [8000, 219.50113378684756],
      [SOUNDS_EFFECTS.MOVE_CHECK]: [10000, 332.2902494331075],
      [SOUNDS_EFFECTS.MOVE_OPPONENT]: [12000, 152.65306122448942],
      [SOUNDS_EFFECTS.MOVE_SELF]: [14000, 153.87755102040757],
      [SOUNDS_EFFECTS.NOTIFY]: [16000, 182.72108843537538],
      [SOUNDS_EFFECTS.PREMOVE]: [18000, 197.2335600907016],
      [SOUNDS_EFFECTS.PROMOTE]: [20000, 262.2675736961462],
      [SOUNDS_EFFECTS.TENSECONDS]: [22000, 620.2267573696147]
    }
  });
  const [fen, setFen] = useState(DEFAULT_POSITION);
  const { current: chess } = useRef(new Chess(fen));
  const [boardFlipped, setBoardFlipped] = useState(false);
  const [board, setBoard] = useState(createBoard(fen, false));
  const { dispatch } = useGameContext();
  const { setChessStore } = useChessContext();
  const { generateModalHandlers } = useModalContext();

  const fromPos = useRef<string | null>(null);

  const makeMove = (pos: string) => {
    try {
      if (fromPos.current) {
        const from = fromPos.current;
        const to = pos;
        chess.move({ from, to });
        play({ id: SOUNDS_EFFECTS.MOVE_SELF });
        dispatch({ type: ACTIONS.CLEAR_POSSIBLE_MOVES });
        setFen(boardFlipped ? reverseFen(chess.fen()) : chess.fen());
      }
    } catch (e) {
      play({ id: SOUNDS_EFFECTS.ILLEGAL });
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
    setFen(reverseFen(fen));
    setChessStore((prev) => ({ ...prev, squares: prev.squares.reverse() }));
    setBoardFlipped((prev) => !prev);
  };

  useEffect(() => {
    const [gameOver, status] = getGameOverState(chess);

    if (gameOver) {
      dispatch({ type: ACTIONS.GAME_OVER, status, player: chess.turn() });
      if (status === GAME_STATUS.CHECKMATE) {
        play({ id: SOUNDS_EFFECTS.GAME_END });
      }
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
    setBoard(createBoard(fen, boardFlipped));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fen]);

  return (
    <>
      <Board flipped={boardFlipped} chess={chess} cells={board} makeMove={makeMove} setFromPos={setFromPos} />
      <div className="chess-btns">
        <button className="chess-icon" type="button" onClick={generateModalHandlers(MODALS.CHESS_SETTINGS).open}>
          {ICONS[ICONS_NAME.SETTINGS]}
        </button>
        <button className="chess-icon" type="button" onClick={flipBoard}>
          {ICONS[ICONS_NAME.REVERSE]}
        </button>
      </div>
      <GameOverModal />
      <ChessSettingsModal />
    </>
  );
};
