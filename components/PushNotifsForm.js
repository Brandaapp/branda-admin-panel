import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useEffect, useState } from "react";

const axios = require("axios");

export default function PushNotifsForm(props) {
  const [state, setState] = useState({
    title: "",
    message: "",
    link: "",
    club: "",
    clubData: null,
    validLink: true,
  });

  useEffect(() => {
    axios.get(`/api/brandeisClubs/Approved`).then((response) => {
      console.log(response);
      let data = [];
      response.data.forEach((club) => {
        if (club.name) {
          data.push({ name: club.name });
        }
      });

      setState((prev) => ({ ...prev, clubData: data }));
    });
  }, []);

  function titleChange(event) {
    setState((prev) => ({ ...prev, title: event.target.value }));
  }

  function messageChange(event) {
    setState((prev) => ({ ...prev, message: event.target.value }));
  }

  function linkChange(event) {
    var userLink = event.target.value;
    var valid = userLink === "" || isValidHttpUrl(userLink);
    setState((prev) => ({ ...prev, link: userLink, validLink: valid }));
  }

  function clubChange(event) {
    var name = event ? event.name : "";
    setState((prev) => ({ ...prev, club: name }));
  }

  function isValidHttpUrl(string) {
    let url;

    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }

  function submitForm() {
    console.log(state.title);
    console.log(state.message);
    console.log(state.link);
    console.log(state.club);
  }

  function validate() {
      return !state.validLink || state.message === "" || state.title === "";
  }

  if (!state.clubData) {
    return (
      <img src="/branda-admin-loading-gif.gif" style={{ width: "280px" }} />
    );
  } else {
    return (
      <div className="pushnotif-form">
        <h4 style={{ color: "#1B4370" }}>Send Push Notification</h4>
        <div
          style={{
            width: "90%",
            height: "60%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextField
            id="title"
            label="Title"
            variant="filled"
            required
            error={false}
            onChange={titleChange}
            style={{ width: "90%" }}
            helperText={`Up to 140 characters (${state.title.length}/${140})`}
            inputProps={{ maxLength: 140 }}
          />

          <TextField
            id="message"
            label="Message"
            variant="filled"
            required
            onChange={messageChange}
            multiline={true}
            rows={4}
            style={{ width: "90%" }}
          />

          <TextField
            id="link"
            label="Link"
            variant="filled"
            onChange={linkChange}
            error={!state.validLink}
            style={{ width: "90%" }}
            helperText={
              "Please enter a valid HTTPS link (if you want to include a link)"
            }
          />

          <Autocomplete
            id={"club-dropdown"}
            options={state.clubData}
            getOptionLabel={(option) => option.name}
            style={{ width: "90%" }}
            renderInput={(params) => (
              <TextField {...params} label="Club" variant="outlined" />
            )}
            onChange={(event, value) => clubChange(value)}
            getOptionSelected={(option, value) => option.name === value.name}
          />
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            paddingBottom: "20px",
          }}
        >
          <Button
            onClick={submitForm}
            disabled={validate()}
            style={{
              backgroundColor: "#1B4370",
              color: "white",
              width: "200px",
              height: "150%",
              borderRadius: "15px",
            }}
          >
            send
          </Button>
        </div>
      </div>
    );
  }
}
