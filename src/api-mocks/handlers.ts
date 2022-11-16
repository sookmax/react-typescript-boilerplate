// To mock `REST API`s, import `rest` from `msw`.
// To handle a REST API request, we need to specify its method, path, and
// a function that would return the mocked response.
import { rest } from "msw";

export const FAKE_TOKEN = "fake-token";

const handlers = [
  rest.post("/api/login", (req, res, ctx) => {
    // To respond to an intercepted request, we have to specify
    // a mocked response using a response resolver function.
    //
    // - req: an information about a matching request
    // - res: a functional utility to create the mocked response.
    // - ctx: a group of functions that help to set a status code, headers, body, etc. of the mocked response.
    return res(ctx.status(200), ctx.json({ token: FAKE_TOKEN }));
  }),
];

const errorHandlers = [
  rest.post("/api/login", (req, res, ctx) => {
    return res(ctx.status(500), ctx.json({ message: "Internal server error" }));
  }),
];

export function getHandlers(type: "sucess" | "error") {
  switch (type) {
    case "sucess":
      return handlers;
    case "error":
      return errorHandlers;
  }
}
