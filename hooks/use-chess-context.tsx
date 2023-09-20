"use client";

import { useContext } from "react";

import { ChessContext } from "@contexts";

export const useChessContext = () => useContext(ChessContext);
