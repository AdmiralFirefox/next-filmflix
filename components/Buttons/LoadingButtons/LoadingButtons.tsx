import { FC } from "react";
import { withStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const LoadingAuthButton = withStyles((theme: Theme) => ({
  root: {
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
  },
}))(Button);

const LoadingButtons: FC = () => {
  return (
    <>
      <LoadingAuthButton variant="contained" color="primary">
        <CircularProgress size={35} />
      </LoadingAuthButton>
    </>
  );
};

export default LoadingButtons;
