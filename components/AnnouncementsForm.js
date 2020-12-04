import { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { KeyboardDatePicker } from '@material-ui/pickers';
import MuiTextField from '@material-ui/core/TextField';

const TextField = withStyles({ root: { width: "100% !important" } })(MuiTextField);

export default function AnnouncementsForm(props) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());

    function createAnnouncement() {
        axios.post('/api/announcements', {
            title: title,
            content: content
        })
            .then(() => {
                setTitle("");
                setContent("");
                getAnnouncements();
            })
            .catch(err => console.log("Error creating announcement", err));
    }

    return (
        <div className="announcement-card">
            <h5>Make an announcement</h5>
            <div style={{ marginTop: "40px" }}>
                <span className="input-label">Title</span>
                <TextField
                    id="title"
                    placeholder="Enter title"
                    rowsMax={1}
                    multiline
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
            </div>
            <div style={{ marginTop: "40px" }}>
                <span className="input-label">Description</span>
                <TextField
                    id="content"
                    placeholder="Enter description"
                    rowsMax={4}
                    multiline
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                />
            </div>
            <div className="row" style={{ marginTop: "40px" }}>
                
            </div>
            <button className="btn waves-effect waves-light" type="submit" name="action" onClick={createAnnouncement}
                style={{ backgroundColor: "#1B4470", color: "white", marginTop: "40px", padding: "0 1.5rem" }}>
                Submit
                <i className="material-icons right">send</i>
            </button>
        </div>
    );
}