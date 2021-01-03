import Head from "next/head";
import styles from "../styles/Home.module.css";
import ShuttleView from "../components/ShuttleView";
import WeekPicker from "../components/WeekPicker";

export default function ShuttlesManagement() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Branda - Shuttles Management</title>
      </Head>

      <main className={styles.main}>
        <ShuttleView />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
