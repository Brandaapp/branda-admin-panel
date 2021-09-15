import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: "40%",
    width: "20%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    // paddingBottom: "50px",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function AddPlaceForm(props) {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [group, setGroup] = useState("");

  const { onSubmit } = props;

  const options = ["Dining", "Library", "Sport"];

  return (
    <div className={classes.paper}>
      <h4 style={{color: "#1B4370"}}>Add Place</h4>
      <TextField
        id="name"
        label="Place Name"
        variant="outlined"
        type="text"
        required
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <FormControl className={classes.formControl}>
        <InputLabel id="group-label">Group</InputLabel>
        <Select
          labelId="group-select-label"
          id="group-select"
          value={group}
          onChange={(event) => setGroup(event.target.value)}
        >
          {options.map((group) => (
            <MenuItem value={group}>{group}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          style={{ backgroundColor: "#1B4370", color: "white", width: "20%" }}
          onClick={onSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
