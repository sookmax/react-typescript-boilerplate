import { useEffect, useRef, useState } from "react";
import obeserveRect from "../utils/observeRect";

type Rect = (Partial<DOMRect> | undefined)[];

export default function AnimatedRect() {
  const tab1ElRef = useRef<HTMLButtonElement>(null);
  const tab2ElRef = useRef<HTMLButtonElement>(null);
  const tab3ElRef = useRef<HTMLButtonElement>(null);

  const [activeTab, setActiveTab] = useState(0);
  const [rect, setRect] = useState<Rect>([undefined, undefined, undefined]);
  const [transition, setTransition] = useState<string | undefined>(undefined);

  const handleTabChange = (tabIndex: number) => {
    setActiveTab(tabIndex);
    setTransition("all 300ms ease");
  };

  useEffect(() => {
    if (!tab1ElRef.current || !tab2ElRef.current || !tab3ElRef.current) return;

    const tab1Observer = obeserveRect(tab1ElRef.current, (rect) => {
      setRect((prevRect) => [rect, prevRect[1], prevRect[2]]);
      setTransition(undefined);
    });
    const tab2Observer = obeserveRect(tab2ElRef.current, (rect) => {
      setRect((prevRect) => [prevRect[0], rect, prevRect[2]]);
      setTransition(undefined);
    });
    const tab3Observer = obeserveRect(tab3ElRef.current, (rect) => {
      setRect((prevRect) => [prevRect[0], prevRect[1], rect]);
      setTransition(undefined);
    });

    tab1Observer.observe();
    tab2Observer.observe();
    tab3Observer.observe();

    return () => {
      tab1Observer.unObserve();
      tab2Observer.unObserve();
      tab3Observer.unObserve();
    };
  }, []);

  return (
    <>
      <div className="flex w-full h-full justify-center items-center">
        <button
          ref={tab1ElRef}
          className="flex-1 bg-yellow-100 p-4 text-center active:bg-yellow-200"
          onClick={() => handleTabChange(0)}
        >
          Tab 1
        </button>
        <button
          ref={tab2ElRef}
          className="flex-[2] bg-yellow-100 p-4 text-center active:bg-yellow-200"
          onClick={() => handleTabChange(1)}
        >
          Tab 2
        </button>
        <button
          ref={tab3ElRef}
          className="flex-1 bg-yellow-100 p-4 text-center active:bg-yellow-200"
          onClick={() => handleTabChange(2)}
        >
          Tab 3
        </button>
      </div>
      <div
        className="absolute bg-pink-400"
        style={{
          transition,
          width: rect[activeTab]?.width,
          height: 4,
          top: rect[activeTab]?.bottom,
          left: rect[activeTab]?.left,
        }}
      />
    </>
  );
}
