import React, {
  FC,
  useState,
  useEffect,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";
import dynamic from "next/dynamic";
const AddProfileModal = dynamic(
  () => import("../Modal/ProfileModal/AddProfileModal")
);
const EditProfileModal = dynamic(
  () => import("../Modal/ProfileModal/EditModalProfile")
);
const EditProfilePicModal = dynamic(
  () => import("../Modal/ProfileModal/EditProfilePicModal")
);
import LogoAnimation from "../LandingPage/LogoAnimation";
const Main = dynamic(() => import("./Main"));
import Image, { StaticImageData } from "next/image";
import WebLogo from "../../assets/logo/WebLogo.png";
import DefaultProfile from "../../assets/profileicons/DefaultAvatar.png";
import ManageProfileButton from "../Buttons/Main/ManageProfileButton";
import styles from "../../styles/Main/ProfileSelection.module.scss";

interface ProfilesProps {
  profileData: {
    id: number;
    name: string;
    picture: StaticImageData;
  }[];
}

interface ProfileEditModeOnProps {
  profiles: {
    id: number;
    name: string;
    picture: StaticImageData;
  }[];
  editProfilePic: number | boolean;
  editProfilePicModal: boolean;
  handleCLoseEditProfilePicModal: () => void;
  setEditProfilePicText: Dispatch<React.SetStateAction<StaticImageData>>;
  SubmitProfilePicEdit: (id: number) => void;
  setEditProfilePic: Dispatch<React.SetStateAction<number | boolean>>;
  profilePic: StaticImageData;
  setProfile: (value: SetStateAction<string>) => void;
  setProfilePic: (value: SetStateAction<StaticImageData>) => void;
  handleOpenEditProfilePicModal: () => void;
  profileEdit: number | boolean;
  editProfileModal: boolean;
  handleCloseEditProfileModal: () => void;
  setProfileTextEdit: Dispatch<React.SetStateAction<string>>;
  SubmitProfileEdit: (id: number) => void;
  profileTextEdit: string;
  setProfileEdit: Dispatch<React.SetStateAction<number | boolean>>;
  handleOpenEditProfileModal: () => void;
  RemoveProfile: (id: number) => void;
}

interface ProfileEditModeOffProps {
  profiles: {
    id: number;
    name: string;
    picture: StaticImageData;
  }[];
  selectedProfile: () => void;
  setProfile: (value: React.SetStateAction<string>) => void;
  setProfilePic: (value: React.SetStateAction<StaticImageData>) => void;
  editMode: boolean;
  handleOpenAddProfileModal: () => void;
}

export const ProfileNameContext = createContext("");
export const ProfilePicContext = createContext(DefaultProfile);

//Profile Edit Mode On
const ProfileEditModeOn: FC<ProfileEditModeOnProps> = ({
  profiles,
  editProfilePic,
  editProfilePicModal,
  handleCLoseEditProfilePicModal,
  setEditProfilePicText,
  SubmitProfilePicEdit,
  setEditProfilePic,
  profilePic,
  setProfile,
  setProfilePic,
  handleOpenEditProfilePicModal,
  profileEdit,
  editProfileModal,
  handleCloseEditProfileModal,
  setProfileTextEdit,
  SubmitProfileEdit,
  profileTextEdit,
  setProfileEdit,
  handleOpenEditProfileModal,
  RemoveProfile,
}) => {
  return (
    <div className={styles["profile-selection-profiles"]}>
      {profiles.map((profile) => {
        return (
          <div key={profile.id} className={styles["edit-mode-on-wrapper"]}>
            {editProfilePic === profile.id ? (
              <>
                <EditProfilePicModal
                  editProfilePicModal={editProfilePicModal}
                  handleCLoseEditProfilePicModal={
                    handleCLoseEditProfilePicModal
                  }
                  setEditProfilePicText={setEditProfilePicText}
                  SubmitProfilePicEdit={SubmitProfilePicEdit}
                  profile={profile}
                  setEditProfilePic={setEditProfilePic}
                  profilePic={profilePic}
                />
                <div className={styles["edit-mode-on-image-container"]}>
                  <div className={styles["edit-mode-on-image"]}>
                    <Image
                      src={profile.picture}
                      alt="Avatar Profile"
                      onClick={() => {
                        setProfile(profile.name);
                        setProfilePic(profile.picture);
                      }}
                      priority={true}
                    />
                  </div>
                  <div className={styles["edit-mode-on-image-overlay"]}>
                    <div
                      className={styles["edit-mode-on-edit-profile-icon"]}
                      onClick={() => {
                        setEditProfilePic(profile.id);
                        handleOpenEditProfilePicModal();
                      }}
                    >
                      <i className="fas fa-edit"></i>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={styles["edit-mode-on-image-container"]}>
                  <div className={styles["edit-mode-on-image"]}>
                    <Image
                      src={profile.picture}
                      alt="Avatar Profile"
                      onClick={() => {
                        setProfile(profile.name);
                        setProfilePic(profile.picture);
                      }}
                      priority={true}
                    />
                  </div>
                  <div className={styles["edit-mode-on-image-overlay"]}>
                    <div
                      className={styles["edit-mode-on-edit-profile-icon"]}
                      onClick={() => {
                        setEditProfilePic(profile.id);
                        handleOpenEditProfilePicModal();
                      }}
                    >
                      <i className="fas fa-edit"></i>
                    </div>
                  </div>
                </div>
              </>
            )}

            {profileEdit === profile.id ? (
              <div className={styles["edit-mode-on-profile-name-wrapper"]}>
                <EditProfileModal
                  editProfileModal={editProfileModal}
                  handleCloseEditProfileModal={handleCloseEditProfileModal}
                  setProfileTextEdit={setProfileTextEdit}
                  profile={profile}
                  SubmitProfileEdit={SubmitProfileEdit}
                  profileTextEdit={profileTextEdit}
                  setProfileEdit={setProfileEdit}
                  profiles={profiles}
                />
                <h1 className={styles["edit-mode-on-profile-name"]}>
                  {profile.name}
                </h1>
                <div
                  className={styles["edit-mode-on-edit-name-icon"]}
                  onClick={() => {
                    setProfileEdit(profile.id);
                    handleOpenEditProfileModal();
                  }}
                >
                  <i className="fas fa-edit"></i>
                </div>
              </div>
            ) : (
              <div className={styles["edit-mode-on-profile-name-wrapper"]}>
                <h1 className={styles["edit-mode-on-profile-name"]}>
                  {profile.name}
                </h1>
                <div
                  className={styles["edit-mode-on-edit-name-icon"]}
                  onClick={() => {
                    setProfileEdit(profile.id);
                    handleOpenEditProfileModal();
                  }}
                >
                  <i className="fas fa-edit"></i>
                </div>
              </div>
            )}

            <div
              className={styles["edit-mode-on-remove-profile-icon"]}
              onClick={() => RemoveProfile(profile.id)}
            >
              <i className="fas fa-times-circle"></i>
            </div>
          </div>
        );
      })}
    </div>
  );
};

//Profile Edit Mode Off
const ProfileEditModeOff: FC<ProfileEditModeOffProps> = ({
  profiles,
  selectedProfile,
  setProfile,
  setProfilePic,
  editMode,
  handleOpenAddProfileModal,
}) => {
  return (
    <div className={styles["profile-selection-profiles"]}>
      {profiles.map((profile) => {
        return (
          <div key={profile.id} className={styles["edit-mode-off-wrapper"]}>
            <div className={styles["edit-mode-off-image"]}>
              <Image
                src={profile.picture}
                alt="Avatar Profile"
                onClick={() => {
                  selectedProfile();
                  setProfile(profile.name);
                  setProfilePic(profile.picture);
                }}
                priority={true}
              />
            </div>

            <h1 className={styles["edit-mode-off-profile-name"]}>
              {profile.name}
            </h1>
          </div>
        );
      })}

      {/* Add Profiles */}
      {profiles.length !== 5 && (
        <>
          {editMode ? null : (
            <>
              <div
                onClick={handleOpenAddProfileModal}
                className={styles["add-profile-icon"]}
              >
                <i className="fas fa-plus-circle"></i>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

const ProfileSelection: FC = () => {
  // Animate Logo
  const [noLogoAnimation, setNoLogoAnimation] = useState(false);

  //Profile Edit
  const [profiles, setProfiles] = useState<ProfilesProps["profileData"]>([]);
  const [profile, setProfile] = useState("");

  const [profileEdit, setProfileEdit] = useState<boolean | number>(false);
  const [profileTextEdit, setProfileTextEdit] = useState("");

  //Proile Picture Edit
  const [profilePic, setProfilePic] = useState(DefaultProfile);
  const [editProfilePic, setEditProfilePic] = useState<boolean | number>(false);
  const [editProfilePicText, setEditProfilePicText] =
    useState<StaticImageData>(profilePic);

  //Edit Mode
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = (): void => setEditMode(!editMode);

  //When a user Select a Profile
  const [profileSelect, setProfileSelect] = useState(false);

  const selectedProfile = () => {
    setProfileSelect(true);
    setNoLogoAnimation(true);
  };

  const manageProfiles = () => {
    setProfileSelect(false);
    setProfilePic(DefaultProfile);
    setProfile("");
  };

  //Add Profile Modal
  const [openAddProfileModal, setOpenAddProfileModal] = useState(false);

  const handleOpenAddProfileModal = () => {
    setOpenAddProfileModal(true);
  };

  const handleCloseAddProfileModal = () => {
    setOpenAddProfileModal(false);
    setProfile("");
  };

  //Edit Profile Modal
  const [editProfileModal, setEditProfileModal] = useState(false);

  const handleOpenEditProfileModal = () => {
    setEditProfileModal(true);
  };

  const handleCloseEditProfileModal = () => {
    setEditProfileModal(false);
    setProfileEdit(false);
    setProfileTextEdit("");
  };

  //Edit Profile Pic Modal
  const [editProfilePicModal, setEditProfilePicModal] = useState(false);

  const handleOpenEditProfilePicModal = () => {
    setEditProfilePicModal(true);
  };

  const handleCLoseEditProfilePicModal = () => {
    setEditProfilePicModal(false);
    setEditProfilePic(false);
    setEditProfilePicText(profilePic);
  };

  //Adding New Profiles
  const handleProfileSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const newProfile = {
      id: new Date().getTime(),
      name: profile,
      picture: profilePic,
    };

    setProfiles([...profiles].concat(newProfile));
    setProfile("");
    setOpenAddProfileModal(false);
    setProfilePic(DefaultProfile);
  };

  //Handling Profile Change
  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setProfile(e.target.value);
  };

  //Removing Profile
  const RemoveProfile = (id: number) => {
    const updatedProfiles = [...profiles].filter(
      (profile) => profile.id !== id
    );

    setProfiles(updatedProfiles);
  };

  //Editing Profile
  const SubmitProfileEdit = (id: number) => {
    const updatedProfiles = [...profiles].map((profile) => {
      if (profile.id === id) {
        profile.name = profileTextEdit;
      }
      return profile;
    });
    setProfiles(updatedProfiles);
    setProfileEdit(false);
    setProfileTextEdit("");
  };

  //Profile Pic Edit
  const SubmitProfilePicEdit = (id: number) => {
    const updatedProfiles = [...profiles].map((profile) => {
      if (profile.id === id) {
        profile.picture = editProfilePicText;
      }
      return profile;
    });
    setProfiles(updatedProfiles);
    setEditProfilePic(false);
    setEditProfilePicText(profilePic);
  };

  //Allow Users to Sign Out
  const signOutAccount = async () => {
    setProfileSelect(false);
    setNoLogoAnimation(false);
    await signOut(auth);
  };

  //Local Storage for Saving Profiles When Refresh
  useEffect(() => {
    const json = localStorage.getItem("profiles") as string;
    const saveProfiles = JSON.parse(json);

    if (saveProfiles) {
      setProfiles(saveProfiles);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(profiles);
    localStorage.setItem("profiles", json);
  }, [profiles]);

  // Local Storage for Selecting a Profile
  useEffect(() => {
    const json = localStorage.getItem("PROFILE_SELECTED") as string;
    const saveProfileSelected = JSON.parse(json);

    if (saveProfileSelected) {
      setProfileSelect(saveProfileSelected);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(profileSelect);
    localStorage.setItem("PROFILE_SELECTED", json);
  }, [profileSelect]);

  // Local Storage for Profile Name
  useEffect(() => {
    const json = localStorage.getItem("PROFILE_NAME") as string;
    const saveProfileName = JSON.parse(json);

    if (saveProfileName) {
      setProfile(saveProfileName);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(profile);
    localStorage.setItem("PROFILE_NAME", json);
  }, [profile]);

  // Local Storage for Profile Pic
  useEffect(() => {
    const json = localStorage.getItem("PROFILE_PIC") as string;
    const saveProfilePic = JSON.parse(json);

    if (saveProfilePic) {
      setProfilePic(saveProfilePic);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(profilePic);
    localStorage.setItem("PROFILE_PIC", json);
  }, [profilePic]);

  // Local Storage for Animating Logo State
  useEffect(() => {
    const json = localStorage.getItem("NO_LOGO_ANIMATION") as string;
    const saveAnimateLogoState = JSON.parse(json);

    if (saveAnimateLogoState) {
      setNoLogoAnimation(saveAnimateLogoState);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(noLogoAnimation);
    localStorage.setItem("NO_LOGO_ANIMATION", json);
  }, [noLogoAnimation]);

  //Changing Background Color
  useEffect(() => {
    document.getElementsByTagName("body")[0].className =
      styles["main-background"];

    //Clean up whether it unmounts
    return () => {
      document.getElementsByTagName("body")[0].className = "";
    };
  }, []);

  return (
    <>
      {!noLogoAnimation && <LogoAnimation />}
      <div className={styles["whole-profile-main-wrapper"]}>
        {profileSelect ? (
          <ProfilePicContext.Provider value={profilePic}>
            <ProfileNameContext.Provider value={profile}>
              <Main manageProfiles={manageProfiles} signOut={signOutAccount} />
            </ProfileNameContext.Provider>
          </ProfilePicContext.Provider>
        ) : (
          <>
            <AddProfileModal
              openAddProfileModal={openAddProfileModal}
              handleCloseAddProfileModal={handleCloseAddProfileModal}
              profile={profile}
              handleProfileSubmit={handleProfileSubmit}
              handleProfileChange={handleProfileChange}
              setProfile={setProfile}
              profiles={profiles}
            />
            <div className={styles["profile-selection-wrapper"]}>
              <div className={styles["profile-selection-web-logo"]}>
                <Image
                  src={WebLogo}
                  alt="Web Logo"
                  width={150}
                  height={50}
                  objectFit="cover"
                />
              </div>
              <div className={styles["profile-selection-title"]}>
                <h1>Who&apos;s Watching?</h1>
              </div>

              {editMode ? (
                <ProfileEditModeOn
                  profiles={profiles}
                  editProfilePic={editProfilePic}
                  editProfilePicModal={editProfilePicModal}
                  handleCLoseEditProfilePicModal={
                    handleCLoseEditProfilePicModal
                  }
                  setEditProfilePicText={setEditProfilePicText}
                  SubmitProfilePicEdit={SubmitProfilePicEdit}
                  setEditProfilePic={setEditProfilePic}
                  profilePic={profilePic}
                  setProfile={setProfile}
                  setProfilePic={setProfilePic}
                  handleOpenEditProfilePicModal={handleOpenEditProfilePicModal}
                  profileEdit={profileEdit}
                  editProfileModal={editProfileModal}
                  handleCloseEditProfileModal={handleCloseEditProfileModal}
                  setProfileTextEdit={setProfileTextEdit}
                  SubmitProfileEdit={SubmitProfileEdit}
                  profileTextEdit={profileTextEdit}
                  setProfileEdit={setProfileEdit}
                  handleOpenEditProfileModal={handleOpenEditProfileModal}
                  RemoveProfile={RemoveProfile}
                />
              ) : (
                <ProfileEditModeOff
                  profiles={profiles}
                  selectedProfile={selectedProfile}
                  setProfile={setProfile}
                  setProfilePic={setProfilePic}
                  editMode={editMode}
                  handleOpenAddProfileModal={handleOpenAddProfileModal}
                />
              )}

              {/* Manage Profiles Profiles */}
              <ManageProfileButton
                profiles={profiles}
                toggleEditMode={toggleEditMode}
                editMode={editMode}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProfileSelection;
