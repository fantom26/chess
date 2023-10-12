"use client";

import { ChessProvider, ModalProvider, GameProvider, TranslationsProvider } from "@contexts";
import { ReactNode } from "react";

export interface ProvidersProps {
  children: ReactNode;
  locale: string;
  namespaces: string | readonly string[] | undefined;
}

export const Providers = (props: ProvidersProps) => {
  const { children, locale, namespaces } = props;

  return (
    <TranslationsProvider locale={locale} namespaces={namespaces}>
      <ModalProvider>
        <ChessProvider>
          <GameProvider>{children}</GameProvider>
        </ChessProvider>
      </ModalProvider>
    </TranslationsProvider>
  );
};
