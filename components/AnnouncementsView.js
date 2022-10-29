import { useState, useEffect } from 'react';
import AnnouncementsDisplay from './AnnouncementsDisplay';
import AnnouncementsForm from './AnnouncementsForm';
import Image from 'next/image';
import axios from 'axios';

export default function AnnouncementsView () {
  const [state, setState] = useState({
    announcements: [],
    dataFetched: false
  });

  function getAnnouncements () {
    axios.get(`/api/getinfo/branvan/notifications/${(new Date()).toString()}`)
      .then(response => {
        setState({
          announcements: response.data.notifications,
          dataFetched: true
        });
      });
  }

  useEffect(() => {
    if (!state.dataFetched) {
      getAnnouncements();
    }
  });

  function createAnnouncement (data) {
    axios.post('/api/getinfo/branvan/notifications/post', data)
      .then(() => { getAnnouncements(); });
  }

  if (state.dataFetched) {
    return (
      <div>
        <div className="col m6"><AnnouncementsDisplay announcements={state.announcements} /></div>
        <div className="col m6"><AnnouncementsForm create={createAnnouncement} /></div>
      </div>
    );
  } else return (<Image alt="" src="/branda-admin-loading-gif.gif" width='280px' height='300px' />);
}
