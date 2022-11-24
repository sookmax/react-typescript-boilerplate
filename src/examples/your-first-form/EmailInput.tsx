import React, { useCallback, useState } from "react";

type Props = JSX.IntrinsicElements["input"];

function EmailInput({ id, name, onChange }: Props) {
  const [email, setEmail] = useState("");

  const _onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
      onChange?.(e);
    },
    [onChange]
  );

  return (
    <>
      <label htmlFor={id}>E-mail:</label>
      <input
        type="email"
        id={id}
        name={name}
        value={email}
        onChange={_onChange}
      />
    </>
  );
}

export default React.memo(EmailInput);
