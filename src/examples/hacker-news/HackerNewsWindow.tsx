import { useEffect, useRef } from "react";
import ViewportList from "react-viewport-list";
import ArrowPathIcon from "../../icons/ArrowPathIcon";
import ChatBubbleIcon from "../../icons/ChatBubbleIcon";
import { classNames } from "../../utils";
import Row from "./Row";
import Skeleton from "./Skeleton";
import useHNData from "./useHackerNewsAPI";

export default function HackerNews() {
  const { status, stories, errorMessage, getMoreStories, reload } = useHNData({
    storyType: "new",
    initStoryCount: 10,
  });

  const intersectionTargetRef = useRef<HTMLDivElement>(null);
  const onSuccessRef = useRef<(() => void) | undefined>();

  useEffect(() => {
    const intersectionTarget = intersectionTargetRef.current;

    if (!intersectionTarget) return;
    if (status === "initializing") return;

    if (status === "sucess") {
      onSuccessRef.current?.();
      onSuccessRef.current = undefined;
    }

    let callback: IntersectionObserverCallback = () => {};
    if (status === "loading") {
      callback = (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            onSuccessRef.current = () => getMoreStories();
          }
        }
      };
    } else if (status === "sucess") {
      callback = (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            getMoreStories();
          }
        }
      };
    }

    const observer = new IntersectionObserver(callback);

    observer.observe(intersectionTarget);

    return () => observer.unobserve(intersectionTarget);
  }, [getMoreStories, status]);

  return (
    <div className="flex h-full w-full flex-col p-4">
      <header className="mb-4 text-4xl">Hacker News</header>
      {status !== "error" && (
        <>
          <ul className="flex-grow [&>li~li]:border-t [&>li~li]:border-gray-200">
            <ViewportList items={stories}>
              {(story, index) => {
                return story === null ? (
                  <Skeleton key={index} />
                ) : (
                  <Row
                    key={story.id}
                    as="li"
                    rowIndex={index + 1}
                    story={story}
                  />
                );
              }}
            </ViewportList>
          </ul>
          <div ref={intersectionTargetRef} className="h-10 flex-shrink-0"></div>
        </>
      )}
      {status === "error" && (
        <div className="flex flex-grow flex-col items-center justify-center">
          <p className="text-2xl text-red-400">{errorMessage}</p>
          <button
            className={classNames(
              "flex items-center",
              "mt-10 rounded-md px-3 py-2",
              "bg-gray-200 text-gray-500",
              "[&_svg]:hover:rotate-180"
            )}
            onClick={() => reload()}
          >
            <span className="mr-2">Retry</span>
            <span className="h-4 w-4">
              <ArrowPathIcon className="transition-transform duration-200" />
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
