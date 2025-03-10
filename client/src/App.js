import React from "react";
import ApplicantTable from "./components/ApplicantTable";
import Applicant from "./pages/Applicant";
import { Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import BackToTop from "./components/BackToTop";
import "./index";

const theme = createTheme({
  palette: {
    primary: {
      main: "#333333",
    },
  },
  typography: {
    fontFamily: ["Archivo", "Roboto", "sans-serif"].join(","),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BackToTop />
      <Routes>
        <Route exact path="/" element={<ApplicantTable />} />
        <Route exact path="applicant/:applicantId" element={<Applicant />} />
        {/* <Route path="*" element={<NotFound/>}/> */}
      </Routes>
    </ThemeProvider>
  );
}

export default App;
