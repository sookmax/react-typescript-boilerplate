import { useCallback, useRef } from "react";
import { useSelectContext } from "./Select";

type Props = Omit<JSX.IntrinsicElements["option"], "ref">;

export default function Option(props: Props) {
  const contextValue = useSelectContext();
  if (!contextValue)
    throw `[NO CONTEXT FOUND] <Option /> can only be rendered if the context from <Select /> is provided.`;

  const { addOptionElement, removeOptionElement } = contextValue;

  const elRef = useRef<HTMLOptionElement>();

  const onRef = useCallback(
    (ref: HTMLOptionElement | null) => {
      if (ref) {
        elRef.current = ref;
        addOptionElement(ref);
      } else {
        if (elRef.current) {
          removeOptionElement(elRef.current);
        }
      }
    },
    [addOptionElement, removeOptionElement]
  );

  return <option ref={onRef} {...props} />;
}
