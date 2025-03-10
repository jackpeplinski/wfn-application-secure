const Applicant = require("../../models/Applicant");

module.exports = {
  Query: {
    async getApplicants() {
      try {
        const applicants = await Applicant.find();
        return applicants;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getStatus(_, { applicantId }) {
      const applicant = await Applicant.findById(applicantId);

      if (applicant) {
        return applicant.applicationStatus;
      } else {
        throw new Error(err);
      }
    },
    async getApplication(_, {applicantId}) {
      const applicant = await Applicant.findById(applicantId)

      if(applicant) {
        return applicant;
      } else {
        throw new Error(err)
      }
    }
  },
  Mutation: {
    async changeStatus(_, { applicantId, newStatus }) {
      const applicant = await Applicant.findById(applicantId);

      if (applicant) {
        applicant.applicationStatus = newStatus;
        await applicant.save();
        return `Applicant status changed to ${newStatus}.`;
      } else {
        throw new Error(`Changing status failed. ${error}`);
      }
    },
  },
};
