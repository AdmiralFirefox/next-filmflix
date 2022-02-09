import React, { FC, useRef } from "react";
import { useForm } from "react-hook-form";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import LoadingButtons from "../../Buttons/LoadingButtons/LoadingButtons";

//Create Account Button
const CreateAccount = styled(Button)<ButtonProps>(() => ({
  color: "#ffffff",
  backgroundColor: "#e50914",
  width: "100%",
  padding: "0.7em",
  "&:hover": {
    backgroundColor: "hsl(357, 92%, 60%)",
  },
}));

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
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "0.5em",
          width: "min(100%, 35em)",
          marginBottom: "1.5em",
          background: "#333333",
        }}
      >
        <InputBase
          inputRef={emailRef}
          inputProps={{
            "aria-label": "Email",
          }}
          sx={{
            color: "#fff",
            fontWeight: "bold",
            ml: 1,
            flex: 1,
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
        <p
          role="alert"
          style={{
            color: "#f59842",
            marginTop: "-1em",
            marginBottom: "1.5em",
            alignSelf: "start",
            textAlign: "left",
          }}
        >
          {errors.email.message}
        </p>
      )}
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "0.5em",
          width: "min(100%, 35em)",
          marginBottom: "1.5em",
          background: "#333333",
        }}
      >
        <InputBase
          inputRef={passwordRef}
          inputProps={{
            "aria-label": "Password",
          }}
          sx={{
            color: "#fff",
            fontWeight: "bold",
            ml: 1,
            flex: 1,
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
        <p
          role="alert"
          style={{
            color: "#f59842",
            marginTop: "-1em",
            marginBottom: "1.5em",
            alignSelf: "start",
            textAlign: "left",
          }}
        >
          {errors.password.message}
        </p>
      )}
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "0.5em",
          width: "min(100%, 35em)",
          marginBottom: "1.5em",
          background: "#333333",
        }}
      >
        <InputBase
          inputProps={{
            "aria-label": "Password",
          }}
          sx={{
            color: "#fff",
            fontWeight: "bold",
            ml: 1,
            flex: 1,
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
        <p
          role="alert"
          style={{
            color: "#f59842",
            marginTop: "-1em",
            marginBottom: "1.5em",
            alignSelf: "start",
            textAlign: "left",
          }}
        >
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
