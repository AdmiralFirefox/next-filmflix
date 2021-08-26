import React, { FC, useContext, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";
import Image from "next/image";
import WebLogo from "../assets/logo/WebLogo.png";
import { auth } from "../firebase/firebase";
import Link from "next/link";
import dynamic from "next/dynamic";
import AccountUserInput from "../components/Inputs/Accounts/AccountUserInput";
import SignUpFooter from "../components/LandingPage/SignUpFooter";
import accountStyles from "../styles/Home.module.scss";
const ProfileSelection = dynamic(
  () => import("../components/Main/ProfileSelection")
);

const CreateAccount: FC = () => {
  const router = useRouter();
  const user = useContext(AuthContext);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  //ALlow users to make an account
  const createAccount = async () => {
    if (passwordRef.current!.value === confirmPasswordRef.current!.value) {
      try {
        await auth.createUserWithEmailAndPassword(
          emailRef.current!.value,
          passwordRef.current!.value
        );
        alert("Account Created Successfully!");
      } catch (error) {
        // console.error(error);
        alert(error);
      }
    } else if (confirmPasswordRef.current!.value === "") {
      alert("Please re-type your password to confirm.");
    } else {
      alert("Password did not match. Please re-type your password.");
    }
  };

  //ALlow users to Sign Out
  const signOut = async () => {
    await auth.signOut();
  };

  //Profile Background
  useEffect(() => {
    document.getElementsByTagName("body")[0].className = !user
      ? accountStyles["account-section-bg"]
      : accountStyles["account-section-bg-log-in"];
  }, [user]);

  //Route Changing when the user is logged in
  useEffect(() => {
    if (user) {
      router.push("/createaccount", "/createaccount?main", { shallow: true });
    } else {
      router.push("/createaccount", undefined, { shallow: true });
    }
  }, [user]);

  return (
    <>
      {!user ? (
        <>
          <Link href="/" passHref>
            <div className={accountStyles["account-section-web-logo"]}>
              <Image
                src={WebLogo}
                alt="Web Logo"
                width={150}
                height={50}
                objectFit="cover"
              />
            </div>
          </Link>
          <div className={accountStyles["account-section-wrapper"]}>
            <div className={accountStyles["account-section-content"]}>
              <div className={accountStyles["account-section-title"]}>
                <h1>Create Account</h1>
              </div>

              <AccountUserInput
                emailRef={emailRef}
                passwordRef={passwordRef}
                confirmPasswordRef={confirmPasswordRef}
                createAccount={createAccount}
              />

              <div
                className={accountStyles["account-section-existing-account"]}
              >
                <h1>Already Have an Account?</h1>
              </div>
              <div className={accountStyles["account-section-link-to-login"]}>
                <Link href="/signin" passHref>
                  <p>Click here to log-in</p>
                </Link>
              </div>
              <div className={accountStyles["account-section-recaptcha"]}>
                <p>
                  This page is protected by Google reCAPTCHA to ensure you're
                  not a bot.{" "}
                </p>
              </div>
            </div>
            <SignUpFooter />
          </div>
        </>
      ) : (
        <>
          <ProfileSelection signOut={signOut} />
        </>
      )}
    </>
  );
};

export default CreateAccount;
