import { setupWorker } from "msw";
import { getHandlers } from "./handlers";

// if you want `msw` to produce error responses, use `getHandler("error")`.
export const worker = setupWorker(...getHandlers("error"));
