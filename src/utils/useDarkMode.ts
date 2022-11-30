// Custom Hooks in React: The Ultimate UI Abstraction Layer - Tanner Linsley | JSConf Hawaii 2020
// https://youtu.be/J-g9ZJha8FE
import { useEffect, useState } from "react";

const mediaQuery = "(prefers-color-scheme: dark)";

export default function useDarkMode() {
  const [isDark, setIsDark] = useState(
    () => window.matchMedia(mediaQuery).matches
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQuery);
    const listener = (e: MediaQueryListEvent) => {
      setIsDark(e.matches);
    };
    mediaQueryList.addEventListener("change", listener);

    return () => mediaQueryList.removeEventListener("change", listener);
  }, []);

  return [isDark, setIsDark] as [typeof isDark, typeof setIsDark];
}
