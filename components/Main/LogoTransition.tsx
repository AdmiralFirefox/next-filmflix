import React, { FC, useState, useEffect } from "react";
import { useLockedBody } from "../../hooks/useLockedBody";
import { useTimeout } from "../../hooks/useTimeout";
import { motion, AnimatePresence } from "framer-motion";
const NetflixSound = require("../../assets/sounds/NetflixSound.mp3");

const LogoTransition: FC = () => {
  const [locked, setLocked] = useState(false);
  const [visible, setVisible] = useState(true);

  const hide = () => {
    setVisible(false);
    setLocked(false);
  };

  useEffect(() => {
    if (visible) {
      setLocked(true);
    }
  }, [visible]);

  useTimeout(hide, 2500);
  useLockedBody(locked);

  return (
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
          transition={{ duration: 1 }}
          style={{
            position: "relative",
            zIndex: "10",
          }}
        >
          <div className="animation-background">
            <div className="txt">FilmFlix</div>
            <audio autoPlay style={{ position: "absolute", display: "none" }}>
              <source src={NetflixSound} type="audio/mp3" />
            </audio>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LogoTransition;
