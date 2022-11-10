import { Box, Container, CssBaseline } from "@mui/material";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import MatchFinder from "./pages/MatchFinder";
import * as routes from "./constants/routes";
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
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to={routes.matchFinder}>Match finder</Link>
          </li>
          <li>
            <Link to="/company-chat">Company chat</Link>
          </li>
        </ul>
      </nav>

      <hr />

      <CssBaseline />
      <Container maxWidth="sm">
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
