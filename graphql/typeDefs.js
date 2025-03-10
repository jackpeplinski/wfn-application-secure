const { gql } = require("apollo-server");

module.exports = gql`
  type Applicant {
    id: ID!
    fName: String!
    lName: String!
    applicationStatus: String!
    responses: [Response]!
  }

  type Response {
    question: String!
    answer: String
  }

  type Query {
    getApplicants: [Applicant]
    getApplication(applicantId: ID!): Applicant
    getStatus(applicantId: ID!): String!
  }

  type Mutation {
    changeStatus(applicantId: ID!, newStatus: String!): String!
  }
`;
