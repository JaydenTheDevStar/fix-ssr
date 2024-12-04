import Express from "express";
import Path from "path";

import { ssrRoutes } from "./routes";

const isProduction = process.env.NODE_ENV === "production";

const ExpressApp = Express();
const ServerPort = 3001;

if (isProduction) {
  ExpressApp.use(Express.static(Path.join(__dirname, "../../build/public")));
} else {
  ExpressApp.use(Express.static(Path.join(__dirname, "../../public")));
}

ExpressApp.use(ssrRoutes);

ExpressApp.listen(ServerPort, () => {
  console.log(`Server is running on port ${ServerPort}!`);
});
