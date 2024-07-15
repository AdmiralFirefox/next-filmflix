import React, { FC, useContext, useRef, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";
import Image from "next/legacy/image";
import WebLogo from "../assets/logo/WebLogo.png";
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import dynamic from "next/dynamic";
import AccountUserInput from "../components/Inputs/Accounts/AccountUserInput";
const SignUpFooter = dynamic(
  () => import("../components/LandingPage/SignUpFooter")
);
import accountStyles from "../styles/Pages/CreateAccount.module.scss";

const CreateAccount: FC = () => {
  const [authLoading, setAuthLoading] = useState(false);

  const router = useRouter();
  const user = useContext(AuthContext);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  //ALlow users to make an account
  const createAccount = async () => {
    setAuthLoading(true);
    try {
      await createUserWithEmailAndPassword(
        auth,
        emailRef.current!.value,
        passwordRef.current!.value
      );
      setAuthLoading(false);
    } catch (error) {
      console.error(error);
      alert(error);
      setAuthLoading(false);
    }
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
      router.push("/watch");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Link href="/" passHref legacyBehavior>
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
            createAccount={createAccount}
            authLoading={authLoading}
          />

          <div className={accountStyles["account-section-existing-account"]}>
            <h1>Already Have an Account?</h1>
          </div>
          <div className={accountStyles["account-section-link-to-login"]}>
            <Link href="/signin" passHref legacyBehavior>
              <p>Click here to log-in</p>
            </Link>
          </div>
          <div className={accountStyles["account-section-recaptcha"]}>
            <p>
              This page is protected by Google reCAPTCHA to ensure you&apos;re
              not a bot.{" "}
            </p>
          </div>
        </div>
        <SignUpFooter />
      </div>
    </>
  );
};

export default CreateAccount;
