"use client";
import { useState, useRef, useEffect } from "react";
import { Chess, DEFAULT_POSITION, Square } from "chess.js";
import { createBoard, getGameOverState, reverseFen } from "../helpers";
import { Board, SideBar } from "./components";
import { useChessContext, useChessSounds, useGameContext, useModalContext } from "@hooks";
import { ACTIONS, GAME_STATUS, ICONS_NAME, MODALS, QUERY_PARAMS, SOUNDS_EFFECTS } from "@utils/enums";
import { ChessSettingsModal, GameOverModal, JoinGameModal } from "../dialogs";
import { ICONS } from "@constants";
import io from "socket.io-client";
import { Button } from "@components/shared";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { IPlayer } from "@utils/types";
const socket = io("localhost:5000");

export const Game = () => {
  const { play } = useChessSounds();
  const [fen, setFen] = useState(DEFAULT_POSITION);
  const { current: chess } = useRef(new Chess(fen));
  const [boardFlipped, setBoardFlipped] = useState(false);
  const [board, setBoard] = useState(createBoard(fen, false));
  const playerName = useRef<string | null>(null);
  const gameID = useRef<string | null>(null);
  const fromPos = useRef<string | null>(null);
  const router = useRouter();
  const { locale } = useParams();
  const { dispatch } = useGameContext();
  const { setChessStore } = useChessContext();
  const { generateModalHandlers } = useModalContext();
  const searchParams = useSearchParams();

  const makeMove = (pos: string) => {
    try {
      if (fromPos.current) {
        const from = fromPos.current;
        const to = pos;
        chess.move({ from, to });
        play({ id: SOUNDS_EFFECTS.MOVE_SELF });
        dispatch({ type: ACTIONS.CLEAR_POSSIBLE_MOVES });
        setFen(boardFlipped ? reverseFen(chess.fen()) : chess.fen());
        socket.emit("move", { gameID: gameID.current, from, to: pos });
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

  useEffect(() => {
    playerName.current = searchParams.get(QUERY_PARAMS.NAME);
    gameID.current = searchParams.get(QUERY_PARAMS.GAME_ID);
  }, [searchParams]);

  useEffect(() => {
    if (gameID.current && playerName.current) {
      socket.emit("join", { name: playerName.current, gameID: gameID.current }, ({ error }: { error: boolean }) => {
        if (error) {
          router.push(`${locale}`);
        }
      });
      socket.on("welcome", ({ message, opponent }: { message: string; opponent: IPlayer }) => {
        console.log("player1", opponent);
        dispatch({ type: ACTIONS.SET_MESSAGE, message });
        dispatch({ type: ACTIONS.SET_OPPONENT, opponent });
      });
      socket.on("opponentJoin", ({ message, opponent }: { message: string; opponent: IPlayer }) => {
        console.log("player2", opponent);
        dispatch({ type: ACTIONS.SET_MESSAGE, message });
        dispatch({ type: ACTIONS.SET_OPPONENT, opponent });
      });

      socket.on("opponentMove", ({ from, to }) => {
        chess.move({ from, to });
        setFen(chess.fen());
        dispatch({ type: ACTIONS.SET_MESSAGE, message: "Your turn" });
        dispatch({ type: ACTIONS.SET_OPPONENT_MOVES, moves: [from, to] });
      });
      socket.on("message", ({ message }) => {
        dispatch({ type: ACTIONS.SET_MESSAGE, message });
      });
    }
  }, [chess, router, dispatch]);

  return (
    <>
      <div className="home">
        <div className="game-wrapper">
          <Board flipped={boardFlipped} chess={chess} cells={board} makeMove={makeMove} setFromPos={setFromPos} />
          <div className="game-btns">
            <Button className="game-icon" onClick={generateModalHandlers(MODALS.CHESS_SETTINGS).open}>
              {ICONS[ICONS_NAME.SETTINGS]}
            </Button>
            <Button className="game-icon" onClick={flipBoard}>
              {ICONS[ICONS_NAME.REVERSE]}
            </Button>
          </div>
        </div>
        <SideBar />
      </div>
      <GameOverModal />
      <ChessSettingsModal />
      <JoinGameModal />
    </>
  );
};
