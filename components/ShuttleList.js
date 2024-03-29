import { useState } from 'react';
import ShuttleCard from './ShuttleCard';
import ShuttleForm from './ShuttleForm';

export default function ShuttleList (props) {
  const [show, setShow] = useState(false);

  if (props.shuttles !== null) {
    return (
      <div style={{ width: '100%' }}>
        <div className="card-panel">
          <div className="row  lighten-5">
            <div className="col s12 center">
              <h4 className="blue-text text-darken-1">{props.route}</h4>
            </div>
            <div className="center-align" style={{ paddingTop: '50px' }}>
              <a
                className="btn-floating waves-effect waves-light blue"
                onClick={() => setShow(true)}
              >
                <i className="material-icons">add</i>
              </a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {props.shuttles.map((time) => {
                return (
                  <ShuttleCard
                    time={time}
                    route={props.route}
                    getShuttles={props.getShuttles}
                    date={props.date}
                    key={'_' + Math.random().toString(36).substr(2, 9)}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <ShuttleForm
          date={props.date}
          setShow={setShow}
          show={show}
          route={props.route}
          getShuttles={props.getShuttles}
        />
      </div>
    );
  } else return null;
}
