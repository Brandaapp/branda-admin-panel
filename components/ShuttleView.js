import shadows from "@material-ui/core/styles/shadows";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";

const axios = require("axios");

export default function ShuttleView() {
  const [date, setDate] = useState(new Date("2019-09-16T22:40:27.884+00:00"));
  const [shuttles, setShuttles] = useState(null);

  useEffect(async () => {
    if (shuttles === null) {
      await axios
        .get(`/api/shuttles/${date.toISOString()}`)
        .then((response) => {
          console.log(response.data);
          setShuttles(response.data);
        })
        .catch((err) => console.log("Error getting shuttles", err));
    }
  });

  function renderShuttles() {
    return shuttles.times.map((time) => {
      return (
        <li>
          <div className={styles.shuttleCard}>
            <img src="" alt="Vehicle Icon" className={styles.shuttleImg}></img>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginRight: "5%",
                flex: "1 0 auto",
              }}
            >
              <div>
                <h5>{time.busName}</h5>
              </div>
              <div className={styles.shuttleDetail}>
                <sub>ID: {time.ID}</sub>
                <br />
                <sub>Route: {time.route}</sub>
              </div>
            </div>
          </div>
        </li>
      );
    });
  }

  if (shuttles !== null) {
    return (
      <div>
        <ul>{renderShuttles()}</ul>
      </div>
    );
  } else return null;
}
