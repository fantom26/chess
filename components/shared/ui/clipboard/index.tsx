"use client";
import { Input } from "@components/shared/form";
import { ICONS } from "@constants";
import { ICONS_NAME } from "@utils/enums";
import { FC, useState } from "react";

type ClipboardCopyProps = {
  text: string;
};

export const ClipboardCopy: FC<ClipboardCopyProps> = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyTextToClipboard = async (text: string) => {
    if ("clipboard" in navigator) {
      const copy = await navigator.clipboard.writeText(text);
      return copy;
    } else {
      return document.execCommand("copy", true, text);
    }
  };

  const handleCopyClick = (e: any) => {
    e.stopPropagation();
    copyTextToClipboard(text)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  };

  return (
    <div className="clipboard">
      <Input type="text" name="game-invite-link" value={text} readOnly />
      <button className="clipboard__btn" onClick={(e) => handleCopyClick(e)}>
        <span className="clipboard__icon">{isCopied ? ICONS[ICONS_NAME.COMPLETE] : ICONS[ICONS_NAME.COPY]}</span>
      </button>
    </div>
  );
};
