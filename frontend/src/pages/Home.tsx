import styled from "@emotion/styled";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import Business from "@mui/icons-material/Business";
import Person from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { companyChat, matchFinder } from "../constants/routes";
import Stack from "@mui/material/Stack";

const Video = styled.video`
  object-fit: cover;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
`;

const SECONDARY_COLOR = "#5d44db";
const PRIMARY_COLOR = "#c2db44";
const SMALL_TEXT_COLOR = "#5d44db";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  background: linear-gradient(${PRIMARY_COLOR}, #ffffff);
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
            sx={{
              zIndex: 1,
              color: SMALL_TEXT_COLOR,
              textAlign: "center",
              fontWeight: 500,
              width: "100%",
              position: "absolute",
              top: 0,
              p: 2,
              backgroundColor: PRIMARY_COLOR,
            }}
            variant="h4"
            gutterBottom
          >
            <b>Looking for (a) company?</b>
          </Typography>
        )}
        {userType === UserType.Company && (
          <Typography
            sx={{
              zIndex: 1,
              color: SMALL_TEXT_COLOR,
              textAlign: "center",
              fontWeight: 500,
              width: "100%",
              position: "absolute",
              top: 0,
              p: 2,
              backgroundColor: PRIMARY_COLOR,
            }}
            variant="h4"
            gutterBottom
          >
            <b>Looking for talents?</b>
          </Typography>
        )}
        {userType === undefined && (
          <Typography
            sx={{
              zIndex: 1,
              color: SECONDARY_COLOR,
              textStroke: "1px black",
              fontWeight: 500,
            }}
            variant="h2"
            gutterBottom
          >
            Chit Chat GO!
          </Typography>
        )}

        <Stack direction="row">
          {userType === UserType.Applicant && (
            <IconButton
              sx={{
                backgroundColor: PRIMARY_COLOR,
                ":hover": {
                  backgroundColor: PRIMARY_COLOR,
                },
                color: SECONDARY_COLOR,
                height: "100px",
                width: "100px",
                m: 4,
              }}
              size="large"
              aria-label="add to shopping cart"
              onClick={() => navigate(matchFinder)}
            >
              <Typography variant="h4" sx={{ fontWeight: 500 }}>
                GO!
              </Typography>
            </IconButton>
          )}
          {userType !== UserType.Applicant && (
            <IconButton
              sx={{
                backgroundColor: PRIMARY_COLOR,
                ":hover": {
                  backgroundColor: PRIMARY_COLOR,
                },
                color: SECONDARY_COLOR,
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
                  backgroundColor: PRIMARY_COLOR,
                  height: "50px",
                  width: "50px",
                }}
              />
            </IconButton>
          )}

          {userType !== UserType.Company && (
            <IconButton
              sx={{
                backgroundColor: PRIMARY_COLOR,
                ":hover": {
                  backgroundColor: PRIMARY_COLOR,
                },
                color: SECONDARY_COLOR,
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
                  backgroundColor: PRIMARY_COLOR,
                  height: "50px",
                  width: "50px",
                }}
              />
            </IconButton>
          )}
          {userType === UserType.Company && (
            <IconButton
              sx={{
                backgroundColor: PRIMARY_COLOR,
                ":hover": {
                  backgroundColor: PRIMARY_COLOR,
                },
                color: SECONDARY_COLOR,
                height: "100px",
                width: "100px",
                m: 4,
              }}
              size="large"
              aria-label="add to shopping cart"
              onClick={() => navigate(companyChat)}
            >
              <Typography variant="h4" sx={{ fontWeight: 500 }}>
                GO!
              </Typography>
            </IconButton>
          )}
        </Stack>
      </Wrapper>
    </>
  );
};

export default Home;
