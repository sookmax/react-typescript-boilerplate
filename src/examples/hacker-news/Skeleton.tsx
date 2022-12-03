import { classNames } from "../../utils";

export default function Skeleton() {
  return (
    <div className="py-4 px-2">
      <div
        className={classNames(
          "relative",
          "rounded-md",
          "flex h-[130px] flex-col space-y-2",
          "before:absolute before:inset-0",
          "before:-translate-x-full",
          "before:bg-gradient-to-r before:from-transparent before:via-gray-600/10 before:to-transparent",
          "before:animate-[wave_2s_infinite]",
          // https://delba.dev/blog/animated-loading-skeletons-with-tailwind
          // You can fix Safari overflowing the animation on rounded corners with isolate.
          "isolate",
          "overflow-hidden"
        )}
      >
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
              <span className={classNames("flex-1 rounded-md", "bg-gray-100")}>
                <span className="hidden">time</span>
              </span>
              <span className={classNames("flex-1 rounded-md", "bg-gray-100")}>
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
  );
}
