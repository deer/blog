import { App, staticFiles } from "fresh";
import type { State } from "./utils.ts";
import { umamiMiddleware } from "./umami.ts";

export const app = new App<State>();

app.use(staticFiles());
app.use(umamiMiddleware());
app.fsRoutes();
