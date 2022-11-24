import ProductTable from "./ProductTable";
import SearchBar from "./SearchBar";
import { classNames } from "../../utils";
import ProductCategoryRow from "./ProductCategoryRow";
import ProductRow from "./ProductRow";
import React, { useCallback, useState } from "react";
import data from "./data.json";

export default function FilterableProductTable() {
  const [query, setQuery] = useState("");
  const [showStocked, setShowStocked] = useState(false);

  const filteredData = data
    .filter(
      (item) =>
        !query || item.name.toLowerCase().startsWith(query.toLowerCase())
    )
    .filter((item) => !showStocked || item.stocked);

  return (
    <div className="m-2 space-y-1 border-2 border-fuchsia-300 p-2">
      <SearchBar
        className={classNames("border-2 border-amber-200")}
        query={query}
        setQuery={setQuery}
        toggled={showStocked}
        setToggled={setShowStocked}
      />
      <ProductTable
        className="space-y-2 border-2 border-lime-300 p-2"
        filteredData={filteredData}
      >
        {useCallback(
          (category, items) => (
            <React.Fragment key={category}>
              <ProductCategoryRow className="border-2 border-orange-400">
                {category}
              </ProductCategoryRow>
              {items.map((item) => (
                <ProductRow
                  key={item.name}
                  className={classNames("border-2 border-fuchsia-500", "flex")}
                >
                  <span
                    className={classNames(
                      "border-2 border-teal-500",
                      "flex-1",
                      "pl-2"
                    )}
                  >
                    {item.name}
                  </span>
                  <span
                    className={classNames(
                      "border-2 border-teal-500",
                      "flex-1",
                      "pl-2"
                    )}
                  >
                    {item.price}
                  </span>
                </ProductRow>
              ))}
            </React.Fragment>
          ),
          []
        )}
      </ProductTable>
    </div>
  );
}
