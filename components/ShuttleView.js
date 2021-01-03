import shadows from "@material-ui/core/styles/shadows";
import { useState, useEffect } from "react";
import ShuttleList from "./ShuttleList";
import styles from "../styles/Home.module.css";
import Daypicker from "./DayPicker";
import { KeyboardDatePicker } from "@material-ui/pickers";

const axios = require("axios");

export default function ShuttleView() {
  const [date, setDate] = useState(new Date("2019-09-16T22:40:27.884+00:00"));
  const [shuttles, setShuttles] = useState(null);

  useEffect(async () => {
    await axios
      .get(`/api/shuttles/${date.toISOString()}`)
      .then((response) => {
        console.log(response.data);
        setShuttles(response.data);
      })
      .catch((err) => console.log("Error getting shuttles", err));
  }, [date]);

  const campus = [];
  const waltham = [];
  const boston = [];
  if (shuttles !== null) {
    shuttles.times.forEach((shuttle) => {
      if (shuttle.route === "Campus" || shuttle.route === "campus") campus.push(shuttle);
      if (shuttle.route === "Waltham" || shuttle.route === "waltham") waltham.push(shuttle);
      if (shuttle.route === "Boston" || shuttle.route === "boston") boston.push(shuttle);
    });
  }

  console.log(date);

  return (
    <div>
      <div className="row">
        <div
          id="title"
          style={{
            textAlign: "center",
            align_items: "center",
            justify_content: "center",
          }}
        >
          <h5>Shuttle Management</h5>

          <KeyboardDatePicker
            clearable
            placeholder="Enter Date"
            value={date}
            onChange={(newDate) => setDate(newDate.toJSDate())}
            format="MM/dd/yyyy"
          />
        </div>
      </div>
      <div className="row">
        <div className="col m4">
          <ShuttleList route={"Campus"} shuttles={campus} />
        </div>
        <div className="col m4">
          <ShuttleList route={"Waltham"} shuttles={waltham} />
        </div>
        <div className="col m4">
          <ShuttleList route={"Boston"} shuttles={boston} />
        </div>
      </div>
    </div>
  );
}
