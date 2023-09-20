"use client";

import { ChessProvider, ModalProvider, GameProvider } from "@contexts";
import { ReactNode } from "react";

export const Providers = ({ children }: { children: ReactNode }) => (
  <ModalProvider>
    <ChessProvider>
      <GameProvider>{children}</GameProvider>
    </ChessProvider>
  </ModalProvider>
);
