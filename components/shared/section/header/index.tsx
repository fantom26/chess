import { Container, Langs, Logo } from "@components/shared";
import { FC } from "react";

export const Header: FC<{ locale: string }> = ({ locale }) => (
  <header className="header">
    <Container>
      <div className="header__wrapper">
        <Logo />
        <Langs locale={locale} />
      </div>
    </Container>
  </header>
);
