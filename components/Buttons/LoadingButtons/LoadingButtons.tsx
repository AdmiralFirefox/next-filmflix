import { FC } from "react";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingAuthButton = styled(Button)<ButtonProps>(() => ({
  color: "#ffffff",
  backgroundColor: "#303030",
  width: "100%",
  marginBottom: "1em",
  padding: "0.7em",
  border: "2.5px solid #e50914",
  "&:hover": {
    backgroundColor: "#303030",
    cursor: "context-menu",
  },
}));

const LoadingButtons: FC = () => {
  return (
    <>
      <LoadingAuthButton variant="contained">
        <CircularProgress size={35} />
      </LoadingAuthButton>
    </>
  );
};

export default LoadingButtons;
