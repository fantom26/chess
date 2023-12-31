"use client";
import { FC, KeyboardEvent, ReactNode, useEffect, useRef, useState } from "react";

import { createPortal } from "react-dom";
import { Transition } from "react-transition-group";

import { useScrollLock } from "hooks";

interface ModalProps {
  visible: boolean;
  children: ReactNode;
  bodyClassName?: string;
  width?: number;
  onClose: () => void;
}

export const Modal: FC<ModalProps> = (props) => {
  // **Props
  const { visible, width = 83, bodyClassName, children, onClose } = props;
  const { lockScroll, unlockScroll } = useScrollLock();

  const [isBrowser, setIsBrowser] = useState<boolean>(false);

  const styles: Record<string, string> = {
    "--width": `${width}rem`
  };

  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    setIsBrowser(true);

    if (!visible) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    lockScroll();
    window.addEventListener("keydown", handleKeyDown as any);

    return () => {
      unlockScroll();
      window.removeEventListener("keydown", handleKeyDown as any);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (!isBrowser) {
    return null;
  }

  return createPortal(
    <Transition in={visible} timeout={300} mountOnEnter unmountOnExit>
      {(state) => (
        <div style={styles} onKeyDown={handleKeyDown} className={`modal ${state}`} onClick={onClose} role="dialog" aria-modal="true" ref={modalRef}>
          <div className="modal-wrapper">
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className={bodyClassName ? `modal-content__body ${bodyClassName}` : "modal-content__body"}>{children}</div>
              <button className="modal__close" aria-label="Close modal window" onClick={onClose}></button>
            </div>
          </div>
        </div>
      )}
    </Transition>,
    document?.body
  );
};
