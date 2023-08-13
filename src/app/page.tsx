import "@/styles/globals.scss";
import { renderBoard } from "@/utils/helpers";

export default function Home() {
  return (
    <div className="home">
      <div className="container">
        <ul className="chess-board">{renderBoard()}</ul>
      </div>
    </div>
  );
}
