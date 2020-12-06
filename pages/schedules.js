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
        <style>{`
          .DayPicker-Day {
            outline: none;
            border: 1px solid transparent;
            color: #171b1f !important;
          }
          .WeekPicker .DayPicker-Day--hoverRange {
            background-color: #EFEFEF !important;
            border-radius: 0;
          }
          .WeekPicker .DayPicker-Day--selectedRange {
            background-color: #b5d0ed !important;
            border-radius: 0;
          }
          .WeekPicker .DayPicker-Day--start {
            background-color: #22568e !important;
            color: white !important;
            border-top-left-radius: 50% !important;
            border-bottom-left-radius: 50% !important;
            border-top-right-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
          }
          .WeekPicker .DayPicker-Day--end {
            background-color: #22568e !important;
            color: white !important;
            border-top-left-radius: 0 !important;
            border-bottom-left-radius: 0 !important;
            border-top-right-radius: 50% !important;
            border-bottom-right-radius: 50% !important;
          }
          .MuiPaper-elevation1 {
            box-shadow: 0px 0px 0px 0px !important;
          }
          .MuiTypography-body1 {
            margin-left: 1.5rem !important;
          }
        `}</style>
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
