const { model, Schema } = require("mongoose");

const applicantSchema = new Schema({
  fName: String,
  lName: String,
  email: String,
  applicationStatus: String,
  responses: [
    {
      question: String,
      answer: String,
    },
  ],
});

module.exports = model("Applicant", applicantSchema);
