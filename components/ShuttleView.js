import { useState, useEffect } from 'react';
import ShuttleList from './ShuttleList';
import styles from '../styles/Home.module.css';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import axios from 'axios';
import { TextField } from '@mui/material';

export default function ShuttleView () {
  const [date, setDate] = useState(new Date());
  const [shuttles, setShuttles] = useState(null);

  async function getShuttles (date) {
    await axios
      .get(`/api/shuttles/${date.toISOString()}`)
      .then((response) => {
        setShuttles(response.data);
      });
  }

  useEffect(async () => {
    await getShuttles(date);
  }, [date]);

  const campus = [];
  const waltham = [];
  const boston = [];
  if (shuttles !== null) {
    shuttles.times.forEach((shuttle) => {
      if (shuttle.route === 'Campus' || shuttle.route === 'campus') { campus.push(shuttle); }
      if (shuttle.route === 'Waltham' || shuttle.route === 'waltham') { waltham.push(shuttle); }
      if (shuttle.route === 'Boston' || shuttle.route === 'boston') { boston.push(shuttle); }
    });
  }

  return (
    <div style={{ width: '100%' }}>
      <div className="row">
        <div
          id="title"
          style={{
            textAlign: 'center',
            align_items: 'center',
            justify_content: 'center'
          }}
        >
          <h5>Shuttles Management</h5>

          <DesktopDatePicker
            clearable
            placeholder="Enter Date"
            value={date}
            onChange={(newDate) => setDate(newDate.toJSDate())}
            format="MM/dd/yyyy"
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
      </div>
      <div className="row" style={{ display: 'flex', flexDirection: 'row' }}>
        <div className={styles.shuttleCard}>
          <ShuttleList
            route={'Campus'}
            getShuttles={getShuttles}
            date={date}
            shuttles={campus}
          />
        </div>
        <div className={styles.shuttleCard}>
          <ShuttleList
            route={'Waltham'}
            getShuttles={getShuttles}
            date={date}
            shuttles={waltham}
          />
        </div>
        <div className={styles.shuttleCard}>
          <ShuttleList
            route={'Boston'}
            getShuttles={getShuttles}
            date={date}
            shuttles={boston}
          />
        </div>
      </div>
    </div>
  );
}
