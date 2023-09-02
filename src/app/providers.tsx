"use client";

import { ChessProvider, ModalProvider } from "@/utils/contexts";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ModalProvider>
      <ChessProvider>{children}</ChessProvider>
    </ModalProvider>
  );
}
