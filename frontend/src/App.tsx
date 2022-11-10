import { Box, Container, CssBaseline } from "@mui/material";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import MatchFinder from "./pages/MatchFinder";
import ApplicantChat from "./pages/ApplicantChat";
import CompanyChat from "./pages/CompanyChat";
import Home from "./pages/Home";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="match-finder" element={<MatchFinder />} />
          <Route path="company-chat" element={<CompanyChat />} />
          <Route path="applicant-chat" element={<ApplicantChat />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div>
      <CssBaseline />
      <Container sx={{ p: 0 }} maxWidth="sm">
        <Box sx={{ height: "100vh" }}>
          <Outlet />
        </Box>
      </Container>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
