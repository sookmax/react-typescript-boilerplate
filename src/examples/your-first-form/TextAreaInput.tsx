import React, { useCallback, useState } from "react";

type Props = JSX.IntrinsicElements["textarea"];

function TextAreaInput({ id, onChange }: Props) {
  const [message, setMessage] = useState("");

  const _onChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMessage(e.target.value);
      onChange?.(e);
    },
    [onChange]
  );

  return (
    <>
      <label htmlFor={id}>Message:</label>
      <textarea id={id} value={message} onChange={_onChange}></textarea>
    </>
  );
}

export default React.memo(TextAreaInput);
