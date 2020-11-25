import Head from 'next/head'
import styles from '../styles/Home.module.css'
import ScheduleView from '../components/ScheduleView'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Branda - Home</title>
        <link rel="icon" href="/favicon.ico" />
        <style>{`
          .DayPicker-Day {
            outline: none;
            border: 1px solid transparent;
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
            color: white;
            border-top-left-radius: 50% !important;
            border-bottom-left-radius: 50% !important;
            border-top-right-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
          }
          .WeekPicker .DayPicker-Day--end {
            background-color: #22568e !important;
            color: white;
            border-top-left-radius: 0 !important;
            border-bottom-left-radius: 0 !important;
            border-top-right-radius: 50% !important;
            border-bottom-right-radius: 50% !important;
          }
        `}</style>
      </Head>

      <main className={styles.main}>
        <ScheduleView />
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
