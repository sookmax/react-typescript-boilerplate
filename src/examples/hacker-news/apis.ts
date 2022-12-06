const __DEV_USE_CACHE__ = false;

const GET_HN_STORY_URL_BY_ID = (id: number) =>
  `https://hacker-news.firebaseio.com/v0/item/${id}.json`;

const STORY_APIS = {
  new: {
    url: "https://hacker-news.firebaseio.com/v0/newstories.json",
    devCacheKeys: {
      id: "HN_NEW_STORY_IDS",
      story: "HN_NEW_STORIES",
    },
  },
  top: {
    url: "https://hacker-news.firebaseio.com/v0/topstories.json",
    devCacheKeys: {
      id: "HN_TOP_STORY_IDS",
      story: "HN_TOP_STORIES",
    },
  },
  best: {
    url: "https://hacker-news.firebaseio.com/v0/beststories.json",
    devCacheKeys: {
      id: "HN_BEST_STORY_IDS",
      story: "HN_BEST_STORIES",
    },
  },
};

export type StoryType = keyof typeof STORY_APIS;

export type Story = {
  id: number;
  title: string;
  by: string;
  url: string;
  score: number;
  time: number;
  kids: number[] | undefined;
};

export async function fetchStoryIds(storyType: StoryType) {
  if (__DEV_USE_CACHE__) {
    const cachedIds = window.localStorage.getItem(
      STORY_APIS[storyType].devCacheKeys.id
    );
    if (cachedIds) {
      return JSON.parse(cachedIds) as number[];
    }
  }

  const ids = await fetch(STORY_APIS[storyType].url).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error, status = ${res.status}`);
    }
    return res.json() as Promise<number[]>;
  });

  if (__DEV_USE_CACHE__) {
    window.localStorage.setItem(
      STORY_APIS[storyType].devCacheKeys.id,
      JSON.stringify(ids)
    );
  }

  return ids;
}

export async function fetchStories(storyType: StoryType, ids: number[]) {
  if (__DEV_USE_CACHE__) {
    const cachedData = window.localStorage.getItem(
      STORY_APIS[storyType].devCacheKeys.story
    );
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
      STORY_APIS[storyType].devCacheKeys.story,
      JSON.stringify(await Promise.all(stories))
    );
  }

  return stories;
}
