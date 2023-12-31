"use client";
import { useState, useRef, useEffect } from "react";
import { Chess, DEFAULT_POSITION, Move, Square } from "chess.js";
import { createBoard, getGameOverState, getPositions, reverseFen } from "../helpers";
import { Board, SideBar } from "./components";
import { useChessSounds, useGameContext, useModalContext } from "@hooks";
import { ACTIONS, GAME_STATUS, ICONS_NAME, MODALS, QUERY_PARAMS, SOUNDS_EFFECTS } from "@utils/enums";
import { ChessSettingsModal, GameOverModal, JoinGameModal } from "../dialogs";
import { ICONS } from "@constants";
import io from "socket.io-client";
import { Button } from "@components/shared";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { IPlayer, TFIgure } from "@utils/types";
import { ToastService } from "@services";

const socket = io("localhost:5000");

export const Game = () => {
  const { play } = useChessSounds();
  const [fen, setFen] = useState(DEFAULT_POSITION);
  const { current: chess } = useRef(new Chess(fen));
  const [boardFlipped, setBoardFlipped] = useState(true);
  const [board, setBoard] = useState(createBoard(fen, false));
  const playerName = useRef<string | null>(null);
  const gameID = useRef<string | null>(null);
  const fromPos = useRef<string | null>(null);
  const router = useRouter();
  const { locale } = useParams();
  const { dispatch } = useGameContext();
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
        setFen(boardFlipped ? chess.fen() : reverseFen(chess.fen()));
        socket.emit("move", { gameID: gameID.current, from, to: pos });
      }
    } catch (e) {
      play({ id: SOUNDS_EFFECTS.ILLEGAL });
    }
  };

  const setFromPos = (pos: Square, piece: TFIgure) => {
    fromPos.current = pos;

    dispatch({
      type: ACTIONS.SET_POSSIBLE_MOVES,
      moves: getPositions(chess.moves({ square: pos }), piece)
    });
  };

  const flipBoard = () => {
    setFen(reverseFen(fen));
    dispatch({ type: ACTIONS.UPDATE_SQUARES_COORDS });
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
      socket.emit("join", { name: playerName.current, gameID: gameID.current }, ({ error, player }: { error: boolean; player: IPlayer }) => {
        if (error) {
          router.push(`${locale}`);
        }
        dispatch({ type: ACTIONS.SET_PLAYER, player });
      });
      socket.on("welcome", ({ message, opponent }: { message: string; opponent: IPlayer }) => {
        ToastService.info({ content: message });
        dispatch({ type: ACTIONS.SET_OPPONENT, opponent });
      });
      socket.on("opponentJoin", ({ message, opponent }: { message: string; opponent: IPlayer }) => {
        ToastService.info({ content: message });
        dispatch({ type: ACTIONS.SET_OPPONENT, opponent });
      });

      socket.on("opponentMove", ({ from, to }) => {
        chess.move({ from, to });
        setFen(chess.fen());
        ToastService.info({ content: "Your turn" });
        dispatch({ type: ACTIONS.SET_OPPONENT_MOVES, move: { from, to } as Move });
      });
      socket.on("message", ({ message }) => {
        ToastService.info({ content: message });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chess, searchParams, dispatch]);

  return (
    <>
      <div className="home">
        <div className="game-wrapper">
          <Board flipped={!boardFlipped} chess={chess} cells={board} makeMove={makeMove} setFromPos={setFromPos} />
          <div className="game-btns">
            <Button className="game-icon" aria-label="Settings button" onClick={generateModalHandlers(MODALS.CHESS_SETTINGS).open}>
              {ICONS[ICONS_NAME.SETTINGS]}
            </Button>
            <Button className="game-icon" aria-label="Reverse board button" onClick={flipBoard}>
              {ICONS[ICONS_NAME.REVERSE]}
            </Button>
          </div>
        </div>
        <SideBar chess={chess} />
      </div>
      <GameOverModal />
      <ChessSettingsModal />
      <JoinGameModal />
    </>
  );
};
