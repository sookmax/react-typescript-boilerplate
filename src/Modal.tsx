import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import XMarkIcon from "./icons/XMarkIcon";
import { classNames } from "./utils";

let modalRoot = document.getElementById("modal-root") as HTMLDivElement;

if (!modalRoot) {
  modalRoot = document.createElement("div");
  modalRoot.setAttribute("id", "modal-root");
  document.body.appendChild(modalRoot);
}

type Props = {
  className?: string;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ className, onClose, children }: Props) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const onBackgroundClick = (event: React.MouseEvent) => {
    if (event.target === backdropRef.current) {
      onClose();
    }
  };

  const onCloseButtonClick = () => {
    onClose();
  };

  useEffect(() => {
    const resizeListener = () => {
      if (backdropRef.current) {
        backdropRef.current.style.width = `${window.innerWidth}px`;
        backdropRef.current.style.height = `${window.innerHeight}px`;
      }
    };

    window.addEventListener("resize", resizeListener);

    return () => window.removeEventListener("resize", resizeListener);
  }, []);

  return createPortal(
    <div
      role="dialog"
      aria-labelledby="dialogTitle"
      aria-describedby="dialogMessage"
      ref={backdropRef}
      tabIndex={-1}
      className={classNames("fixed top-0", "bg-black text-white")}
      style={{
        "--tw-bg-opacity": 0.5,
        width: `${window.innerWidth}px`,
        height: `${window.innerHeight}px`,
      }}
      onClick={onBackgroundClick}
    >
      <div
        data-testid="dialog-content-box"
        className={classNames(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          className
        )}
      >
        <button
          aria-label="default-close-button"
          ref={closeButtonRef}
          onClick={onCloseButtonClick}
          className={classNames(
            "absolute top-0 right-0",
            "text-black",
            "w-8 h-8",
            "p-1"
          )}
        >
          <XMarkIcon />
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
}
