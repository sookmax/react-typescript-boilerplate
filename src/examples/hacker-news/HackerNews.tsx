import ChatBubbleIcon from "../../icons/ChatBubbleIcon";
import { classNames } from "../../utils";
import Skeleton from "./Skeleton";
import useHNData from "./useHackerNewsAPI";

export default function HackerNews() {
  const { status, stories, errorMessage, getMoreStories } = useHNData({
    initStoryCount: 10,
  });

  //

  return (
    <div className="p-4">
      <header className="mb-4 text-4xl">Hacker News</header>
      {stories.length > 0 && (
        <>
          <ul className="divide-y">
            {stories.map((story, idx) =>
              story === null ? (
                <Skeleton key={idx} />
              ) : (
                <li key={story.id} className="flex flex-col">
                  <a
                    href={story.url}
                    target="_blank"
                    rel="noreferrer"
                    className={classNames(
                      "flex-grow",
                      "flex",
                      "p-2",
                      "hover:bg-[#f6f6ef]",
                      "transition-colors duration-200"
                    )}
                  >
                    <div
                      className={classNames(
                        "w-12 flex-shrink-0",
                        "flex flex-col items-center justify-center",
                        "p-2"
                        //   getBgColor(idx)
                      )}
                    >
                      <span className="text-xl">{idx + 1}</span>
                      <span className="flex flex-col items-center text-xs">
                        <span className="text-[color:#ff6600]">{`▲`}</span>
                        <span>{story.score}</span>
                      </span>
                    </div>
                    <div className="flex flex-grow flex-col p-2">
                      <span className="flex-grow text-lg">{story.title}</span>
                      <span className="mt-2 flex justify-between text-xs">
                        <span>{`${Math.floor(
                          Date.now() / 1000 - story.time
                        )} seconds ago`}</span>
                        <span>{`by ${story.by}`}</span>
                      </span>
                    </div>
                  </a>
                  {story.kids && (
                    <button
                      className={classNames(
                        "flex items-center justify-center p-2",
                        "transition-colors duration-200 hover:text-[#ff6600]"
                      )}
                    >
                      <span className="mr-1 w-5">
                        <ChatBubbleIcon />
                      </span>
                      <span className="text-xs">{story.kids.length}</span>
                    </button>
                  )}
                </li>
              )
            )}
          </ul>
          {status === "sucess" && (
            <button onClick={() => getMoreStories()}>load more</button>
          )}
        </>
      )}
      {status === "loading" && <div>loading...</div>}
      {status === "error" && <div>{errorMessage}</div>}
    </div>
  );
}
