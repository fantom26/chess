import { FC } from "react";

import Link from "next/link";

import { ICONS } from "@/utils/constants";
import { ICONS_NAME } from "@/utils/enums";

export const Logo: FC = () => (
  <Link href="/" className="logo">
    <span className="logo-icon">{ICONS[ICONS_NAME.LOGO]}</span>
    <span className="logo-text">Chess</span>
  </Link>
);
