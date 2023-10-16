import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Bootstrap Link */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css"
          rel="stylesheet"
        ></link>

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

        <link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;1,300&display=swap" rel="stylesheet"></link>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400&display=swap" rel="stylesheet" />

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
