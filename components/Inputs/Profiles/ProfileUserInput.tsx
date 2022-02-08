import React, { FC } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import GoogleLogo from "../../../assets/login/Google.png";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import LoadingButtons from "../../Buttons/LoadingButtons/LoadingButtons";

//Sign In Button
const SignInButton = styled(Button)<ButtonProps>(() => ({
  color: "#ffffff",
  backgroundColor: "#e50914",
  width: "100%",
  padding: "0.7em",
  "&:hover": {
    backgroundColor: "hsl(357, 92%, 60%)",
  },
}));

//Sign In With Dummy Account  Button
const SignInDummyAccountButton = styled(Button)<ButtonProps>(() => ({
  color: "#ffffff",
  backgroundColor: "#e50914",
  width: "100%",
  marginTop: "1.1em",
  padding: "0.7em",
  "&:hover": {
    backgroundColor: "hsl(357, 92%, 60%)",
  },
}));

//Sign In With Google Button
const SignInWithGoogleButton = styled(Button)<ButtonProps>(() => ({
  color: "#000",
  backgroundColor: "#ffffff",
  width: "100%",
  marginTop: "1.1em",
  padding: "0.7em",
  "&:hover": {
    backgroundColor: "hsl(0, 0%, 80%)",
  },
}));

interface ProfileUserInputProps {
  emailRef: React.RefObject<HTMLInputElement>;
  passwordRef: React.RefObject<HTMLInputElement>;
  signIn: () => Promise<void>;
  signInWithgoogle: () => Promise<void>;
  signInAnonymously: () => Promise<void>;
  authLoading: boolean;
}

const ProfileUserInput: FC<ProfileUserInputProps> = ({
  emailRef,
  passwordRef,
  signIn,
  signInWithgoogle,
  signInAnonymously,
  authLoading,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <Paper
        sx={{
          padding: "0.5em",
          display: "flex",
          alignItems: "center",
          width: "min(100%, 35em)",
          background: "#333333",
          marginBottom: "1.5em",
        }}
      >
        <InputBase
          placeholder="Email"
          inputRef={emailRef}
          type="email"
          inputProps={{
            "aria-label": "Email",
          }}
          sx={{
            color: "#fff",
            fontWeight: "bold",
            ml: 1,
            flex: 1,
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
        <Box
          role="alert"
          sx={{
            color: "#f59842",
            marginTop: "-1em",
            marginBottom: "1.5em",
            alignSelf: "start",
            textAlign: "left",
          }}
        >
          <p>{errors.email.message}</p>
        </Box>
      )}
      <Paper
        sx={{
          padding: "0.5em",
          display: "flex",
          alignItems: "center",
          width: "min(100%, 35em)",
          background: "#333333",
          marginBottom: "1.5em",
        }}
      >
        <InputBase
          placeholder="Password"
          inputRef={passwordRef}
          type="password"
          inputProps={{
            "aria-label": "Password",
          }}
          sx={{
            color: "#fff",
            fontWeight: "bold",
            ml: 1,
            flex: 1,
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
        <Box
          role="alert"
          sx={{
            color: "#f59842",
            marginTop: "-1em",
            marginBottom: "1.5em",
            alignSelf: "start",
            textAlign: "left",
          }}
        >
          <p>{errors.password.message}</p>
        </Box>
      )}
      {authLoading ? (
        <>
          <LoadingButtons />
          <LoadingButtons />
          <LoadingButtons />
        </>
      ) : (
        <>
          <SignInButton
            variant="contained"
            onClick={handleSubmit(signIn)}
            type="submit"
          >
            Sign In
          </SignInButton>
          <SignInDummyAccountButton
            variant="contained"
            onClick={signInAnonymously}
            type="submit"
          >
            Sign In Anonymously
          </SignInDummyAccountButton>
          <SignInWithGoogleButton
            onClick={signInWithgoogle}
            variant="contained"
            startIcon={
              <Image
                src={GoogleLogo}
                alt="Google Image"
                width={30}
                height={30}
              />
            }
          >
            Sign In with Google
          </SignInWithGoogleButton>
        </>
      )}
    </>
  );
};

export default ProfileUserInput;
