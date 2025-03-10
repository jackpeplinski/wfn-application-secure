const applicantResolver = require('./applicant')

module.exports = {
    Query: {
        ...applicantResolver.Query
    },
    Mutation: {
        ...applicantResolver.Mutation
    }
}