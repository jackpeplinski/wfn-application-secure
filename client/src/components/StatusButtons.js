import React, { useEffect, useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Paper } from "@mui/material"
import { gql, useMutation, useQuery } from "@apollo/client";
import { Snackbar } from "@mui/material";

/**
 * @todo
 * - add this solution to stackoverflow
 */
const StatusButtons = (props) => {
  const [
    changeStatus,
    {
      loading: changeStatusLoading,
      error: changeStatusError,
      data: changeStatusData,
    },
  ] = useMutation(CHANGE_STATUS);

  const applicantId = props.id;
  const {
    loading: getStatusLoading,
    error: getStatusError,
    data,
  } = useQuery(GET_STATUS, {
    variables: { applicantId },
  });
  useEffect(() => {
    setStatus(data?.getStatus);
  }, [data]);

  const [snackBar, setSnackBar] = useState(false);
  const [status, setStatus] = useState("inReview");
  const handleStatus = (event, newStatus) => {
    setStatus(newStatus);
    changeStatus({
      variables: { applicantId: applicantId, newStatus: newStatus },
    });
    setSnackBar(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBar(false);
  };

  if (changeStatusLoading) return "Changing status...";
  if (changeStatusError)
    return `Changing status error: ${changeStatusError.message}`;
  if (getStatusLoading) return "Getting status...";
  if (getStatusError) return `Getting status error: ${getStatusError.message}`;

  return (
    <React.Fragment>
      <ToggleButtonGroup
        value={status}
        exclusive
        onChange={handleStatus}
        aria-label="application status"
      >
        <ToggleButton value="accept" aria-label="left aligned">
          Accept
        </ToggleButton>
        <ToggleButton value="decline" aria-label="centered">
          Decline
        </ToggleButton>
        <ToggleButton value="review" aria-label="right aligned">
          In-Review
        </ToggleButton>
      </ToggleButtonGroup>
      <Snackbar open={snackBar} autoHideDuration={2000} onClose={handleClose} message="Status changed"/>
    </React.Fragment>
  );
};

export default StatusButtons;

const CHANGE_STATUS = gql`
  mutation Mutation($applicantId: ID!, $newStatus: String!) {
    changeStatus(applicantId: $applicantId, newStatus: $newStatus)
  }
`;

const GET_STATUS = gql`
  query GetStatus($applicantId: ID!) {
    getStatus(applicantId: $applicantId)
  }
`;
