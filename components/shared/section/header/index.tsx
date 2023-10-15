import { Langs, Logo } from "@components/shared";
import { FC } from "react";

export const Header: FC<{ locale: string }> = ({ locale }) => (
  <header className="header">
    <Logo />
    <Langs locale={locale} />
  </header>
);
