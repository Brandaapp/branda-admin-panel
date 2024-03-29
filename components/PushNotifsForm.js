import { Autocomplete, TextField, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { isValidHttpUrl } from '../utils/httpUtils';
import Image from 'next/image';
import axios from 'axios';

let M;
if (typeof window !== 'undefined') {
  M = require('materialize-css');
}

export default function PushNotifsForm (props) {
  const [state, setState] = useState({
    title: '',
    message: '',
    link: '',
    club: '',
    clubData: null,
    validLink: true
  });

  const [sending, setSending] = useState(false);

  useEffect(() => {
    axios.get(`/api/brandeisclubs`).then((response) => {
      setState((prev) => ({ ...prev, clubData: response.data }));
    });
  }, []);

  function linkChange (event) {
    const userLink = event.target.value;
    const valid = !userLink || isValidHttpUrl(userLink);
    setState((prev) => ({ ...prev, link: userLink, validLink: valid }));
  }

  function clubChange (event) {
    const name = event ? event.name : '';
    setState((prev) => ({ ...prev, club: name }));
  }

  const submitForm = async () => {
    setSending(true);

    const data = {
      title: state.title,
      message: state.message,
      httpLink: state.link,
      organization_name: state.club
    };

    await axios.patch(`/api/sendpushnotification`, data).then((response) => {
      // keep an eye on missing notifications (maybe based on phone type or expo problem => what screen is open)
      M.toast({
        html: 'Push notification sent to: ' + state.club,
        displayLength: 2500,
        class: '#0d47a1 blue darken-4 rounded'
      });
      setSending(false);
    });
  };

  function validate () {
    return (
      !state.validLink ||
      state.message.length < 5 ||
      state.title.length < 3 ||
      state.club === '' ||
      sending
    );
  }

  if (!state.clubData) {
    return (
      <Image alt='' src="/branda-admin-loading-gif.gif" width={280} height={280} />
    );
  } else {
    return (
      <div className="pushnotif-form">
        <div>
          <h4 style={{ color: '#1B4370' }}>
            Send Push Notification
          </h4>
        </div>
        <div className="pushnotif-inputs">
          <TextField
            id="title"
            label="Title"
            variant="outlined"
            type="text"
            required
            error={state.title !== '' && state.title.length < 3}
            onChange={(event) => setState((prev) => ({ ...prev, title: event.target.value }))}
            style={{ width: '90%' }}
            helperText={`Between 3 and 140 characters (${
              state.title.length
            }/${140})`}
            inputProps={{ maxLength: 140 }}
          />

          <TextField
            error={state.message !== '' && state.message.length < 5}
            id="message"
            label="Message"
            variant="outlined"
            type="text"
            required
            onChange={(event) => setState((prev) => ({ ...prev, message: event.target.value }))}
            multiline
            rows={4}
            helperText={'More than 5 characters'}
            style={{ width: '90%' }}
          />

          <TextField
            id="link"
            placeholder="Link"
            variant="outlined"
            type="text"
            onChange={linkChange}
            error={!state.validLink}
            style={{ width: '90%' }}
            helperText={
              'Please enter a valid HTTPS link (if you want to include a link)'
            }
          />

          <Autocomplete
            id={'club-dropdown'}
            options={state.clubData}
            getOptionLabel={(option) => option.name}
            style={{ width: '90%' }}
            renderInput={(params) => (
              <TextField {...params} label="Club" variant="outlined" />
            )}
            onChange={(event, value) => clubChange(value)}
            getOptionSelected={(option, value) => option.name === value.name}
          />
        </div>
        <div>
          <Button
            onClick={submitForm}
            disabled={validate()}
            style={{
              backgroundColor: validate() ? '#5482B6' : '#1B4370',
              color: 'white',
              width: '200px',
              borderRadius: '5px'
            }}
            type="submit"
          >
            {sending ? 'Sending...' : 'Send'}
          </Button>
        </div>
      </div>
    );
  }
}
