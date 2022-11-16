import { setupWorker, rest } from "msw";

export const worker = setupWorker(
  rest.post("/api/login", (req, res, ctx) => {
    return res(ctx.json({ token: "fake-token" }));
  })
);
