import { Typography } from "@components/shared";
import { ICONS } from "@constants";
import { ICONS_NAME, TagVariant } from "@utils/enums";
import { IPlayer } from "@utils/types";
import { FC } from "react";

interface PlayerProps {
  player: IPlayer | null;
}

export const Player: FC<PlayerProps> = ({ player }) => (
  <div className="player">
    <div className={`player__img player__img--${player?.color}`}>{ICONS[ICONS_NAME.PLAYER]}</div>
    <div className="player__info">
      <Typography tag="p" variant={TagVariant.PARAGRAPH} classNames="player__info-name">
        {player?.name ? player.name : "Player"}
      </Typography>
    </div>
  </div>
);
