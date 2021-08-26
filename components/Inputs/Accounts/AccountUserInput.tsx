import React, { FC } from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  withStyles,
} from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";

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

//Create Account Button
const CreateAccount = withStyles((theme: Theme) => ({
  root: {
    color: "#ffffff",
    backgroundColor: "#e50914",
    width: "100%",
    "&:hover": {
      backgroundColor: "hsl(357, 92%, 60%)",
    },
  },
}))(Button);

interface AccountUserInputProps {
  emailRef: React.RefObject<HTMLInputElement>;
  passwordRef: React.RefObject<HTMLInputElement>;
  confirmPasswordRef: React.RefObject<HTMLInputElement>;
  createAccount: () => Promise<void>;
}

const AccountUserInput: FC<AccountUserInputProps> = ({
  emailRef,
  passwordRef,
  confirmPasswordRef,
  createAccount,
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
      <Paper className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Confirm Password"
          inputRef={confirmPasswordRef}
          type="password"
          inputProps={{
            "aria-label": "Password",
            style: { color: "#fff", fontWeight: "bold" },
          }}
        />
      </Paper>
      <CreateAccount
        variant="contained"
        color="primary"
        onClick={handleSubmit(createAccount)}
        type="button"
      >
        Create Account
      </CreateAccount>
    </>
  );
};

export default AccountUserInput;
