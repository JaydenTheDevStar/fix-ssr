import Path from "path";
import Fs from "fs";
import App from "../../client/App";

import { Request, Response } from "express";
import { ssrService } from "../services";

const isProduction = process.env.NODE_ENV === "production";

export const ssrController = (req: Request, res: Response) => {
  const context = {};

  const options = {
    App: App,
    template: Fs.readFileSync(
      Path.resolve(__dirname, "../../../public/index.html"),
      "utf-8"
    ),
  };

  const handler = ssrService(options);

  return handler(req, res, context);
};
