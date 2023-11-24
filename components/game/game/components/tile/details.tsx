import { useChessContext } from "@hooks";
import { LETTERS } from "@utils/enums";
import { TileProps } from ".";
import { FC } from "react";

type DetailsProps = Pick<TileProps, "index" | "flipped">;

export const Details: FC<DetailsProps> = ({ index, flipped }) => {
  const { chessStore } = useChessContext();
  const [letter, number] = chessStore.squares[index].split("");

  return (
    <>
      {+number === (flipped ? 8 : 1) && <span className="tile-letter">{letter}</span>}
      {letter === (flipped ? LETTERS.H : LETTERS.A) && <span className="tile-number">{number}</span>}
    </>
  );
};
