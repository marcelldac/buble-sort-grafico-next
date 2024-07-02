import { Html, Main, NextScript, Head } from "next/document";
import { ColorSchemeScript } from "@mantine/core";

export default function Document() {
  return (
    <Html lang="pt-br">
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
        <link rel="icon" href="/favicon.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
