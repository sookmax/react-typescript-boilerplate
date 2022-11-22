import { useEffect, useRef, useState } from "react";
import ChevronDownIcon from "../icons/ChevronDownIcon";
import ChevronLeftIcon from "../icons/ChevronLeftIcon";
import ChevronRightIcon from "../icons/ChevronRightIcon";
import ChevronUpIcon from "../icons/ChevronUpIcon";
import { classNames } from "../utils";
import { obeserveRect } from "../utils/observeRect";

const templateColumnsDefault = "grid-cols-[1fr_5fr_1fr]";
const autoRowDefault = "auto-rows-[1fr_5fr_1fr]";

let row1Factor = 1;
const row2Factor = 5;
let row3Factor = 1;

let col1Factor = 1;
const col2Factor = 5;
let col3Factor = 1;

let loopRAF = true;

export default function Example() {
  const [rect, setRect] = useState<DOMRect>();
  const gridElRef = useRef<HTMLDivElement>(null);
  const measuredElRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!measuredElRef.current) return;
    const observer = obeserveRect(measuredElRef.current, (rect) => {
      setRect(rect);
    });

    observer.observe();

    return () => observer.unObserve();
  }, []);

  return (
    <div
      ref={gridElRef}
      className={classNames(
        "grid w-full h-full",
        templateColumnsDefault,
        autoRowDefault
      )}
      onPointerUp={() => {
        loopRAF = false;
      }}
    >
      <div className="bg-slate-300"></div>
      <div className="bg-emerald-400 flex flex-col justify-center items-center space-y-2">
        <button
          className="w-6 h-6 active:bg-emerald-500"
          onPointerDown={() => {
            loopRAF = true;
            gridElRef.current && onPointerDown(gridElRef.current, "row1-dec");
          }}
        >
          <ChevronUpIcon />
        </button>
        <button
          className="w-6 h-6 active:bg-emerald-500"
          onPointerDown={() => {
            loopRAF = true;
            gridElRef.current && onPointerDown(gridElRef.current, "row1-inc");
          }}
        >
          <ChevronDownIcon />
        </button>
      </div>
      <div className="bg-slate-300"></div>
      <div className="bg-yellow-300 flex justify-center items-center space-x-2">
        <button
          className="w-6 h-6 active:bg-yellow-400"
          onPointerDown={() => {
            loopRAF = true;
            gridElRef.current && onPointerDown(gridElRef.current, "col1-dec");
          }}
        >
          <ChevronLeftIcon />
        </button>
        <button
          className="w-6 h-6 active:bg-yellow-400"
          onPointerDown={() => {
            loopRAF = true;
            gridElRef.current && onPointerDown(gridElRef.current, "col1-inc");
          }}
        >
          <ChevronRightIcon />
        </button>
      </div>
      <div ref={measuredElRef} className="bg-sky-300 flex-grow p-4">
        <div className="text-lg font-bold mb-2">I&apos;m being measured</div>
        <div>My width: {rect?.width}</div>
        <div>My height: {rect?.height}</div>
        <div>My top: {rect?.top}</div>
        <div>My bottom: {rect?.bottom}</div>
        <div>My left: {rect?.left}</div>
        <div>My right: {rect?.right}</div>
      </div>
      <div className="bg-yellow-300 flex justify-center items-center space-x-2">
        <button
          className="w-6 h-6 active:bg-yellow-400"
          onPointerDown={() => {
            loopRAF = true;
            gridElRef.current && onPointerDown(gridElRef.current, "col3-inc");
          }}
        >
          <ChevronLeftIcon />
        </button>
        <button
          className="w-6 h-6 active:bg-yellow-400"
          onPointerDown={() => {
            loopRAF = true;
            gridElRef.current && onPointerDown(gridElRef.current, "col3-dec");
          }}
        >
          <ChevronRightIcon />
        </button>
      </div>
      <div className="bg-slate-300"></div>
      <div className="bg-emerald-400 flex flex-col justify-center items-center space-y-2">
        <button
          className="w-6 h-6 active:bg-emerald-500"
          onPointerDown={() => {
            loopRAF = true;
            gridElRef.current && onPointerDown(gridElRef.current, "row3-inc");
          }}
        >
          <ChevronUpIcon />
        </button>
        <button
          className="w-6 h-6 active:bg-emerald-500"
          onPointerDown={() => {
            loopRAF = true;
            gridElRef.current && onPointerDown(gridElRef.current, "row3-dec");
          }}
        >
          <ChevronDownIcon />
        </button>
      </div>
      <div className="bg-slate-300"></div>
    </div>
  );
}

function onPointerDown(
  gridEl: HTMLDivElement,
  action:
    | "row1-inc"
    | "row1-dec"
    | "row3-inc"
    | "row3-dec"
    | "col1-inc"
    | "col1-dec"
    | "col3-inc"
    | "col3-dec"
) {
  switch (action) {
    case "row1-inc":
      gridEl.style.gridAutoRows = `${(row1Factor = Math.min(
        1.01 * row1Factor,
        9
      ))}fr ${row2Factor}fr ${row3Factor}fr`;
      break;
    case "row1-dec":
      gridEl.style.gridAutoRows = `${(row1Factor = Math.max(
        0.99 * row1Factor,
        0.6
      ))}fr ${row2Factor}fr ${row3Factor}fr`;
      break;
    case "row3-inc":
      gridEl.style.gridAutoRows = `${row1Factor}fr ${row2Factor}fr ${(row3Factor =
        Math.min(1.01 * row3Factor, 9))}fr`;
      break;
    case "row3-dec":
      gridEl.style.gridAutoRows = `${row1Factor}fr ${row2Factor}fr ${(row3Factor =
        Math.max(0.99 * row3Factor, 0.6))}fr`;
      break;
    case "col1-inc":
      gridEl.style.gridTemplateColumns = `${(col1Factor = Math.min(
        1.01 * col1Factor,
        9
      ))}fr ${col2Factor}fr ${col3Factor}fr`;
      break;
    case "col1-dec":
      gridEl.style.gridTemplateColumns = `${(col1Factor = Math.max(
        0.99 * col1Factor,
        0.8
      ))}fr ${col2Factor}fr ${col3Factor}fr`;
      break;
    case "col3-inc":
      gridEl.style.gridTemplateColumns = `${col1Factor}fr ${col2Factor}fr ${(col3Factor =
        Math.min(1.01 * col3Factor, 9))}fr`;
      break;
    case "col3-dec":
      gridEl.style.gridTemplateColumns = `${col1Factor}fr ${col2Factor}fr ${(col3Factor =
        Math.max(0.99 * col3Factor, 0.8))}fr`;
      break;
  }

  if (loopRAF) {
    requestAnimationFrame(() => onPointerDown(gridEl, action));
  }
}
