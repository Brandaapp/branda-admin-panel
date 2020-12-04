import { useState, useEffect } from 'react';
import AnnouncementsDisplay from './AnnouncementsDisplay';
import AnnouncementsForm from './AnnouncementsForm';

const axios = require('axios');

export default function AnnouncementsView(props) {
    const [state, setState] = useState({
        announcements: [],
        dataFetched: false
    });

    function getAnnouncements() {
        axios.get(`/api/announcements/${(new Date()).toString()}`)
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

    function createAnnouncement(data) {
        axios.post('/api/announcements', data)
            .then(() => {getAnnouncements()})
            .catch(err => console.log("Error creating announcement", err));
    }

    if (props.dataFetched) {
        return (
            <div>
                <div className="col m6"><AnnouncementsDisplay announcements={state.announcements} /></div>
                <div className="col m6"><AnnouncementsForm create={createAnnouncement} /></div>
            </div>
        )
    } else return null;

    /* if (props.dataFetched) {
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
                        <div className="row" style={{ marginTop: "40px" }}>
                            
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
    } else return null; */
}