/* eslint-disable @next/next/no-title-in-document-head */
import { Html, Main, NextScript, Head } from "next/document";
import { ColorSchemeScript } from "@mantine/core";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <ColorSchemeScript defaultColorScheme="auto" />
        <title>Bubble Sort</title>
        <meta property="og:title" content="Bubble Sort" key="Bubble Sort" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
