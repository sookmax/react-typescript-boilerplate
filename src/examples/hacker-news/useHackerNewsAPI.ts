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
  stories: (Story | null)[];
  status: Status;
  errorMessage: string;
};

type Action_setStatus = {
  type: "SET_STATUS";
  payload: Status;
};

type Action_setStories = {
  type: "SET_STORY_AT";
  payload: {
    index: number;
    story: Story;
  };
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
  | Action_setStories
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
        stories: [...state.stories, ...new Array(action.payload).fill(null)],
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

  if (state.stories.length === 0) {
    dispatch({ type: "ADD_PLACEHOLDERS", payload: initStoryCount });
  }

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
      try {
        const nextIds = storyIdsRef.current.slice(
          cursorRef.current,
          cursorRef.current + count
        );

        if (nextIds.length > 0) {
          dispatch({ type: "SET_STATUS", payload: "loading" });
          dispatch({ type: "ADD_PLACEHOLDERS", payload: nextIds.length });

          fetchStories(storyType, nextIds)
            .then(async (unresolvedStories) => {
              const totalCount = unresolvedStories.length;
              let resolvedCount = 0;
              for (const [
                index,
                unresolvedStory,
              ] of unresolvedStories.entries()) {
                const resolvedStory = await unresolvedStory;

                dispatch({
                  type: "SET_STORY_AT",
                  payload: {
                    index: cursorRef.current + index,
                    story: resolvedStory,
                  },
                });

                resolvedCount++;

                if (resolvedCount === totalCount) {
                  dispatch({ type: "SET_STATUS", payload: "sucess" });
                  cursorRef.current += nextIds.length;
                }
              }
            })
            .catch((e) => errorHandler(e));
        }
      } catch (error) {
        errorHandler(error);
      }
    },
    [errorHandler, storyType]
  );

  useEffect(() => {
    let abort = false;

    async function getInitialStories() {
      try {
        dispatch({
          type: "SET_STATUS",
          payload: "loading",
        });

        const ids = await fetchStoryIds(storyType);
        storyIdsRef.current = ids;

        const initialIds = ids.slice(cursorRef.current, initStoryCount);

        fetchStories(storyType, initialIds).then(async (unresolvedStories) => {
          const totalCount = unresolvedStories.length;
          let resolvedCount = 0;
          for (const [index, unresolvedStory] of unresolvedStories.entries()) {
            const resolvedStory = await unresolvedStory;

            if (abort) break;

            dispatch({
              type: "SET_STORY_AT",
              payload: {
                index: cursorRef.current + index,
                story: resolvedStory,
              },
            });

            resolvedCount++;

            if (resolvedCount === totalCount) {
              dispatch({ type: "SET_STATUS", payload: "sucess" });
              cursorRef.current += initialIds.length;
            }
          }
        });
      } catch (error) {
        errorHandler(error);
      }
    }

    getInitialStories();

    return () => {
      abort = true;
      dispatch({ type: "RESET_STATE" });
    };
  }, [initStoryCount, storyType, errorHandler, reset]);

  const reload = useCallback(() => {
    toggleReset((s) => !s);
  }, []);

  return { ...state, getMoreStories, reload };
}
