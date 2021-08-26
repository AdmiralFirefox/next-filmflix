import React, { FC } from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  withStyles,
} from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import Image from "next/image";
import GoogleLogo from "../../../assets/login/Google.png";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";

//Input
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "0.5em",
      display: "flex",
      alignItems: "center",
      width: "min(100%, 35em)",
      background: "#333333",
      marginBottom: "1.5em",
    },
    input: {
      flex: 1,
    },
    alert: {
      color: "#f59842",
      marginTop: "-1em",
      marginBottom: "1.5em",
      alignSelf: "start",
      textAlign: "left",
    },
  })
);

//Sign In Button
const SignInButton = withStyles((theme: Theme) => ({
  root: {
    color: "#ffffff",
    backgroundColor: "#e50914",
    width: "100%",
    "&:hover": {
      backgroundColor: "hsl(357, 92%, 60%)",
    },
  },
}))(Button);

//Sign In With Google Button
const SignInWithGoogleButton = withStyles((theme: Theme) => ({
  root: {
    color: "#000",
    backgroundColor: "#ffffff",
    width: "100%",
    marginTop: "1.5em",
    "&:hover": {
      backgroundColor: "hsl(0, 0%, 80%)",
    },
  },
}))(Button);

interface ProfileUserInputProps {
  emailRef: React.RefObject<HTMLInputElement>;
  passwordRef: React.RefObject<HTMLInputElement>;
  signIn: () => Promise<void>;
  signInWithgoogle: () => Promise<void>;
}

const ProfileUserInput: FC<ProfileUserInputProps> = ({
  emailRef,
  passwordRef,
  signIn,
  signInWithgoogle,
}) => {
  const classes = useStyles();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <>
      <Paper className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Email"
          inputRef={emailRef}
          type="email"
          inputProps={{
            "aria-label": "Email",
            style: { color: "#fff", fontWeight: "bold" },
          }}
          id="email"
          aria-invalid={errors.email ? "true" : "false"}
          {...register("email", {
            required: "*required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please enter a valid email",
            },
          })}
        />
      </Paper>
      {errors.email && (
        <p role="alert" className={classes.alert}>
          {errors.email.message}
        </p>
      )}
      <Paper className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Password"
          inputRef={passwordRef}
          type="password"
          inputProps={{
            "aria-label": "Password",
            style: { color: "#fff", fontWeight: "bold" },
          }}
          id="password"
          aria-invalid={errors.passward ? "true" : "false"}
          {...register("password", {
            required: "*required",
            minLength: {
              value: 8,
              message: "Password length must be at least 8",
            },
          })}
        />
      </Paper>
      {errors.password && (
        <p role="alert" className={classes.alert}>
          {errors.password.message}
        </p>
      )}
      <SignInButton
        variant="contained"
        color="primary"
        onClick={handleSubmit(signIn)}
        type="submit"
      >
        Sign In
      </SignInButton>
      <SignInWithGoogleButton
        onClick={signInWithgoogle}
        variant="contained"
        color="primary"
        startIcon={
          <Image src={GoogleLogo} alt="Google Image" width={30} height={30} />
        }
      >
        Sign In with Google
      </SignInWithGoogleButton>
    </>
  );
};

export default ProfileUserInput;
