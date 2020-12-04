import { useState, useEffect } from 'react';
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
    })
    /* const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date()); */

    function handleChange(event, toChange) {
        if (event === null) return;
        switch (toChange) {
            case 'type':
                setState(prev => ({ ...prev, type: event.target.value }));
            case 'content':
                setState(prev => ({ ...prev, content: event.target.value}));
            case 'startTime':
                setState(prev => ({ ...prev, startTime: event.target.value }));
            case 'endTime':
                setState(prev => ({ ...prev, endTime: event.target.value }));
            default:
                throw new Error();
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
            {/* <div className="row" style={{ marginTop: "40px" }}>
                <div className="col s6">
                    <span>Start Date</span>
                    <KeyboardDatePicker
                        clearable
                        value={state.startTime}
                        placeholder="Enter Date"
                        onChange={(event) => handleChange(event, 'startTime')}
                        minDate={new Date()}
                        format="MM/dd/yyyy"
                    />
                </div>
                <div className="col 6">
                    <span>End Date</span>
                    <KeyboardDatePicker
                        clearable
                        value={state.startTime}
                        placeholder="Enter Date"
                        onChange={(event) => handleChange(event, 'endTime')}
                        minDate={new Date()}
                        format="MM/dd/yyyy"
                    />
                </div>
            </div> */}
            <button className="btn waves-effect waves-light" type="submit" name="action" onClick={() => props.create(state)}
                style={{ backgroundColor: "#1B4470", color: "white", marginTop: "40px", padding: "0 1.5rem" }}>
                Submit
                <i className="material-icons right">send</i>
            </button>
        </div>
    );
}