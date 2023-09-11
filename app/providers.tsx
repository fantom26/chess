"use client";

import { ChessProvider, ModalProvider } from "utils/contexts";

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <ModalProvider>
    <ChessProvider>{children}</ChessProvider>
  </ModalProvider>
);
