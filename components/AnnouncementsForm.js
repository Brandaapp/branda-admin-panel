import { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { KeyboardDatePicker } from '@material-ui/pickers';
import MuiTextField from '@material-ui/core/TextField';

const TextField = withStyles({ root: { width: "100% !important" } })(MuiTextField);


export default function AnnouncementsForm(props) {
    const [state, setState] = useState({
        type: "",
        content: "",
        startTime: new Date(),
        endTime: new Date()
    });

    function handleChange(output, toChange) {
        if (toChange === 'reset') {
            setState({
                type: "",
                content: "",
                startTime: new Date(),
                endTime: new Date()
            });
        } else if (toChange === 'type') {
            setState(prev => ({ ...prev, type: output.target.value }));
        } else if (toChange === 'content') {
            setState(prev => ({ ...prev, content: output.target.value }));
        } else if (toChange === 'startTime') {
            setState(prev => ({ ...prev, startTime: output }));
        } else {
            setState(prev => ({ ...prev, endTime: output }));
        }
    }

    return (
        <div className="announcement-card">
            <h5>Make an announcement</h5>
            <div style={{ marginTop: "40px" }}>
                <span className="input-label">Type</span>
                <TextField
                    id="type"
                    placeholder="Enter type"
                    rowsMax={1}
                    multiline
                    value={state.type}
                    onChange={(event) => handleChange(event, 'type')}
                />
            </div>
            <div style={{ marginTop: "40px" }}>
                <span className="input-label">Description</span>
                <TextField
                    id="content"
                    placeholder="Enter description"
                    rowsMax={4}
                    multiline
                    value={state.content}
                    onChange={(event) => handleChange(event, 'content')}
                />
            </div>
            <div className="row" style={{ marginTop: "40px" }}>
                <div className="col s6">
                    <div>Start Date</div>
                    <KeyboardDatePicker
                        clearable
                        value={state.startTime}
                        placeholder="Enter Date"
                        onChange={(date) => handleChange(date, 'startTime')}
                        minDate={new Date()}
                        format="MM/dd/yyyy"
                    />
                </div>
                <div className="col 6">
                    <div>End Date</div>
                    <KeyboardDatePicker
                        clearable
                        value={state.endTime}
                        placeholder="Enter Date"
                        onChange={(date) => handleChange(date, 'endTime')}
                        minDate={new Date()}
                        format="MM/dd/yyyy"
                    />
                </div>
            </div>
            <button className="btn waves-effect waves-light" type="submit"
                name="action" onClick={() => {props.create(state); handleChange(null, 'reset');}}
                style={{ backgroundColor: "#1B4470", color: "white", marginTop: "40px", padding: "0 1.5rem" }}>
                Submit
                <i className="material-icons right">send</i>
            </button>
        </div>
    );
}