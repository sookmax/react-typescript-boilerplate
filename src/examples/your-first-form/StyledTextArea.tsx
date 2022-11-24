import { useState, useCallback } from "react";
import { classNames } from "../../utils";
import { TextArea, TextAreaProps } from "./Input";

type Props = { labelText?: string; height?: number } & TextAreaProps;

export default function StyledTextArea({
  labelText = "label text",
  height,
  id,
  onChange,
  ...rest
}: Props) {
  const [isValue, setIsValue] = useState(false);

  const _onChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (e.target.value.trim()) {
        setIsValue(true);
      } else {
        setIsValue(false);
      }
      onChange?.(e);
    },
    [onChange]
  );

  return (
    <div
      className="relative flex h-full w-full"
      style={{ height: height ? `${height}px` : "" }}
    >
      <TextArea
        id={id}
        {...rest}
        onChange={_onChange}
        className={classNames(
          "h-full w-full resize-none outline-none",
          "p-2",
          "rounded-md border",
          "focus:border-2 focus:border-green-600",
          "transition-all duration-100"
        )}
      />
      <label
        htmlFor={id}
        className={classNames(
          "absolute top-[0.5rem] left-[0.5rem]",
          "px-1",
          "pointer-events-none",
          "bg-white",
          "text-sm text-gray-500 md:text-base",
          "[textarea:focus~&]:-translate-y-[1.2rem]",
          "[textarea:focus~&]:-translate-x-[0.3rem]",
          "[textarea:focus~&]:scale-75",
          isValue && "-translate-y-[1.2rem] -translate-x-[0.3rem] scale-75",
          "transition-transform duration-100"
        )}
      >
        {labelText}
      </label>
    </div>
  );
}
