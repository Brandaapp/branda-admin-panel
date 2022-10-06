import styles from '../styles/Home.module.css';
import Remove from '@material-ui/icons/Remove';
import Fab from '@material-ui/core/Fab';
import axios from 'axios';

const { DateTime } = require('luxon');

export default function ShuttleCard (props) {
  const time = props.time;

  function renderShuttles () {
    return (
      <li key={props.index}>
        <div className={styles.shuttleCard}>
          <div className="valign-wrapper" style={{ width: '15%' }}>
            <i className="material-icons fa-3x">directions_bus</i>
          </div>
          <div style={{ width: '55%' }}>
            <div className={styles.shuttleName}>
              <h5>{time.busName}</h5>
            </div>
            <div className={styles.shuttleDetail}>
              <div className="shuttle-details">
                Time in Route:{' '}
                {DateTime.fromISO(time.start).toLocaleString(
                  DateTime.TIME_SIMPLE
                ) +
                  ' - ' +
                  DateTime.fromISO(time.end).toLocaleString(
                    DateTime.TIME_SIMPLE
                  )}
              </div>
            </div>
          </div>
          <div className="valign-wrapper">
            <Fab
              aria-label="minus"
              size="small"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
                marginRight: '5%'
              }}
            >
              <Remove
                fontSize="small"
                onClick={() => {
                  axios
                    .delete(
                      `/api/shuttles/${props.date.toISOString()}/${time.ID}`
                    )
                    .then((response) => {
                      props.getShuttles(props.date);
                      // console.log(response);
                    });
                }}
              />
            </Fab>
          </div>
        </div>
      </li>
    );
  }

  return (
    <div>
      <ul>{renderShuttles()}</ul>
    </div>
  );
}
