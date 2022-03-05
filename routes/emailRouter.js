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
