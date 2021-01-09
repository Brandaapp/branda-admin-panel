import styles from "../styles/Home.module.css";
import Remove from "@material-ui/icons/Remove";
import Fab from "@material-ui/core/Fab";
import ShuttleComponent from "./ShuttleComponent";

const axios = require("axios");

export default function ShuttleList(props) {
  if (props.shuttles !== null) {
    return (
      <div style={{ width: "100%" }}>
        <div className="card-panel">
          <div className="row  lighten-5">
            <div className="col s12 center">
              <h4 className="blue-text text-darken-1">{props.route}</h4>
            </div>
            <div class="center-align" style={{ paddingTop: "50px" }}>
              <a class="btn-floating waves-effect waves-light blue">
                <i class="material-icons">add</i>
              </a>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {props.shuttles.map((time, index) => {
                return <ShuttleComponent time={time} key={index} />;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  } else return null;
}
