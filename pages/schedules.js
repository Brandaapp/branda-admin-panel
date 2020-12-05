import { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import ScheduleEditor from "../components/ScheduleEditor";

export default function Schedules() {
  const [dataFetched, setDataFetched] = useState(false);

  return (
    <div className={styles.container}>
      <Head>
        <title>Branda - Schedules</title>
      </Head>

      <main className={styles.main}>
        <div>
          <ScheduleEditor
            dataFetched={dataFetched}
            setDataFetched={setDataFetched}
          ></ScheduleEditor>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
