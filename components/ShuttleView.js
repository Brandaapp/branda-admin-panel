import { useState, useEffect } from 'react';

const axios = require('axios');

export default function ShuttleView() {
    const [ date, setDate ] = useState(new Date("2019-09-16T22:40:27.884+00:00"));
    const [ shuttles, setShuttles ] = useState(null);

    useEffect(async () => {
        if (shuttles === null) {
            await axios.get(`/api/shuttles/${date.toISOString()}`)
            .then((response) => {
                console.log(response.data);
                setShuttles(response.data);
            })
            .catch(err => console.log("Error getting shuttles",err));
        }
    });

    function renderShuttles() {
        return shuttles.times.map(time => {
            return (
                <li>
                    <div style={{ backgroundColor: "blue", border: "2px blue" }}>
                        <div style={{ color: "white" }}>Bus: {time.busName}</div><br />
                        <div style={{ color: "white" }}>ID: {time.ID}</div><br />
                        <div style={{ color: "white" }}>Route: {time.route}</div><br />
                    </div>
                </li>
            );
        })
    }

    if (shuttles !== null) {
        return (
            <div>
                <ul>
                    {renderShuttles()}
                </ul>
            </div>
        )
    } else return null;
}