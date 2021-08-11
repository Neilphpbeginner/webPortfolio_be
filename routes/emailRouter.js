const nodemailer = require("nodemailer");
const router = require("express").Router();

router.post("/sendEmail", (req, res) => {
  const { enquiryEmailAdress, enquiryEnailSubject, enquiryEmailContent } =
    req.body;

  let transporter = nodemailer.createTransport({
    service: "Gmail",
    secure: true,
    auth: {
      user: process.env.ADMINEMAIL,
      pass: process.env.ADMINPASSWORD,
    },
  });

  transporter.sendMail(
    {
      from: process.env.ADMINEMAIL,
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
