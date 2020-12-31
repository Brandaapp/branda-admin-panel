import { useState } from 'react';
import { getSession } from 'next-auth/client';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import ScheduleView from '../components/ScheduleView';

export default function Home() {
  const [dataFetched, setDataFetched] = useState(false);

  return (
    <div className={styles.container}>
      <Head>
        <title>Branda - Home</title>
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
        <div className="row">
          <ScheduleView dataFetched={dataFetched} setDataFetched={setDataFetched} />
        </div>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}

export async function getServerSideProps({ req, res }) {
  const session = await getSession({ req });
  if (session) {
    return {
      props: { session }
    }
  } else {
    res.writeHead(302, { Location: '/login' });
    res.end();
    return { props: {} }
  }
}