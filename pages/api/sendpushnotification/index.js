import dbConnect from '../../../utils/dbConnect';
let Organization = require('../../../models/Organization');

dbConnect();

export default (req, res) => {
    // here we are checking the lngths of the notifcation body request
    console.log("Got here - check for router- notifications")
    if (req.body.title.length < 3) {
        res.json({
            error: true,
            message: "TITLE MUST BE MORE THAN 3 CHARACTERS "
        });
    } else if (req.body.message.length < 5) {
        res.json({
            error: true,
            message: "MESSAGE SHOULD BE MORE THAN 5 CHARACTERS "
        });
    } else if (req.body.organization_name === undefined || req.body.organization_name === null) {
        res.json({
            error: true,
            message: "MUST CHOOSE A CLUB TO SEND NOTIFICATION TO"
        });
    } else {
        let myArrayOfData = [];
        let organization;
        let date = new Date();

        Organization.findOneAndUpdate(
            // we then want to go into thee DB and find the organization by name
            // should find the specific organization by name

            { name: req.body.organization_name },
            {
                $addToSet: {
                    // we want to add to the array
                    messagesSent: {
                        title: req.body.title,
                        message: req.body.message,
                        link: req.body.httpLink,
                        deliveredSuccessfully: true
                    }
                },
                $inc: { messageNumber: 1 }, // incerement the number of messages by 1
            }
        )
            .then(organizationModel => {
                // then we get the organization back as an object
                console.log("myarray", organizationModel);
                myArrayOfData = organizationModel.members;
                organization = organizationModel;

                return organizationModel;
            })
            .catch(err => {
                console.log("THERE IS AN ERROR ");
                console.log(
                    "THERE WAS AN ERROR TRYING TO GET THE ORGANIZATION FOR UPDATE PUSH NOTIFICATION",
                    err
                );
            })
            .then(organizationModel => {
                // here is where we are checking if the organization still is allowed to send notifications

                const maxMessagesAllowed = organizationModel.maxMessagesAllowed;
                const messageNumber = organizationModel.messageNumber;

                // test that only if max messages is > message sent .. it will send to people
                // var mainObject = {},
                if (messageNumber < maxMessagesAllowed) {
                    /// if they can send a notification, then send it
                    let headers = {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    };

                    let promises = [];
                    myArrayOfData.forEach(function (singleElement, index) {
                        //console.log(index);
                        let userNumber = singleElement;
                        let data = {
                            "to": userNumber,
                            "data": {
                                "link": req.body.httpLink
                            },
                            "title": req.body.title,
                            "body": req.body.message,
                        };
                        console.log("Data to be sent: " + JSON.stringify(data));

                        promises.push(
                            axios.post("https://exp.host/--/api/v2/push/send", data, {
                                headers: headers
                            })
                        );
                    });

                    Promise.all(promises).then(function (results) {
                        results.forEach(function (response) {
                            //mainObject[response.identifier] = response.value;
                            console.log("response is ", response.status);
                        });
                        res.status(200).redirect("/"); // sending OK response
                    });
                } else {
                    // otherwise send a response saying \/
                    res.json({ message: "YOU HAVE EXCEEDED THE MAX NUMBER OF MESSAGES ALLOWED " });
                }
            });
    }
}