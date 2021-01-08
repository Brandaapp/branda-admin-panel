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

  const [sending, setSending] = useState(false);

  useEffect(() => {
    axios.get(`/api/brandeisClubs`).then((response) => {
      setState((prev) => ({ ...prev, clubData: response.data }));
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

  function isValidHttpUrl(str) {
    let pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator

    let url;

    try {
      url = new URL(str);
    } catch (_) {
      return false;
    }

    return (
      (url.protocol === "http:" || url.protocol === "https:") &&
      !!pattern.test(str)
    );
  }

  async function submitForm() {

    setSending(true);

    let data = {
      title: state.title,
      message: state.message,
      httpLink: state.link,
      organization_name: state.club,
    };

    await axios.patch(`/api/sendpushnotification`, data).then((response) => {
      // keep an eye on missing notifications (maybe based on phone type or expo problem => what screen is open)
      console.log(response);
      Materialize.toast(
        "Push notification send to: " + state.club,
        2500,
        "#0d47a1 blue darken-4 rounded"
      );
      setSending(false);
    });
  }

  function validate() {
    return (
      !state.validLink ||
      state.message.length < 5 ||
      state.title.length < 3 ||
      state.club === "" ||
      sending
    );
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
            // border: "1px solid black"
          }}
        >
          <TextField
            id="title"
            label="Title"
            variant="filled"
            required
            error={state.title.length < 3}
            onChange={titleChange}
            style={{ width: "90%" }}
            helperText={`Between 3 and 140 characters (${
              state.title.length
            }/${140})`}
            inputProps={{ maxLength: 140 }}
          />

          <TextField
            error={state.message.length < 5}
            id="message"
            label="Message"
            variant="filled"
            required
            onChange={messageChange}
            multiline={true}
            rows={4}
            helperText={"More than 5 characters"}
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
            width: "80%",
            display: "flex",
            justifyContent: "center",
            paddingBottom: "20px",
            // border: "1px solid black"
          }}
        >
          <Button
            onClick={submitForm.bind(this)}
            disabled={validate()}
            style={{
              backgroundColor: validate() ? "#5482B6" : "#1B4370",
              color: "white",
              width: "200px",
              height: "150%",
              borderRadius: "15px",
            }}
            type="submit"
          >
            {sending ? "Sending..." : "Send"}
          </Button>
        </div>
      </div>
    );
  }
}
