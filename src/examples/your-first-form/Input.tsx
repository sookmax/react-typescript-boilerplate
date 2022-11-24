import React, { useCallback, useState } from "react";

type Props<T extends keyof JSX.IntrinsicElements> = JSX.IntrinsicElements[T];

function InputImpl({ onChange, ...rest }: Props<"input">) {
  const [value, setValue] = useState("");

  const _onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      onChange?.(e);
    },
    [onChange]
  );

  return <input {...rest} value={value} onChange={_onChange} />;
}

export const Input = React.memo(InputImpl);
export type InputProps = Parameters<typeof Input>[0];

function TextAreaImpl({ onChange, ...rest }: Props<"textarea">) {
  const [value, setValue] = useState("");

  const _onChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
      onChange?.(e);
    },
    [onChange]
  );

  return <textarea {...rest} value={value} onChange={_onChange} />;
}

export const TextArea = React.memo(TextAreaImpl);
export type TextAreaProps = Parameters<typeof TextArea>[0];
