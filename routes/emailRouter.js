const nodemailer = require("nodemailer");
const router = require("express").Router();
const dotenv = require("dotenv").config();
const newEnquirySchema = require("../enquiryOfFutureEmployer/employer");

router.post("/sendEmail", async (req, res) => {
  const enquiryToBeSaved = new newEnquirySchema({
    enquiryEmailAdress: req.body.enquiryEmailAdress,
    enquiryEmailSubject: req.body.enquiryEmailSubject,
    enquiryEmailContent: req.body.enquiryEmailContent,
  });

  const newEnquiry = await enquiryToBeSaved.save((error) => {
    if (!error) {
      console.log("Information saved into the database");
    } else {
      console.log("problem conneting to the database please check settings");
    }
  });

  const { enquiryEmailAdress, enquiryEmailSubject, enquiryEmailContent } =
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
      to: process.env.ADMINEMAIL,
      subject: enquiryEmailSubject,
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

router.get("/getAllEnquiries", async (req, res) => {
  try {
    const data = await newEnquirySchema.find();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
