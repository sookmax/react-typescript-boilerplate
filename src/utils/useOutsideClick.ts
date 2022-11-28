import { useEffect, useState } from "react";

export default function useOutsideClick(
  targetElementRef: React.RefObject<HTMLElement>
) {
  const [clickedOutside, setClickedOutside] = useState(false);

  useEffect(() => {
    const listener = (e: PointerEvent) => {
      if (targetElementRef.current && e.target instanceof Node) {
        const targetElement = targetElementRef.current;
        if (!targetElement.contains(e.target)) {
          setClickedOutside(true);
        } else {
          setClickedOutside(false);
        }
      }
    };

    document.addEventListener("pointerup", listener);

    return () => document.removeEventListener("pointerup", listener);
  }, [targetElementRef]);

  return clickedOutside;
}
