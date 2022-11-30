import { useEffect } from "react";
import { classNames } from "../utils";
import useDarkMode from "../utils/useDarkMode";
import Switch from "./headless-ui/Switch";

export default function DarkMode() {
  const [isDark, setIsDark] = useDarkMode();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    return () => console.log("destroy called");
  }, [isDark]);

  return (
    <div
      className={classNames(
        "flex h-full w-full flex-col items-center justify-center",
        "bg-slate-200 dark:bg-slate-700",
        "transition-colors duration-300"
      )}
    >
      <p className="mb-4 text-5xl text-black dark:text-white">
        {isDark ? "dark 🌜" : "light 🌞"}
      </p>
      <Switch value={isDark} onClick={() => setIsDark((isDark) => !isDark)} />
    </div>
  );
}
