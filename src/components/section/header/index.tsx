import { Container, Logo } from "@/components/ui";
import { FC } from "react";

export const Header: FC = () => (
  <header className="header">
    <Container>
      <Logo />
    </Container>
  </header>
);
