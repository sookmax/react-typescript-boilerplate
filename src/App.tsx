import { useState } from "react";

export default function App() {
  const [state, setState] = useState(0);

  return (
    <div>
      <button data-testid="app-button" onClick={() => setState((s) => s + 1)}>
        click
      </button>
      <div data-testid="app-counter">{state}</div>
    </div>
  );
}
