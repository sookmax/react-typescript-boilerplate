import React, { useCallback, useState } from "react";

type Props = { labelClassName: string } & JSX.IntrinsicElements["input"];

function NameInput({ id, name, onChange, labelClassName }: Props) {
  const [value, setValue] = useState("");

  const _onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      onChange?.(e);
    },
    [onChange]
  );

  return (
    <>
      <label className={labelClassName} htmlFor={id}>
        Name:
      </label>
      <input
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={_onChange}
      />
    </>
  );
}

export default React.memo(NameInput);
