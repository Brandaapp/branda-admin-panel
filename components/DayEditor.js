import { KeyboardTimePicker } from "@material-ui/pickers";

export default function DayEditor(props) {
  return (
    <td>
      <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          height: "120px",
        }}>
        <KeyboardTimePicker
          value={props.start}
          label="Start time"
          onChange={(date, hour) => props.callback(date, hour, props.day, true)}
          style={{ width: "125px" }}
        />
        <KeyboardTimePicker
          value={props.end}
          label="End time"
          onChange={(date, hour) =>
            props.callback(date, hour, props.day, false)
          }
          style={{ width: "125px" }}
        />
      </div>
    </td>
  );
}
