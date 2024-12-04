import React from "react";
import ReactDOMServer from "react-dom/server";

import { Request, Response } from "express";
import { HTMLTemplate } from "../template";
import { Helmet } from "react-helmet";
import { StaticRouter } from "react-router-dom";

export interface SSRServiceOptions {
  App: React.FC;
  template: string;
}

export const ssrService =
  ({ App, template }: SSRServiceOptions) =>
  async (req: Request, res: Response, context: Record<string, unknown>) => {
    try {
      const reactHTMLRender = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      );

      const helmet = Helmet.renderStatic();

      const initialState = {
        name: "John Doe",
      };

      const html = HTMLTemplate({
        initialState,
        template,
        metaData: helmet,
        reactHTML: reactHTMLRender,
      });

      res.send(html);
    } catch (error) {
      console.error("SSR Error:", error);
      res.status(500).send("An error occurred while rendering the page.");
    }
  };
