"use client";
import { Container, Logo } from "@components/shared";
import { FC } from "react";

export const Header: FC = () => (
  <header className="header">
    <Container>
      <Logo />
    </Container>
  </header>
);
