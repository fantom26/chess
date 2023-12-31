import { useGameContext } from "@hooks";
import { LETTERS } from "@utils/enums";
import { TileProps } from ".";
import { FC } from "react";

type DetailsProps = Pick<TileProps, "index" | "flipped">;

export const Details: FC<DetailsProps> = ({ index, flipped }) => {
  const { squares } = useGameContext();
  const [letter, number] = squares[index].split("");
  return (
    <>
      {+number === (flipped ? 8 : 1) && <span className="tile-letter">{letter}</span>}
      {letter === (flipped ? LETTERS.H : LETTERS.A) && <span className="tile-number">{number}</span>}
    </>
  );
};
