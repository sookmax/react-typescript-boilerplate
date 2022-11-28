import { useRef } from "react";
import useOutsideClick from "../utils/useOutsideClick";

type Props = JSX.IntrinsicElements["div"];

export function ClickOutside(props: Props) {
  const elRef = useRef<HTMLDivElement>(null);
  const isOutsideClicked = useOutsideClick(elRef);

  return (
    <div
      data-testid="outer-div"
      className="flex h-full w-full items-center justify-center bg-teal-200"
      {...props}
    >
      <div
        data-testid="target-div"
        ref={elRef}
        className="flex h-1/2 w-1/2 flex-col items-center justify-around bg-teal-600 p-4 text-white"
      >
        <p>Is Outside Clicked? 🤔</p>
        <p data-testid="text-content" className="text-4xl">
          {isOutsideClicked ? "Yes ✅" : "No ❎"}
        </p>
        <div
          data-testid="child-div"
          className="flex h-1/2 w-full items-center justify-center bg-amber-500"
        >
          I'm a child
        </div>
      </div>
    </div>
  );
}
