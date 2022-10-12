import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';
import { ServerStyleSheets } from '@mui/styles';

class MainDocument extends Document {
  static async getInitialProps (ctx) {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />)
      });
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: [
        ...React.Children.toArray(initialProps.styles),
        sheets.getStyleElement()
      ]
    };
  }

  render () {
    return (
      <Html style={{ height: '100%' }}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
          <script src="https://code.jquery.com/jquery-2.2.4.js"
            integrity="sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI=" crossOrigin="anonymous" async></script>
          <script src="https://use.fontawesome.com/8ff98e4aea.js" async></script>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />

        </Head>
        <body style={{ height: '100%' }}>
          <Main />
          <NextScript />
          <style>{`
            #__next {
              height: 100%;
            }
          `}</style>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/js/materialize.min.js" async></script>
          <script src="javascript.js" async></script>
        </body>
      </Html>
    );
  }
}

export default MainDocument;
