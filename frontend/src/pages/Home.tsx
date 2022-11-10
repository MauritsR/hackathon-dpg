import styled from "@emotion/styled";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import Business from "@mui/icons-material/Business";
import Person from "@mui/icons-material/Person";

const Video = styled.video`
  object-fit: cover;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
`;

const ICON_COLOR = "white";
const ICON_BACKGROUND_COLOR = "#078D43";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

enum UserType {
  Applicant = "applicant",
  Company = "company",
}

const Home: React.FunctionComponent = () => {
  const [userType, setUserType] = useState<UserType>();

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
      </Wrapper>
    </>
  );
};

export default Home;
