const mongoose = require("mongoose");
employerEnquirySchema = new mongoose.Schema({
  enquiryEmailAdress: String,
  enquiryEmailSubject: String,
  enquiryEmailContent: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("futureemployers", employerEnquirySchema);
