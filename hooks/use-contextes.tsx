"use client";

import { useContext } from "react";

import { ChessContext, GameContext, ModalContext } from "@contexts";

export const useChessContext = () => useContext(ChessContext);

export const useModalContext = () => useContext(ModalContext);

export const useGameContext = () => useContext(GameContext);
