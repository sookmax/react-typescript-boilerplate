import React, { useCallback, useMemo, useState } from "react";

type SelectContextValue = {
  addOptionElement: (element: HTMLOptionElement) => void;
  removeOptionElement: (element: HTMLOptionElement) => void;
};

export const SelectContext = React.createContext<SelectContextValue | null>(
  null
);

type Props = {
  onChange?: (value: string) => void;
  children: React.ReactNode;
} & Omit<JSX.IntrinsicElements["select"], "value" | "onChange" | "children">;

export default function Select({ children, onChange, ...rest }: Props) {
  const [optionElements, setOptionElements] = useState<HTMLOptionElement[]>([]);
  const [value, setValue] = useState<string | undefined>(undefined);

  if (
    optionElements.length === React.Children.count(children) &&
    value === undefined
  ) {
    /**
     * `HTMLOptionElement.value `
     * A string that reflects the value of the value HTML attribute, if it exists;
     * otherwise reflects value of the Node.textContent property.
     */
    setValue(optionElements[0].value);
    onChange?.(optionElements[0].value);
  }

  const addOptionElement = useCallback((element: HTMLOptionElement) => {
    setOptionElements((elements) => {
      const newElements = [...elements, element];
      sortElements(newElements);
      return newElements;
    });
  }, []);

  const removeOptionElement = useCallback((element: HTMLOptionElement) => {
    setOptionElements((elements) => {
      const newElements = elements.filter((el) => el !== element);
      sortElements(newElements);
      return newElements;
    });
  }, []);

  const _onChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setValue(e.target.value);
      onChange?.(e.target.value);
    },
    [onChange]
  );

  const contextValue = useMemo(
    () => ({
      addOptionElement,
      removeOptionElement,
    }),
    [addOptionElement, removeOptionElement]
  );

  return (
    <select value={value} onChange={_onChange} {...rest}>
      <SelectContext.Provider value={contextValue}>
        {children}
      </SelectContext.Provider>
    </select>
  );
}

function sortElements(elements: HTMLElement[]) {
  elements.sort((elementA, elementB) => {
    const elementB_position = elementA.compareDocumentPosition(elementB);
    switch (elementB_position) {
      case Node.DOCUMENT_POSITION_FOLLOWING:
        // elementA comes first
        return -1;
      case Node.DOCUMENT_POSITION_PRECEDING:
        // elementB comes first
        return 1;
      default:
        throw "Cannot determine the order of elements.";
    }
  });
}
