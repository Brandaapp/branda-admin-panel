import { useState } from "react";
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import PushNotifsForm from "../components/PushNotifsForm";

export default function PushNotifications() {
  const [dataFetched, setDataFetched] = useState(false);  /** not sure if we need this but followed the file schedules.js */

  return (
    <div className={styles.container}>
      <Head>
        <title>Branda - Push Notifications</title>
      </Head>

      <main className={styles.main}>
        <div>
          <PushNotifsForm
            dataFetched={dataFetched}
            setDataFetched={setDataFetched}
          ></PushNotifsForm>
        </div>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}