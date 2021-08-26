import React, { FC, useContext, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";
import Image from "next/image";
import WebLogo from "../assets/logo/WebLogo.png";
import { auth } from "../firebase/firebase";
import Link from "next/link";
import dynamic from "next/dynamic";
import firebase from "firebase/app";
const ProfileUserInput = dynamic(
  () => import("../components/Inputs/Profiles/ProfileUserInput")
);
const SignUpFooter = dynamic(
  () => import("../components/LandingPage/SignUpFooter")
);
import profileStyles from "../styles/Home.module.scss";
const ProfileSelection = dynamic(
  () => import("../components/Main/ProfileSelection")
);

const SignIn: FC = () => {
  const router = useRouter();
  const user = useContext(AuthContext);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  //Allow the users to Sign In with an already created account
  const signIn = async () => {
    try {
      await auth.signInWithEmailAndPassword(
        emailRef.current!.value,
        passwordRef.current!.value
      );
    } catch (error) {
      // console.log(error);
      alert(error);
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
      // console.log(err);
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
      router.push("/signin", "/signin?main", { shallow: true });
    } else {
      router.push("/signin", undefined, { shallow: true });
    }
  }, [user]);

  return (
    <>
      {!user ? (
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
                  This page is protected by Google reCAPTCHA to ensure
                  you&apos;re not a bot.{" "}
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

export default SignIn;
