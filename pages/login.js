import Head from 'next/head'
import styles from '../styles/Home.module.css'
import LoginForm from '../components/LoginForm';

export default function Login() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Branda - Login</title>
      </Head>

      <main className={styles.main} style={{ width: "100%" }}>
        <div className="row" style={{ textAlign: "center" }}>
          <img src="/admin-logo.png" style={{ width: "15%", marginBottom: "10px" }} />
        </div>
        <div className="row" style={{ width: "100%" }}><LoginForm /></div>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  );
}