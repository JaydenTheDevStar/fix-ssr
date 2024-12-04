import { Helmet } from "react-helmet";

interface HTMLTemplateProps {
  initialState: Record<string, unknown>;
  template: string;
  metaData?: ReturnType<typeof Helmet.renderStatic>;
  reactHTML: string;
}

export default function HTMLTemplate({
  initialState,
  template,
  metaData,
  reactHTML,
}: HTMLTemplateProps) {
  const serializedState = JSON.stringify(initialState).replace(/</g, "\\u003c");
  const helmet = metaData;

  return template
    .replace(
      "<!-- ::META:: -->",
      `
        ${helmet?.meta.toString()}
      `.trim()
    )
    .replace("<!-- ::APP:: -->", reactHTML)
    .replace(
      "<!-- ::STATE:: -->",
      `<script>window.__STATE__ = ${serializedState};</script>`
    );
}
