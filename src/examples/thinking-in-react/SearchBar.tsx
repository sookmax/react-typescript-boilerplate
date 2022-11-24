import React from "react";
import { classNames } from "../../utils";

type Props = JSX.IntrinsicElements["div"] & {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  toggled: boolean;
  setToggled: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SearchBar({
  className,
  query,
  setQuery,
  toggled,
  setToggled,
}: Props) {
  return (
    <div className={classNames("flex flex-col", className)}>
      <input
        type="search"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="flex items-center">
        <input
          type="checkbox"
          id="toggle-stocked"
          checked={toggled}
          onChange={() => setToggled((s) => !s)}
        ></input>
        <label className="ml-2" htmlFor="toggle-stocked">
          Only show products in stock
        </label>
      </div>
    </div>
  );
}
