import { Container, Langs, Logo } from "@components/shared";
import { FC } from "react";

export const Header: FC<{ lng: string }> = ({ lng }) => (
  <header className="header">
    <Container>
      <div className="header__wrapper">
        <Logo />
        <Langs lng={lng} />
      </div>
    </Container>
  </header>
);
