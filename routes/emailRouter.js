const nodemailer = require("nodemailer");
const router = require("express").Router();
const dotenv = require("dotenv").config();

router.post("/sendEmail", (req, res) => {
  const { enquiryEmailAdress, enquiryEnailSubject, enquiryEmailContent } =
    req.body;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: process.env.ADMINEMAIL,
      clientId: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
      refreshToken: process.env.REFRESHTOKEN,
      accessToken: process.env.ACCESSTOKEN,
      expires: 3599,
    },
  });

  transporter.sendMail(
    {
      from: enquiryEmailAdress,
      to: "lemmer.neil@gmail.com",
      subject: enquiryEnailSubject,
      html: `
      Hi Neil you recieved an enquiry from ${enquiryEmailAdress}. \n
      And the details of the enquiry is. \n
      <h2>${enquiryEmailContent}</h2>`,
      // auth: {
      //   user: process.env.ADMINEMAIL,
      //   refreshToken:
      //     "1//04zYwjrTBD7MTCgYIARAAGAQSNwF-L9Irc8Q3WYdKMIIcPZZKE6FOsvSeFbtZx2fgm0ndYwbRkdQZXNs0cwwL_Hq6f7xWaLfu84M",
      //   accessToken:
      //     "ya29.A0ARrdaM_aRKLGbxOBCc6gks4WWLoQqFezR-9F4KyfhZtRRr0dPOkEbQU71EpQs-5m6qNQHSyfSCNnSPhWX2YfpcE1ZGa0gQQhShpik7IEKFjag2QRtysKTpOz5_IixSc7Cwud3Z2hgytquy_driX0M5P2W5hl",
      //   expires: 3599,
      // },
    },
    (error, info) => {
      if (error) {
        res.send(error);
      } else {
        res.status(200).send(info);
      }
    }
  );
});

module.exports = router;
