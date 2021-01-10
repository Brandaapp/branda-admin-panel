import { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { KeyboardTimePicker } from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";

const Input = withStyles({ root: { width: "100% !important" } })(TextField);
const axios = require("axios");

export default function ShuttleForm(props) {
  const [state, setState] = useState({
    ID: "",
    busID: "",
    busName: "",
    start: props.date,
    end: props.date,
  });

  function cancel() {
    setState({
      ID: "",
      busID: "",
      busName: "",
      start: props.date,
      end: props.date,
      route: props.route,
    });
    props.setShow(false);
  }

  async function submit() {
    await axios
      .patch(`/api/shuttles/${props.date.toISOString()}`, {
        start: state.start,
        end: state.end,
        busID: state.busID,
        busName: state.busName,
        route: state.route,
      })
      .then((response) => {
        console.log(response);
        console.log("Adding a new shuttle:", state);
        props.setShow(false);
        props.getShuttles(props.date);
      })
      .catch((err) => console.log("Error creating new shuttles", err));
  }

  if (props.show)
    return (
      <div>
        <div className="popup-form-bg"></div>
        <div className="popup-form-wrapper">
          <div className="popup-form">
            <h4 className="shuttle-form-header">Add Shuttle</h4>
            <div className="shuttle-form-label">Bus Name</div>
            <div className="shuttle-form-input">
              <Input
                placeholder="Enter Bus Name"
                size="small"
                type="text"
                value={state.busName}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, busName: e.target.value }))
                }
              />
            </div>
            <div className="shuttle-form-label">Time ID</div>
            <div className="shuttle-form-input">
              <Input
                placeholder="Enter Time ID"
                size="small"
                type="text"
                value={state.ID}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, ID: e.target.value }))
                }
              />
            </div>
            <div className="shuttle-form-label">Bus ID</div>
            <div className="shuttle-form-input">
              <Input
                placeholder="Enter Bus ID"
                size="small"
                type="text"
                value={state.busID}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, busID: e.target.value }))
                }
              />
            </div>
            <div className="row">
              <div className="col s6">
                <div className="shuttle-form-label">Start Time</div>
                <KeyboardTimePicker
                  value={state.start}
                  onChange={(date) =>
                    setState((prev) => ({ ...prev, start: date.toJSDate() }))
                  }
                />
              </div>
              <div className="col s6">
                <div className="shuttle-form-label">End Time</div>
                <KeyboardTimePicker
                  value={state.end}
                  onChange={(date) =>
                    setState((prev) => ({ ...prev, end: date.toJSDate() }))
                  }
                />
              </div>
            </div>
            <div className="btn-row">
              <button
                className="btn waves-effect waves-light shuttle-form-cancel-btn"
                onClick={cancel}
              >
                Cancel
              </button>
              <button
                className="btn waves-effect waves-light shuttle-form-btn"
                type="submit"
                onClick={() => submit()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  else return null;
}
