import Image from "next/image";
import { FC } from "react";

interface TileProps {
  img?: string | null;
  number: number;
}

export const Tile: FC<TileProps> = (props) => {
  const { number, img } = props;
  return (
    <li
      className={number % 2 === 0 ? "tile tile--white" : "tile tile--black"}
      key={number}
    >
      {img && <Image src={img} width="60" height="60" alt="Piece" />}
    </li>
  );
};
