import { useState, useEffect } from 'react';
import AnnouncementRow from './AnnouncementRow'

const axios = require('axios');

export default function AnnouncementsView(props) {
    const [state, setState] = useState({
        announcements: [],
        dataFetched: false
    });

    useEffect(() => {
        if (!state.dataFetched) {
            axios.get('/api/announcements')
                .then(response => {
                    setState({
                        announcements: response.data,
                        dataFetched: true
                    })
                })
                .catch(err => console.log("Error fetching announcements", err));
        }
    });
    
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
            <div className="card" style={{ backgroundColor: "#1B4370", borderRadius: "4px", marginTop: "15px" }}>
                <div className="card-content">
                    <h5 style={{ color: "white" }}>Latest Announcements</h5>
                    <ul>
                        {renderAnnouncements()}
                    </ul>
                </div>
            </div>
        );
    } else return null;
}