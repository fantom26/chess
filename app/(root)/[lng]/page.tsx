import "@/styles/globals.scss";
import { Game } from "@components/home";
import { Header, Container } from "@components/shared";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <div className="home">
          <Container>
            <div className="chess-wrapper">
              <Game />
            </div>
          </Container>
        </div>
      </main>
    </>
  );
}
