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
        <div stle={{ textAlign: "center" }}>
          <h>Shuttle Management</h>
          <p>Please choose a date</p>
          <WeekPicker />
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <div className={styles.shuttleCard}>
            <div>
              <div className="card-panel">
                <div className="row  lighten-5">
                  <div className="col s12 center">
                    <h4 className="blue-text text-darken-1">Campus</h4>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <ShuttleView />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.shuttleCard}>
            <div>
              <div className="card-panel">
                <div className="row  lighten-5">
                  <div className="col s12 center">
                    <h4 className="blue-text text-darken-1">Waltham</h4>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <ShuttleView />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.shuttleCard}>
            <div>
              <div className="card-panel">
                <div className="row  lighten-5">
                  <div className="col s12 center">
                    <h4 className="blue-text text-darken-1">Boston</h4>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <ShuttleView />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
