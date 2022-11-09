import { Box, Container, CssBaseline } from "@mui/material";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import MatchFinder from "./pages/MatchFinder";

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
            <Link to="/match-finder">Match finder</Link>
          </li>
          <li>
            <Link to="/company-chat">Company chat</Link>
          </li>
          <li>
            <Link to="/applicant-chat">Applicant chat</Link>
          </li>
          <li>
            <Link to="/nothing-here">404</Link>
          </li>
        </ul>
      </nav>

      <hr />

      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }}>
          <Outlet />
        </Box>
      </Container>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Welcome to (insert app name here)!</h2>
    </div>
  );
}

function CompanyChat() {
  return (
    <div>
      <h2>Company chat view</h2>
    </div>
  );
}

function ApplicantChat() {
  return (
    <div>
      <h2>Applicant chat view</h2>
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
