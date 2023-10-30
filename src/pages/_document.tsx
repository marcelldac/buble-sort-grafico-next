/* eslint-disable @next/next/no-title-in-document-head */
import { Html, Main, NextScript, Head } from "next/document";
import { ColorSchemeScript } from "@mantine/core";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <ColorSchemeScript defaultColorScheme="auto" />
        <title>Bubble Sort</title>
        <meta
          name="description"
          content="This is a page about Bubble Sort algorithm."
        />
        <meta property="og:title" content="Bubble Sort" />
        <meta
          property="og:description"
          content="Learn about the Bubble Sort algorithm."
        />
        {/* <meta property="og:url" content="https://..." /> */}
        <link rel="icon" href="/favicon.png" />
        {/* <link rel="canonical" href="https://..." /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
