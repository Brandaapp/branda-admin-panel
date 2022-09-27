import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useSession, signIn, signOut } from 'next-auth/client';

export default function AuthTest () {
  const [session, loading] = useSession();

  if (!session || loading) {
    return (
      <div className={styles.container}>
        <main className={styles.main}>
                Not signed in <button onClick={signIn}>Sign in</button>
        </main>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <Head>
          <title>Branda - Auth Test</title>
        </Head>

        <main className={styles.main}>
          <h3>Hi</h3>
          <button onClick={signOut}>Sign out</button>
        </main>

        <footer className={styles.footer}>
        </footer>
      </div>
    );
  }
}
