import { classNames } from "../../utils";

type Props = { height?: number } & JSX.IntrinsicElements["div"];

export default function Skeleton({ className, height = 110, ...rest }: Props) {
  return (
    <div className={classNames("py-4 px-2", className)} {...rest}>
      <div
        className={classNames(
          "relative",
          "rounded-md",
          // https://delba.dev/blog/animated-loading-skeletons-with-tailwind
          // You can fix Safari overflowing the animation on rounded corners with isolate.
          "isolate",
          // or just create another stacking context to fix the above problem.
          //   "z-10",
          "overflow-hidden"
        )}
      >
        <div
          className={classNames(
            "absolute inset-0",
            "-translate-x-full",
            "animate-[wave_2s_infinite]",
            "border-t border-gray-300/40"
          )}
          style={{
            background:
              "linear-gradient(to right, transparent, 35%, rgb(75 85 99 / 0.1), 65%, transparent)",
          }}
        ></div>
        <div className="flex flex-col space-y-2" style={{ height }}>
          <div className="flex flex-grow space-x-2">
            <div
              className={classNames(
                "w-12 flex-shrink-0 rounded-md",
                "bg-gray-100"
              )}
            >
              <div className="hidden">index</div>
            </div>
            <div className="flex flex-grow flex-col space-y-2">
              <div className={classNames("flex-[2] rounded-md", "bg-gray-100")}>
                <div className="hidden">title</div>
              </div>
              <div className="flex flex-[1] space-x-2">
                <span
                  className={classNames("flex-1 rounded-md", "bg-gray-100")}
                >
                  <span className="hidden">time</span>
                </span>
                <span
                  className={classNames("flex-1 rounded-md", "bg-gray-100")}
                >
                  <span className="hidden">author</span>
                </span>
              </div>
            </div>
          </div>
          <div
            className={classNames(
              "flex items-center justify-center rounded-md",
              "bg-gray-100",
              "h-5"
            )}
          >
            <span className="hidden">button</span>
          </div>
        </div>
      </div>
    </div>
  );
}
