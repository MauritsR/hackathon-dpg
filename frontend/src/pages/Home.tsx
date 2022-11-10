import styled from "@emotion/styled";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import Business from "@mui/icons-material/Business";
import Person from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { companyChat, matchFinder } from "../constants/routes";

const Video = styled.video`
  object-fit: cover;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
`;

const ICON_COLOR = "white";
const ICON_BACKGROUND_COLOR = "#e66465";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  background: linear-gradient(#e66465, #9198e5);
`;

enum UserType {
  Applicant = "applicant",
  Company = "company",
}

const Home: React.FunctionComponent = () => {
  const [userType, setUserType] = useState<UserType>();
  const navigate = useNavigate();

  return (
    <>
      <Wrapper>
        {userType === UserType.Applicant && (
          <Video autoPlay muted>
            <source src="/videos/happy-applicant.mp4" type="video/mp4" />
          </Video>
        )}
        {userType === UserType.Company && (
          <Video autoPlay muted>
            <source src="/videos/company-building.mp4" type="video/mp4" />
          </Video>
        )}
        {userType === UserType.Applicant && (
          <Typography
            sx={{ zIndex: 1, color: "white" }}
            variant="h5"
            gutterBottom
          >
            <b>Looking for (a) company?</b>
          </Typography>
        )}
        {userType === UserType.Company && (
          <Typography
            sx={{ zIndex: 1, color: "white" }}
            variant="h5"
            gutterBottom
          >
            <b>Looking for talents?</b>
          </Typography>
        )}
        {userType === undefined && (
          <Typography variant="h2" gutterBottom>
            Job Chit Chat
          </Typography>
        )}
        {userType === UserType.Applicant && (
          <IconButton
            sx={{
              backgroundColor: ICON_BACKGROUND_COLOR,
              ":hover": {
                backgroundColor: ICON_BACKGROUND_COLOR,
              },
              color: ICON_COLOR,
              height: "100px",
              width: "100px",
              m: 4,
            }}
            size="large"
            aria-label="add to shopping cart"
            onClick={() => navigate(matchFinder)}
          >
            GO!
          </IconButton>
        )}
        {userType !== UserType.Applicant && (
          <IconButton
            sx={{
              backgroundColor: ICON_BACKGROUND_COLOR,
              ":hover": {
                backgroundColor: ICON_BACKGROUND_COLOR,
              },
              color: ICON_COLOR,
              height: "100px",
              width: "100px",
              m: 4,
            }}
            size="large"
            aria-label="add to shopping cart"
            onClick={() => setUserType(UserType.Applicant)}
          >
            <Person
              sx={{
                backgroundColor: ICON_BACKGROUND_COLOR,
                height: "50px",
                width: "50px",
              }}
            />
          </IconButton>
        )}

        {userType !== UserType.Company && (
          <IconButton
            sx={{
              backgroundColor: ICON_BACKGROUND_COLOR,
              ":hover": {
                backgroundColor: ICON_BACKGROUND_COLOR,
              },
              color: ICON_COLOR,
              height: "100px",
              width: "100px",
              m: 4,
            }}
            size="large"
            aria-label="add to shopping cart"
            onClick={() => setUserType(UserType.Company)}
          >
            <Business
              sx={{
                backgroundColor: ICON_BACKGROUND_COLOR,
                height: "50px",
                width: "50px",
              }}
            />
          </IconButton>
        )}
        {userType === UserType.Company && (
          <IconButton
            sx={{
              backgroundColor: ICON_BACKGROUND_COLOR,
              ":hover": {
                backgroundColor: ICON_BACKGROUND_COLOR,
              },
              color: ICON_COLOR,
              height: "100px",
              width: "100px",
              m: 4,
            }}
            size="large"
            aria-label="add to shopping cart"
            onClick={() => navigate(companyChat)}
          >
            GO!
          </IconButton>
        )}
      </Wrapper>
    </>
  );
};

export default Home;
