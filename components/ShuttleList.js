import styles from "../styles/Home.module.css";

export default function ShuttleList(props) {
  function renderShuttles() {
    return props.shuttles.map((time) => {
      return (
        <li>
          <div className={styles.shuttleCard}>
            <div class="valign-wrapper">
              <i className="material-icons fa-3x">directions_bus</i>
            </div>
            <div>
              <div className={styles.shuttleName}>
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

  if (props.shuttles !== null) {
    return (
      <div className={styles.shuttleCard}>
        <div>
          <div className="card-panel">
            <div className="row  lighten-5">
              <div className="col s12 center">
                <h4 className="blue-text text-darken-1">{props.route}</h4>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <ul>{renderShuttles()}</ul>
            </div>
          </div>
        </div>
      </div>
    );
  } else return null;
}
