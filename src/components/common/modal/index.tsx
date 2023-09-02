import { FC, ReactNode, useEffect, useRef, useState } from "react";

import { createPortal } from "react-dom";
import { Transition } from "react-transition-group";

import { useScrollLock } from "@/hooks";

interface ModalProps {
  visible: boolean;
  children: ReactNode;
  animationDuration?: number;
  bodyClassName?: string;
  width?: number;
  onClose: () => void;
}

export const Modal: FC<ModalProps> = (props) => {
  // **Props
  const {
    visible,
    width = 83,
    animationDuration = 300,
    bodyClassName,
    children,
    onClose,
  } = props;
  const { lockScroll, unlockScroll } = useScrollLock();

  // **Local state
  const [isBrowser, setIsBrowser] = useState<boolean>(false);

  const styles: Record<string, string> = {
    "--duration": `${animationDuration}ms`,
    "--width": `${width}rem`,
  };

  // **Ref
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClose = (): void => {
    onClose();
  };

  useEffect(() => {
    setIsBrowser(true);

    if (!visible) return;

    lockScroll();

    return () => {
      unlockScroll();
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
    <Transition
      in={visible}
      timeout={animationDuration}
      mountOnEnter
      unmountOnExit
    >
      {(state) => (
        <div
          style={styles}
          className={`modal ${state}`}
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          ref={modalRef}
        >
          <div className="modal-wrapper">
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div
                className={
                  bodyClassName
                    ? `modal-content__body ${bodyClassName}`
                    : "modal-content__body"
                }
              >
                {children}
              </div>
              <button
                className="modal__close"
                aria-label="Закрыть модальное окно"
                onClick={handleClose}
              ></button>
            </div>
          </div>
        </div>
      )}
    </Transition>,
    document?.body
  );
};
