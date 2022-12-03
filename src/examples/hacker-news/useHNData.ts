import React, { useCallback, useEffect, useReducer, useRef } from "react";

const HN_TOP_STORY_IDS = "HN_TOP_STORY_IDS";
const HN_TOP_STORY_ITEMS = "HN_TOP_STORY_ITEMS";
const HN_TOP_STORY_URL =
  "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";
const HN_NEW_STORY_URL =
  "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty";
const GET_HN_STORY_URL_BY_ID = (id: number) =>
  `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`;

type Story = {
  id: number;
  title: string;
  by: string;
  url: string;
  score: number;
  time: number;
  kids: number[] | undefined;
};

type Status = "loading" | "sucess" | "error";

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

type Add_Placeholders = {
  type: "ADD_PLACEHOLDERS";
  payload: number;
};

type Actions =
  | Action_setStatus
  | Action_setStories
  | Action_setErrorMessage
  | Add_Placeholders;

const __DEV_USE_CACHE__ = false;

export default function useHNData({ initStoryCount = 10 }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const storyIdsRef = useRef<number[]>([]);
  const cursorRef = useRef(0);

  if (state.stories.length === 0) {
    dispatch({ type: "ADD_PLACEHOLDERS", payload: initStoryCount });
  }

  useEffect(() => {
    let abort = false;

    dispatch({
      type: "SET_STATUS",
      payload: "loading",
    });

    getTopStoryIds()
      .then((ids) => {
        storyIdsRef.current = ids;
        getStories(ids.slice(cursorRef.current, initStoryCount)).then(
          (stories) => {
            if (!abort) {
              const totalCount = stories.length;
              let resolvedCount = 0;

              stories.forEach(async (story, idx) => {
                const resolvedStory = await story;

                dispatch({
                  type: "SET_STORY_AT",
                  payload: {
                    index: cursorRef.current + idx,
                    story: resolvedStory,
                  },
                });

                resolvedCount++;

                if (resolvedCount === totalCount) {
                  dispatch({ type: "SET_STATUS", payload: "sucess" });
                  cursorRef.current = initStoryCount;
                }
              });
            }
          }
        );
      })
      .catch((error) => {
        let message = "Unknown error.";
        if (error instanceof Error) {
          message = error.message;
        } else if (typeof error === "string") {
          message = error;
        }
        dispatch({ type: "SET_STATUS", payload: "error" });
        dispatch({ type: "SET_ERROR_MESSAGE", payload: message });
      });

    return () => {
      abort = true;
    };
  }, [initStoryCount]);

  const getMoreStories = useCallback(async (count = 10) => {
    dispatch({ type: "ADD_PLACEHOLDERS", payload: count });
    dispatch({ type: "SET_STATUS", payload: "loading" });

    const nextIds = storyIdsRef.current.slice(
      cursorRef.current,
      cursorRef.current + count
    );

    getStories(nextIds).then((stories) => {
      const totalCount = stories.length;
      let resolvedCount = 0;

      stories.forEach(async (story, idx) => {
        const resolvedStory = await story;

        console.log(cursorRef.current + idx);

        dispatch({
          type: "SET_STORY_AT",
          payload: {
            index: cursorRef.current + idx,
            story: resolvedStory,
          },
        });

        resolvedCount++;

        if (resolvedCount === totalCount) {
          dispatch({ type: "SET_STATUS", payload: "sucess" });
          cursorRef.current += count;
        }
      });
    });
  }, []);

  return { ...state, getMoreStories };
}

const initialState: State = {
  status: "loading",
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
      return {
        ...state,
        status: action.payload,
      };
    case "SET_ERROR_MESSAGE":
      return {
        ...state,
        errorMessage: action.payload,
      };
    default:
      throw `no handler for action: ${JSON.stringify(action)} was found.`;
  }
};

async function getTopStoryIds() {
  if (__DEV_USE_CACHE__) {
    const cachedIds = window.localStorage.getItem(HN_TOP_STORY_IDS);
    if (cachedIds) {
      return JSON.parse(cachedIds) as number[];
    }
  }

  const ids = await fetch(HN_NEW_STORY_URL).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error, status = ${res.status}`);
    }
    return res.json() as Promise<number[]>;
  });

  if (__DEV_USE_CACHE__) {
    window.localStorage.setItem(HN_TOP_STORY_IDS, JSON.stringify(ids));
  }

  return ids as number[];
}

async function getStories(ids: number[]) {
  if (__DEV_USE_CACHE__) {
    const cachedData = window.localStorage.getItem(HN_TOP_STORY_ITEMS);
    if (cachedData) {
      return JSON.parse(cachedData) as Promise<Story[]>;
    }
  }

  const stories = ids.map((id) =>
    fetch(GET_HN_STORY_URL_BY_ID(id)).then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error, status = ${res.status}`);
      }
      return res.json() as Promise<Story>;
    })
  );

  if (__DEV_USE_CACHE__) {
    window.localStorage.setItem(
      HN_TOP_STORY_ITEMS,
      JSON.stringify(await Promise.all(stories))
    );
  }

  return stories;
}
