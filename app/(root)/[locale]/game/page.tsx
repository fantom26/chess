import "@/styles/globals.scss";
import { Game } from "@components/game";
import { Container } from "@components/shared";

export default function GamePage() {
  return (
    <div className="game page--center">
      <Container>
        <Game />
      </Container>
    </div>
  );
}
