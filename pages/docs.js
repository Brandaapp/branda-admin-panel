import Head from 'next/head';
import { RedocStandalone } from 'redoc';

import Spec from '../docs/openapi.yaml';

export default function Docs () {
  return (
    <div>
      <Head>
        <title>Branda API Docs</title>
      </Head>
      <main>
        <RedocStandalone
          spec={Spec}
          options={{
            hideDownloadButton: true
          }}
        />
      </main>
    </div>
  );
}
