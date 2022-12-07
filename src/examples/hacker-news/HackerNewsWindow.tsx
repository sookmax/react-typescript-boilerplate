import { useEffect, useMemo, useRef, useState } from "react";
import ViewportList from "react-viewport-list";
import ArrowPathIcon from "../../icons/ArrowPathIcon";
import ChevronUpIcon from "../../icons/ChevronUpIcon";
import { classNames } from "../../utils";
import { Story } from "./apis";
import Row from "./Row";
import Skeleton from "./Skeleton";
import useHackerNewsAPI from "./useHackerNewsAPI";

export default function HackerNews() {
  const { status, stories, errorMessage, getMoreStories, reload } =
    useHackerNewsAPI({
      storyType: "new",
      initStoryCount: 10,
    });

  const loadMoreTargetRef = useRef<HTMLDivElement>(null);
  const topButtonTriggerTargetRef = useRef<HTMLDivElement>(null);

  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const loadMoreTarget = loadMoreTargetRef.current;
    if (!loadMoreTarget) return;
    if (status !== "sucess") return;

    const callback: IntersectionObserverCallback = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          getMoreStories();
        }
      }
    };

    const observer = new IntersectionObserver(callback, { threshold: 0 });
    observer.observe(loadMoreTarget);

    return () => observer.unobserve(loadMoreTarget);
  }, [getMoreStories, status]);

  useEffect(() => {
    const topButtonTriggerTarget = topButtonTriggerTargetRef.current;
    if (!topButtonTriggerTarget) return;

    let requestId: number;

    const callback = () => {
      const { top } = topButtonTriggerTarget.getBoundingClientRect();

      if (top < 0) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }

      requestId = requestAnimationFrame(callback);
    };

    requestId = requestAnimationFrame(callback);

    return () => cancelAnimationFrame(requestId);
  }, []);

  const filteredStories = useMemo(
    () => stories.filter((story) => story !== "failed"),
    [stories]
  ) as (Story | "loading")[];

  return (
    <div className="flex h-full w-full flex-col">
      <header className="p-4 text-4xl">Hacker News</header>
      {status !== "error" && (
        <div className="flex-grow" ref={topButtonTriggerTargetRef}>
          <ul className="[&>li~li]:border-t [&>li~li]:border-gray-200">
            {/* {filteredStories.map((story, index) => {
              return story === "loading" ? (
                <Skeleton key={index} />
              ) : (
                <Row
                  key={story.id}
                  as="li"
                  rowIndex={index + 1}
                  story={story}
                />
              );
            })}  */}
            <ViewportList items={filteredStories}>
              {(story, index) => {
                return story === "loading" ? (
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
          <div ref={loadMoreTargetRef} className="h-10 flex-shrink-0"></div>
        </div>
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
      <button
        className={classNames(
          "fixed bottom-8 right-8",
          "h-14 w-14",
          "p-4",
          "rounded-full bg-gray-300",
          "transition-transform duration-300",
          showTopButton ? "scale-100" : "scale-0"
        )}
        onClick={() => {
          window.scrollTo({ top: 0 });
        }}
      >
        <ChevronUpIcon />
      </button>
    </div>
  );
}
