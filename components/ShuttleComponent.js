import styles from "../styles/Home.module.css";
import Remove from "@material-ui/icons/Remove";
import Fab from "@material-ui/core/Fab";

const axios = require("axios");

export default function ShuttleList(props) {
  console.log(props);
  const time = props.time;

  function renderShuttles() {
    return (
      <li key={props.index}>
        <div className={styles.shuttleCard}>
          <div className="valign-wrapper" style={{ width: "15%" }}>
            <i className="material-icons fa-3x">directions_bus</i>
          </div>
          <div style={{ width: "55%" }}>
            <div className={styles.shuttleName}>
              <h5>{time.busName}</h5>
            </div>
            <div className={styles.shuttleDetail}>
              <sub>ID: {time.ID}</sub>
              <br />
              <sub>Route: {time.route}</sub>
            </div>
          </div>
          <div className="valign-wrapper">
            <Fab
              aria-label="minus"
              size="small"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
                marginRight: "5%",
              }}
            >
              <Remove
                fontSize="small"
                onClick={() => {
                  console.log("delete");
                  axios
                    .delete(`/api/shuttles/${time.start}`)
                    .then((response) => {
                      console.log(response);
                    });
                }}
              />
            </Fab>
          </div>
        </div>
      </li>
    );
  }

  return <ul>{renderShuttles()}</ul>;
}
