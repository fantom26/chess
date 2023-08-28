import "@/styles/globals.scss";
import { COLLECTIONS } from "@/utils/enums";
import { renderBoard } from "@/utils/helpers";
// import { useState } from "react";

export default function Home() {
  // const [collection, setCollection] = useState(COLLECTIONS.STONE);

  return (
    <div className="home">
      <div className="container">
        <ul className="chess-board">{renderBoard(COLLECTIONS.STONE)}</ul>
      </div>
    </div>
  );
}
