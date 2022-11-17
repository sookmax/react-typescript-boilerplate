import { useReducer } from "react";

const initialState = {
  resolved: false,
  loading: false,
  error: null,
};

type State = typeof initialState;

const reducer = (state: State, update: State) => ({ ...state, ...update });

export default function Login() {
  const [state, setState] = useReducer(reducer, initialState);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const usernameInput = (event.target as HTMLFormElement)
      .elements[0] as HTMLInputElement;
    const passwordInput = (event.target as HTMLFormElement)
      .elements[1] as HTMLInputElement;

    setState({ loading: true, resolved: false, error: null });

    window
      .fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: usernameInput.value,
          password: passwordInput.value,
        }),
      })
      .then((res) =>
        res.json().then((data) => (res.ok ? data : Promise.reject(data)))
      )
      .then(
        (user) => {
          setState({ loading: false, resolved: true, error: null });
          window.localStorage.setItem("token", user.token);
        },
        (error) => {
          setState({ loading: false, resolved: false, error: error.message });
        }
      );
  };

  return (
    <div className="font-extrabold">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="usernameInput">Username</label>
          <input id="usernameInput" />
        </div>
        <div>
          <label htmlFor="passwordInput">Password</label>
          <input id="passwordInput" type="password" />
        </div>
        <button type="submit">Submit{state.loading ? "..." : null}</button>
      </form>
      {state.error ? <div role="alert">{state.error}</div> : null}
      {state.resolved ? (
        <div role="alert">Congrats! You&apos;re signed in!</div>
      ) : null}
    </div>
  );
}
