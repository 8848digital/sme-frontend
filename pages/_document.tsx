import { Html, Head, Main, NextScript } from "next/document";
import favicon from "../public/favicon.ico";
export default function Document() {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        {/* Bootstrap Link */}

        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css"
          rel="stylesheet"
        ></link>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          integrity="sha512-..."
          crossOrigin="anonymous"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
          async
        ></script>
        <link rel="stylesheet" href="fonts/icon-font/css/style.css" />
        <link rel="stylesheet" href="fonts/typography-font/typo.css" />
        <link rel="stylesheet" href="fonts/fontawesome-5/css/all.css" />
        {/* Font Family Ubuntu */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />

        {/* <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;1,300&display=swap"
          rel="stylesheet"
        ></link>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" /> */}
        {/* <link href="https://db.onlinewebfonts.com/c/a575313c6dc4fd00c1a9506e1c3ea4fc?family=Euclid+Circular+A" rel="stylesheet"/> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
