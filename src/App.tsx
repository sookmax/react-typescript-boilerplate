import { useState } from "react";

export default function App() {
  const [state, setState] = useState(0);

  return (
    <div>
      <div>Hello Webpack!?</div>
      <button onClick={() => setState((s) => s + 1)}>click</button>
      <div>{state}</div>
    </div>
  );
}
