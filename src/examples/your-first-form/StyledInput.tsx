import React, { useCallback, useState } from "react";
import { classNames } from "../../utils";
import { Input, InputProps } from "./Input";

type Props = { labelText?: string } & InputProps;

export default function StyledInput({
  labelText = "label text",
  id,
  onChange,
  ...inputPropsRest
}: Props) {
  const [isValue, setIsValue] = useState(false);

  const _onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <div className="relative">
      <Input
        id={id}
        onChange={_onChange}
        {...inputPropsRest}
        className={classNames(
          "w-full h-12 p-2",
          "border rounded-md",
          "transition-all duration-100",
          "outline-none",
          "focus:border-2 focus:border-green-600"
        )}
      />
      <label
        htmlFor={id}
        className={classNames(
          "absolute pointer-events-none z-10",
          "top-1/2 -translate-y-1/2",
          "left-2",
          "px-1",
          "bg-white",
          "text-gray-500 text-sm md:text-base",
          "[input:focus~&]:-translate-y-[2.2rem]",
          "[input:focus~&]:scale-75",
          isValue && "-translate-y-[2.2rem] scale-75",
          "transition-transform duration-100"
        )}
      >
        {labelText}
      </label>
    </div>
  );
}
