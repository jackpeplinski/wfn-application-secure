import { Button, Container, Paper } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown"
import StatusButtons from "../components/StatusButtons";
var capitalize = require('lodash.capitalize')

const Applicant = () => {
  const params = useParams()
  const applicantId = params?.applicantId;

  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_APPLICATION, {
    variables: { applicantId },
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error} ${error.message}`;
  console.log(data)
  const { fName, lName, applicationStatus, responses } = data?.getApplication;

  if (!fName || !lName || !applicationStatus || !responses)
    return "Data query issue!";
  
  return (
    <Box sx={{ margin: "5vh 0" }}>
      <Container maxWidth="md">
        <Button onClick={() => navigate(-1)} startIcon={<ArrowBackIcon/>}>Back</Button>
        <Paper elevation={3}>
          <Box sx={{ overflowWrap: "anywhere", padding: "5vh" }}>
            <h1 style={{ margin: 0 }}>
              {fName}, {lName}
            </h1>
            <StatusButtons id={applicantId}/>
            {responses.map((responses) => (
              <div>
                <h3><ReactMarkdown children={responses.question}/></h3>
                <p>{responses.answer}</p>
              </div>
            ))}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Applicant;

const GET_APPLICATION = gql`
  query GetApplication($applicantId: ID!) {
    getApplication(applicantId: $applicantId) {
      fName
      lName
      applicationStatus
      responses {
        question
        answer
      }
    }
  }
`;
