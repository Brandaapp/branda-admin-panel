import { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiTextField from '@material-ui/core/TextField';
import AnnouncementRow from './AnnouncementRow'

const axios = require('axios');
const TextField = withStyles({ root: { width: "100% !important" } })(MuiTextField);

export default function AnnouncementsView(props) {
    const [state, setState] = useState({
        announcements: [],
        dataFetched: false
    });
    const [title, setTitle] = useState(""); //maybe make these one state object to avoid fetching data twice
    const [content, setContent] = useState("");

    function getAnnouncements() {
        axios.get('/api/announcements')
            .then(response => {
                setState({
                    announcements: response.data,
                    dataFetched: true
                })
            })
            .catch(err => console.log("Error fetching announcements", err));
    }

    useEffect(() => {
        if (!state.dataFetched) {
            getAnnouncements();
        }
    });

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
    
    function renderAnnouncements() {
        return (state.announcements.map(a => {
            return (
                <li key={'_' + Math.random().toString(36).substr(2, 9)}>
                    <AnnouncementRow title={a.title} content={a.content} />
                </li>
            )
        }))
    }

    if (props.dataFetched) {
        return (
            <div>
                <div className="col m6">
                    <div className="announcement-card">
                        <h5>Latest Announcements</h5>
                        <ul>{renderAnnouncements()}</ul>
                    </div>
                </div>
                <div className="col m6">
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
                        <button className="btn waves-effect waves-light" type="submit" name="action" onClick={createAnnouncement}
                            style={{ backgroundColor: "#1B4470", color: "white", marginTop: "40px", padding: "0 1.5rem" }}>
                            Submit
                            <i className="material-icons right">send</i>
                        </button>
                    </div>
                </div>
            </div>
        );
    } else return null;
}