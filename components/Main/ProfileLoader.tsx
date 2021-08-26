import React, { FC, useContext, useMemo } from "react";
import { ProfilePicContext } from "./ProfileSelection";
import Image from "next/image";

const ProfileLoader: FC = () => {
  const profilePic = useContext(ProfilePicContext);

  return useMemo(() => {
    return (
      <>
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
          <Image src={profilePic} alt="User Avatar" width={70} height={70} />
        </div>
      </>
    );
  }, [profilePic]);
};

export default ProfileLoader;
