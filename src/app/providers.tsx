"use client";

import { ChessProvider } from "@/utils/contexts";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChessProvider>{children}</ChessProvider>;
}
