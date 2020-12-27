import shadows from "@material-ui/core/styles/shadows";
import { useState, useEffect } from "react";
import ShuttleList from './ShuttleList';
import WeekPicker from './WeekPicker';
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

  return (
    <div>
      <div className="row">
        <div stle={{ textAlign: "center" }}>
          <h>Shuttle Management</h>
          <p>Please choose a date</p>
          <WeekPicker />
        </div>
      </div>
      <div className="row">
        <div className="col m4"><ShuttleList route={"Campus"} shuttles={shuttles} /></div>
        <div className="col m4"><ShuttleList route={"Waltham"} shuttles={shuttles} /></div>
        <div className="col m4"><ShuttleList route={"Boston"} shuttles={shuttles} /></div>
      </div>
    </div>
  )

}
