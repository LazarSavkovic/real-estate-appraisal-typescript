import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
          rel="stylesheet"
        />

        <link href='https://api.mapbox.com/mapbox-gl-js/v2.6.0/mapbox-gl.css' rel='stylesheet' />
      </Head>
 
      <Script src='https://api.mapbox.com/mapbox-gl-js/v2.6.0/mapbox-gl.js' />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
