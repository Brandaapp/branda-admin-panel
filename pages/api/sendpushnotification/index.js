import dbConnect from "../../../utils/dbConnect";
let Organization = require("../../../models/Organization");

const axios = require("axios");

dbConnect();

export default (req, res) => {
  // here we are checking the lngths of the notifcation body request
  console.log(req.body.httpLink);
  let myArrayOfData = [];

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
          deliveredSuccessfully: true,
        },
      },
      $inc: { messageNumber: 1 }, // incerement the number of messages by 1
    }
  )
    .then((organizationModel) => {
      // then we get the organization back as an object
      myArrayOfData = organizationModel.members;

      return organizationModel;
    })
    .catch((err) => {})
    .then((organizationModel) => {
      // here is where we are checking if the organization still is allowed to send notifications

      const maxMessagesAllowed = organizationModel.maxMessagesAllowed;
      const messageNumber = organizationModel.messageNumber;

      // test that only if max messages is > message sent .. it will send to people
      // var mainObject = {},
      if (messageNumber < maxMessagesAllowed) {
        /// if they can send a notification, then send it
        let headers = {
          Accept: "application/json",
          "Content-Type": "application/json",
        };

        // to get link to open correctly, had to log out and then log in again on expo launched version of app

        let promises = [];
        myArrayOfData.forEach(function (singleElement, index) {
          //console.log(index);
          let userNumber = singleElement;
          let data = {
            to: userNumber,
            data: {
              link: req.body.httpLink,
            },
            title: req.body.title,
            body: req.body.message,
          };
          console.log("Data to be sent: " + JSON.stringify(data));

          promises.push(
            axios.post("https://exp.host/--/api/v2/push/send", data, {
              headers: headers,
            })
          );
        });

        Promise.all(promises).then(function (results) {
          results.forEach(function (response) {
            //mainObject[response.identifier] = response.value;
            console.log(response.status);
            if (response.status !== 200) {
              // res.status(500).send("Oop - error sending push notification");
              console.log("error");
            }
          });
          res.status(200).redirect("/"); // sending OK response
        });
      } else {
        // otherwise send a response saying \/
        res.json({
          message: "YOU HAVE EXCEEDED THE MAX NUMBER OF MESSAGES ALLOWED ",
        });
      }
    });
};
