import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container
} from "@mui/material";
import { useQuery, gql } from "@apollo/client";
import StatusButtons from "./StatusButtons";

const ApplicantTable = () => {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  /**
   * @todo
   * - replace row headers with data title?
   * - FOR ALL FILES, replace mui imports where possible with "@mui/material"
   */
  return (
    <Container maxWidth="md">
      <TableContainer component={Paper} elevation={5}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.getApplicants.map(
              ({ id, fName, lName }) => (
                <TableRow
                  hover
                  key={id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="a"
                    href={`/applicant/${id}`}
                    scope="row"
                  >
                    {fName}
                  </TableCell>
                  <TableCell
                    component="a"
                    href={`/applicant/${id}`}
                    scope="row"
                  >
                    {lName}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <StatusButtons id={id} />
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default ApplicantTable;

const EXCHANGE_RATES = gql`
  query GetApplicants {
    getApplicants {
      id
      fName
      lName
      applicationStatus
    }
  }
`;
