import React from "react";
import ChatBubbleIcon from "../../icons/ChatBubbleIcon";
import { classNames } from "../../utils";
import HtmlTag from "../headless-ui/HtmlTag";
import { Story } from "./apis";

type Props = { as: string; rowIndex: number; story: Story };

export default function Row({ as = "li", rowIndex, story }: Props) {
  return (
    <HtmlTag as={as} className="flex flex-col" onClick={() => {}}>
      <div
        className={classNames(
          "flex-grow",
          "flex",
          "px-2 py-4",
          "hover:bg-[#f6f6ef]",
          "transition-colors duration-200"
        )}
      >
        <div
          className={classNames(
            "w-10 flex-shrink-0",
            "flex flex-col items-center justify-center",
            "space-y-2"
          )}
        >
          <span className="">{`${rowIndex}.`}</span>
          <span className="flex items-center space-x-1 text-xs">
            <span className="text-[color:#ff6600]">{`▲`}</span>
            <span className="text-gray-400">{story.score}</span>
          </span>
        </div>
        <div className="flex flex-grow flex-col px-2">
          <a
            className="flex-grow text-lg"
            href={story.url}
            target="_blank"
            rel="noreferrer"
          >
            {story.title}
          </a>
          <span className="mt-4 flex justify-between text-xs text-gray-400">
            <Timestamp timestamp={story.time} />
            <span className="flex flex-grow items-center justify-end">
              <span>{`by ${story.by}`}</span>
              {story.kids && (
                <span className="flex items-center justify-center">
                  <span className="mx-1">•</span>
                  <button
                    className={classNames(
                      "inline-flex items-center justify-center",
                      "transition-colors duration-200 hover:text-[#ff6600]"
                    )}
                  >
                    <span className="mr-1 w-5">
                      <ChatBubbleIcon />
                    </span>
                    <span className="text-xs">{story.kids.length}</span>
                  </button>
                </span>
              )}
            </span>
          </span>
        </div>
      </div>
    </HtmlTag>
  );
}

const DATE_NOW = Date.now() / 1000;
const Timestamp = React.memo(_Timestamp);

function _Timestamp({ timestamp }: { timestamp: number }) {
  return <HtmlTag as="span">{timeAgo(DATE_NOW - timestamp)}</HtmlTag>;
}

const A_MINUTE_IN_SECONDS = 60;
const AN_HOUR_IN_SECONDS = A_MINUTE_IN_SECONDS * 60;
const A_DAY_IN_SECONDS = AN_HOUR_IN_SECONDS * 24;
const A_MONTH_IN_SECONDS = A_DAY_IN_SECONDS * 30;
const A_YEAR_IN_SECONDS = A_MONTH_IN_SECONDS * 12;

export function timeAgo(diffInSeconds: number) {
  if (diffInSeconds < A_MINUTE_IN_SECONDS) {
    return "less than a minute ago";
  } else if (
    diffInSeconds >= A_MINUTE_IN_SECONDS &&
    diffInSeconds < AN_HOUR_IN_SECONDS
  ) {
    const minutes = Math.floor(diffInSeconds / A_MINUTE_IN_SECONDS);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (
    diffInSeconds >= AN_HOUR_IN_SECONDS &&
    diffInSeconds < A_DAY_IN_SECONDS
  ) {
    const hours = Math.floor(diffInSeconds / AN_HOUR_IN_SECONDS);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (
    diffInSeconds >= A_DAY_IN_SECONDS &&
    diffInSeconds < A_MONTH_IN_SECONDS
  ) {
    const days = Math.floor(diffInSeconds / A_DAY_IN_SECONDS);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (
    diffInSeconds >= A_MONTH_IN_SECONDS &&
    diffInSeconds < A_YEAR_IN_SECONDS
  ) {
    const months = Math.floor(diffInSeconds / A_MONTH_IN_SECONDS);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else {
    const years = Math.floor(diffInSeconds / A_YEAR_IN_SECONDS);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }
}
