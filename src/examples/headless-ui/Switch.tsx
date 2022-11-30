import { useCallback, useEffect, useRef, useState } from "react";
import { classNames } from "../../utils";

type Props = {
  value?: boolean;
  onClick?: () => void;
} & Omit<JSX.IntrinsicElements["button"], "ref" | "onClick" | "value">;

export default function Switch({ value, onClick, className }: Props) {
  const [_toggled, _setToggled] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const circleRef = useRef<HTMLSpanElement>(null);
  const xTranslate = useRef(0);

  const toggled = value !== undefined ? value : _toggled;

  const _onClick = useCallback(() => {
    _setToggled((toggled) => !toggled);

    onClick?.();
  }, [onClick]);

  useEffect(() => {
    if (!buttonRef.current || !circleRef.current) return;

    const buttonEl = buttonRef.current;
    const circleEl = circleRef.current;

    const resizeObserver = new ResizeObserver(() => {
      const {
        width: buttonWidth,
        left: buttonLeft,
        right: buttonRight,
      } = buttonEl.getBoundingClientRect();
      const {
        width: circleWidth,
        left: circleLeft,
        right: circleRight,
      } = circleEl.getBoundingClientRect();
      const offset = Math.min(
        circleLeft - buttonLeft,
        buttonRight - circleRight
      );
      xTranslate.current = buttonWidth - (circleWidth + 2 * offset);
    });

    resizeObserver.observe(buttonEl, { box: "border-box" });
    resizeObserver.observe(circleEl, { box: "border-box" });

    return () => {
      resizeObserver.unobserve(buttonEl);
      resizeObserver.unobserve(circleEl);
    };
  }, []);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={_onClick}
        className={classNames(
          "flex w-16 items-center rounded-full p-1",
          toggled ? "bg-amber-500" : "bg-gray-300",
          "transition-colors",
          className
        )}
      >
        <span
          ref={circleRef}
          className={classNames(
            "h-6 w-6 rounded-full bg-white transition-transform duration-100"
          )}
          style={{
            transform: toggled
              ? `translateX(${xTranslate.current}px)`
              : undefined,
          }}
        />
      </button>
    </>
  );
}
