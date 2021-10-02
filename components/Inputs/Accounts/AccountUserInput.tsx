import React, { FC, useRef } from "react";
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
import LoadingButtons from "../../Buttons/LoadingButtons/LoadingButtons";

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
    padding: "0.7em",
    "&:hover": {
      backgroundColor: "hsl(357, 92%, 60%)",
    },
  },
}))(Button);

interface AccountUserInputProps {
  emailRef: React.RefObject<HTMLInputElement>;
  passwordRef: React.RefObject<HTMLInputElement>;
  createAccount: () => Promise<void>;
  authLoading: boolean;
}

const AccountUserInput: FC<AccountUserInputProps> = ({
  emailRef,
  passwordRef,
  createAccount,
  authLoading,
}) => {
  const classes = useStyles();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  //Watching if both passwords entered are the same
  const password = useRef({});
  password.current = watch("password", "");

  return (
    <>
      <Paper className={classes.root}>
        <InputBase
          className={classes.input}
          inputRef={emailRef}
          inputProps={{
            "aria-label": "Email",
            style: { color: "#fff", fontWeight: "bold" },
          }}
          type="email"
          id="email"
          aria-invalid={errors.email ? "true" : "false"}
          {...register("email", {
            required: "*required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please enter a valid email",
            },
          })}
          placeholder="Email"
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
          inputRef={passwordRef}
          inputProps={{
            "aria-label": "Password",
            style: { color: "#fff", fontWeight: "bold" },
          }}
          type="password"
          id="password"
          aria-invalid={errors.passward ? "true" : "false"}
          {...register("password", {
            required: "*required",
            minLength: {
              value: 8,
              message: "Password length must be at least 8",
            },
          })}
          placeholder="Password"
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
          inputProps={{
            "aria-label": "Password",
            style: { color: "#fff", fontWeight: "bold" },
          }}
          type="password"
          id="confirmPassword"
          aria-invalid={errors.confirmPassword ? "true" : "false"}
          {...register("confirmPassword", {
            required: "Please re-enter your password",
            validate: (value) =>
              value === password.current || "The passwords do not match",
          })}
          placeholder="Confirm Password"
        />
      </Paper>
      {errors.confirmPassword && (
        <p role="alert" className={classes.alert}>
          {errors.confirmPassword.message}
        </p>
      )}
      {authLoading ? (
        <>
          <LoadingButtons />
        </>
      ) : (
        <CreateAccount
          variant="contained"
          color="primary"
          onClick={handleSubmit(createAccount)}
          type="button"
        >
          Create Account
        </CreateAccount>
      )}
    </>
  );
};

export default AccountUserInput;
