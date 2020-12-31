import { red } from '@material-ui/core/colors';
import { useState, useEffect } from "react";
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

export default function PushNotifsForm(props) {
    const [state, setState] = useState({
        title: "",
        message: "",
        link: "",
        validLink: true,
    });

    function titleChange (event) {
        setState((prev) => ({...prev, title: event.target.value}))
    }

    function messageChange (event) {
        setState((prev) => ({...prev, message: event.target.value}))
    } 

    function linkChange (event) {
        var userLink = event.target.value
        var valid = userLink === "" || validURL(userLink)
        setState((prev) => ({...prev, link: userLink, validLink: valid}))
    }

    function validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
          '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
      }
    
    function checkButton() {
        console.log(state.title);
        console.log(state.message);
        console.log(state.link);
    }

    return (

        <div>
            <h5>Send Notifications</h5>
            <form style={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                <TextField id="filled-basic" label="Title" variant="filled" required error={false} onChange={titleChange}/>

                <TextField id="filled-basic" label="Message" variant="filled" required onChange={messageChange}/>

                <TextField id="filled-basic" label="Link" variant="filled" required onChange={linkChange} error= {!state.validLink}/>
                
                <Button onClick= {checkButton} disabled= {!state.validLink}>check</Button>

            </form>
        </div>


    )




}