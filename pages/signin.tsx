import React, { FC, useContext, useRef, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";
import Image from "next/image";
import WebLogo from "../assets/logo/WebLogo.png";
import { auth } from "../firebase/firebase";
import Link from "next/link";
import dynamic from "next/dynamic";
import firebase from "firebase/app";
import ProfileUserInput from "../components/Inputs/Profiles/ProfileUserInput";
const SignUpFooter = dynamic(
  () => import("../components/LandingPage/SignUpFooter")
);
const ProfileSelection = dynamic(
  () => import("../components/Main/ProfileSelection")
);
import profileStyles from "../styles/Home.module.scss";

const SignIn: FC = () => {
  const [authLoading, setAuthLoading] = useState(false);

  const router = useRouter();
  const user = useContext(AuthContext);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  //Allow the users to Sign In with an already created account
  const signIn = async () => {
    setAuthLoading(true);
    try {
      await auth.signInWithEmailAndPassword(
        emailRef.current!.value,
        passwordRef.current!.value
      );
      setAuthLoading(false);
    } catch (error) {
      console.log(error);
      alert(error);
      setAuthLoading(false);
    }
  };

  //Allow the users to Sign In Anonymously
  const signInAnonymously = async () => {
    setAuthLoading(true);
    try {
      let emailRef = process.env.NEXT_PUBLIC_ANONYMOUS_EMAIL as string;
      let passwordRef = process.env.NEXT_PUBLIC_ANONYMOUS_PASSWORD as string;

      await auth.signInWithEmailAndPassword(emailRef, passwordRef);
      setAuthLoading(false);
    } catch (error) {
      console.log(error);
      alert(error);
      setAuthLoading(false);
    }
  };

  //Allow users to Sign In With their Google Account
  const signInWithgoogle = async () => {
    //Retrieve Google Provider Object
    const provider = new firebase.auth.GoogleAuthProvider();
    //Set language to the default browser preference
    auth.useDeviceLanguage();
    //Start sign in process
    try {
      await auth.signInWithPopup(provider);
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  //Allow Users to Sign Out
  const signOut = async () => {
    await auth.signOut();
  };

  //Profile Background
  useEffect(() => {
    document.getElementsByTagName("body")[0].className = !user
      ? profileStyles["profile-section-bg"]
      : profileStyles["profile-section-bg-log-in"];
  }, [user]);

  // Route Changing when the user is logged in
  useEffect(() => {
    if (user) {
      router.push("/signin", "/signin?userSignedIn", { shallow: true });
    } else {
      router.push("/signin", undefined, { shallow: true });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (user) {
    return <ProfileSelection signOut={signOut} />;
  }

  return (
    <>
      <Link href="/" passHref>
        <div className={profileStyles["profile-styles-web-logo"]}>
          <Image
            src={WebLogo}
            alt="Web Logo"
            width={150}
            height={50}
            objectFit="cover"
          />
        </div>
      </Link>

      <div className={profileStyles["profile-styles-wrapper"]}>
        <div className={profileStyles["profile-styles-content"]}>
          <div className={profileStyles["profile-styles-title"]}>
            <h1>Sign In</h1>
          </div>

          <ProfileUserInput
            emailRef={emailRef}
            passwordRef={passwordRef}
            signIn={signIn}
            signInWithgoogle={signInWithgoogle}
            signInAnonymously={signInAnonymously}
            authLoading={authLoading}
          />

          <div className={profileStyles["profile-styles-new-title"]}>
            <h1>New to Filmflix?</h1>
          </div>
          <div className={profileStyles["profile-styles-new-account-link"]}>
            <Link href="/createaccount" passHref>
              <p>Click here to create new account</p>
            </Link>
          </div>

          <div className={profileStyles["profile-styles-recaptcha"]}>
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

export default SignIn;
