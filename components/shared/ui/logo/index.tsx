"use client";
import { FC } from "react";

import Link from "next/link";

import { ICONS } from "@constants";
import { ICONS_NAME } from "@utils/enums";

export const Logo: FC = () => (
  <Link href="/" className="logo">
    {ICONS[ICONS_NAME.LOGO]}
  </Link>
);
