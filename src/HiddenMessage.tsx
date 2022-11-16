import React, { useState } from "react";

type Props = {
  children: React.ReactNode;
};

export default function HiddenMessage({ children }: Props) {
  const [showMessage, setShowMessage] = useState(false);
  return (
    <div>
      <label htmlFor="toggle">Show Message</label>
      <input
        id="toggle"
        type="checkbox"
        onChange={(e) => setShowMessage(e.target.checked)}
        checked={showMessage}
      />
      {showMessage ? children : null}
    </div>
  );
}
