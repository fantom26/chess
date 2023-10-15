import { Typography } from "@components/shared";
import { ICONS } from "@constants";
import { ICONS_NAME, TagVariant } from "@utils/enums";
import { FC } from "react";

interface PlayerProps {
  name: string | undefined;
}

export const Player: FC<PlayerProps> = ({ name }) => (
  <div className="player">
    <div className="player__img">{ICONS[ICONS_NAME.PLAYER]}</div>
    <div className="player__info">
      <Typography tag="p" variant={TagVariant.PARAGRAPH} classNames="player__info-name">
        {name ? name : "Player"}
      </Typography>
    </div>
  </div>
);
