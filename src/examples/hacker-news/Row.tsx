import React from "react";
import ChatBubbleIcon from "../../icons/ChatBubbleIcon";
import { classNames } from "../../utils";
import HtmlTag from "../headless-ui/HtmlTag";
import { Story } from "./apis";

type Props = { as: string; rowIndex: number; story: Story };

export default function Row({ as = "li", rowIndex, story }: Props) {
  return (
    <HtmlTag as={as} className="flex flex-col">
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
          )}
        >
          <span className="text-xl">{rowIndex}</span>
          <span className="flex flex-col items-center text-xs">
            <span className="text-[color:#ff6600]">{`▲`}</span>
            <span>{story.score}</span>
          </span>
        </div>
        <div className="flex flex-grow flex-col p-2">
          <span className="flex-grow text-lg">{story.title}</span>
          <span className="mt-2 flex justify-between text-xs">
            <Timestamp timestamp={story.time} />
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
    </HtmlTag>
  );
}

const DATE_NOW = Date.now() / 1000;
const Timestamp = React.memo(_Timestamp);

function _Timestamp({ timestamp }: { timestamp: number }) {
  return (
    <HtmlTag as="span">{`${Math.floor(
      DATE_NOW - timestamp
    )} seconds ago`}</HtmlTag>
  );
}
