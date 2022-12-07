import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { Story, fetchStoryIds, fetchStories, StoryType } from "./apis";

type Status = "initializing" | "loading" | "sucess" | "error";

type State = {
  stories: (Story | "loading" | "failed")[];
  status: Status;
  errorMessage: string;
};

type Action_setStatus = {
  type: "SET_STATUS";
  payload: Status;
};

type Action_setStoryAt = {
  type: "SET_STORY_AT";
  payload: {
    index: number;
    story: Story | "failed";
  };
};

type Action_removeStoryAt = {
  type: "REMOVE_STORY_AT";
  payload: number | number[];
};

type Action_setErrorMessage = {
  type: "SET_ERROR_MESSAGE";
  payload: string;
};

type Action_addPlaceholders = {
  type: "ADD_PLACEHOLDERS";
  payload: number;
};

type Action_resetState = {
  type: "RESET_STATE";
};

type Actions =
  | Action_setStatus
  | Action_setStoryAt
  | Action_removeStoryAt
  | Action_setErrorMessage
  | Action_addPlaceholders
  | Action_resetState;

const initialState: State = {
  status: "initializing",
  stories: [],
  errorMessage: "",
};

const reducer: React.Reducer<State, Actions> = (state, action) => {
  switch (action.type) {
    case "ADD_PLACEHOLDERS":
      return {
        ...state,
        stories: [
          ...state.stories,
          ...new Array(action.payload).fill("loading"),
        ],
      };
    case "SET_STORY_AT":
      return {
        ...state,
        stories: [
          ...state.stories.slice(0, action.payload.index),
          action.payload.story,
          ...state.stories.slice(action.payload.index + 1),
        ],
      };
    case "REMOVE_STORY_AT":
      if (typeof action.payload === "number") {
        return {
          ...state,
          stories: [...state.stories].splice(action.payload, 1),
        };
      } else {
        return {
          ...state,
          stories: state.stories.filter(
            (_, idx) => !(action.payload as number[]).includes(idx)
          ),
        };
      }

    case "SET_STATUS":
      if (state.status === action.payload) {
        return state;
      } else {
        return {
          ...state,
          status: action.payload,
        };
      }
    case "SET_ERROR_MESSAGE":
      return {
        ...state,
        errorMessage: action.payload,
      };
    case "RESET_STATE":
      return { ...initialState };
    default:
      throw `no handler for action: ${JSON.stringify(action)} was found.`;
  }
};

type Params = {
  storyType?: StoryType;
  initStoryCount?: number;
};

export default function useHackerNewsAPI({
  storyType = "new",
  initStoryCount = 10,
}: Params) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [reset, toggleReset] = useState(false);
  const storyIdsRef = useRef<number[]>([]);
  const cursorRef = useRef(0);

  const errorHandler = useCallback((error: any) => {
    let message = "Unknown error.";
    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === "string") {
      message = error;
    }
    dispatch({ type: "SET_STATUS", payload: "error" });
    dispatch({ type: "SET_ERROR_MESSAGE", payload: message });
  }, []);

  const getMoreStories = useCallback(
    (count = 10) => {
      const nextIds = storyIdsRef.current.slice(
        cursorRef.current,
        cursorRef.current + count
      );

      if (nextIds.length > 0) {
        dispatch({ type: "SET_STATUS", payload: "loading" });
        dispatch({ type: "ADD_PLACEHOLDERS", payload: nextIds.length });

        fetchStories(storyType, nextIds)
          .then((unresolvedStories) => {
            const totalCount = unresolvedStories.length;
            let resolvedCount = 0;

            unresolvedStories.forEach((unresolvedStory, index) => {
              unresolvedStory.then((resolvedStory) => {
                resolvedCount++;

                dispatch({
                  type: "SET_STORY_AT",
                  payload: {
                    index: cursorRef.current + index,
                    story: resolvedStory ? resolvedStory : "failed",
                  },
                });

                if (resolvedCount === totalCount) {
                  cursorRef.current += nextIds.length;
                  dispatch({ type: "SET_STATUS", payload: "sucess" });
                }
              });
            });
          })
          .catch((e) => errorHandler(e));
      }
    },
    [errorHandler, storyType]
  );

  useEffect(() => {
    let abort = false;

    fetchStoryIds(storyType).then((ids) => {
      if (abort) return;
      storyIdsRef.current = ids;
      getMoreStories(initStoryCount);
    });

    return () => {
      dispatch({ type: "RESET_STATE" });
      storyIdsRef.current = [];
      cursorRef.current = 0;
      abort = true;
    };
  }, [storyType, initStoryCount, getMoreStories, reset]);

  const reload = useCallback(() => {
    toggleReset((s) => !s);
  }, []);

  return { ...state, getMoreStories, reload };
}
