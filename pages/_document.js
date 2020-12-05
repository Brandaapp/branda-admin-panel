import Document, { Html, Head, Main, NextScript } from 'next/document'

class MainDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
          <script src="https://code.jquery.com/jquery-2.2.4.js" integrity="sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI=" crossOrigin="anonymous"></script>
          <script src="https://use.fontawesome.com/8ff98e4aea.js"></script>

        </Head>
        <body>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/js/materialize.min.js"></script>
          <script src="javascript.js"></script>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MainDocument