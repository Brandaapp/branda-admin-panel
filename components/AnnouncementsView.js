import { useState, useEffect } from 'react';
import AnnouncementsDisplay from './AnnouncementsDisplay';
import AnnouncementsForm from './AnnouncementsForm';
import axios from 'axios';
import LoadingLogo from './shared/LoadingLogo.js';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Dialog from '@mui/material/Dialog';

export default function AnnouncementsView () {
  const [state, setState] = useState({
    announcements: [],
    dataFetched: false
  });
  const [openEditor, setOpenEditor] = useState(false);

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

  const handleOpenEditor = () => {
    setOpenEditor(true);
  };

  const handleCloseEditor = () => {
    setOpenEditor(false);
  };

  function createAnnouncement (data) {
    axios.post('/api/getinfo/branvan/notifications/post', data)
      .then(() => { getAnnouncements(); });
  }

  if (state.dataFetched) {
    return (
      <div>
        <AnnouncementsDisplay announcements={state.announcements}/>
        <Dialog open={openEditor} onClose={handleCloseEditor}>
          <AnnouncementsForm create={createAnnouncement} handleClose={handleCloseEditor}/>
        </Dialog>
        <Fab
        // the botton on the lower right corner
        // position: 'fixed' sticks it to the corner
          color='primary'
          aria-label='add'
          style={{ position: 'fixed', right: 50, bottom: 50 }}
          onClick={handleOpenEditor}
        >
          <AddIcon />
        </Fab>
      </div>
    );
  } else {
    return (
      <LoadingLogo />
    );
  }
}
