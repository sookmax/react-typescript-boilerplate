import React, { useMemo } from "react";
import type data from "./data.json";

type Row = { price: string; stocked: boolean; name: string };

type Data = {
  [index: string]: Row[];
};

function getProcessedData(source: typeof data) {
  const categories = new Set(source.map((item) => item.category));

  const returnValue: Data = {};
  for (const category of categories) {
    returnValue[category] = source.filter((item) => item.category === category);
  }
  return returnValue;
}

type Props = Omit<JSX.IntrinsicElements["div"], "children"> & {
  filteredData: typeof data;
  children: (category: string, items: Row[]) => React.ReactNode;
};

export default function ProductTable({
  filteredData,
  children,
  ...rest
}: Props) {
  const processedData = useMemo(
    () => getProcessedData(filteredData),
    [filteredData]
  );

  return (
    <div {...rest}>
      <div className="space-x-1">
        <span>Name</span>
        <span>Price</span>
      </div>
      {Object.entries(processedData).map(([category, items]) => {
        return children(category, items);
      })}
    </div>
  );
}
