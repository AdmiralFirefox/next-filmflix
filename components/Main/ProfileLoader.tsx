import React, { FC, useContext, useState, useEffect } from "react";
import { useLockedBody } from "../../hooks/useLockedBody";
import { useTimeout } from "../../hooks/useTimeout";
import { motion, AnimatePresence } from "framer-motion";
import { ProfilePicContext } from "./ProfileSelection";
import Image from "next/image";

const ProfileLoader: FC = () => {
  const [locked, setLocked] = useState(false);
  const [visible, setVisible] = useState(true);

  const profilePic = useContext(ProfilePicContext);

  const hide = () => {
    setVisible(false);
    setLocked(false);
  };

  useEffect(() => {
    if (visible) {
      setLocked(true);
    }
  }, [visible]);

  useTimeout(hide, 2000);
  useLockedBody(locked);

  return (
    <>
      <AnimatePresence initial={false}>
        {visible && (
          <motion.div
            key="fadeout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transitionEnd: {
                display: "none",
              },
            }}
            transition={{ duration: 1.5 }}
            style={{
              position: "fixed",
              width: "100%",
              top: 0,
              zIndex: "10",
            }}
          >
            <div id="loading-wrapper">
              <div id="loading">
                <div className="bulletouter">
                  <div className="bulletinner" />
                  <div className="mask" />
                  <div className="dot" />
                </div>
              </div>
            </div>
            <div className="profile-loader-image">
              <Image
                src={profilePic}
                alt="User Avatar"
                width={70}
                height={70}
                priority={true}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProfileLoader;
