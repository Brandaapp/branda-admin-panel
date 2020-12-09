import { useState, useEffect } from 'react';
import AnnouncementsDisplay from './AnnouncementsDisplay';
import AnnouncementsForm from './AnnouncementsForm';

const axios = require('axios');

export default function AnnouncementsView() {
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

    if (state.dataFetched) {
        return (
            <div>
                <div className="col m6"><AnnouncementsDisplay announcements={state.announcements} /></div>
                <div className="col m6"><AnnouncementsForm create={createAnnouncement} /></div>
            </div>
        )
    } else return (<img src="/branda-admin-loading-gif.gif" style={{ width: "280px" }} />);
}