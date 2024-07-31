import { User } from "delib-npm";
import { FC } from "react";
import styles from "./ProfileImage.module.scss";

interface ProfileImageProps {
  user: User;
}

const ProfileImage: FC<ProfileImageProps> = ({ user }) => {
  const { photoURL, displayName } = user;
  return (
    <div
      className={styles.profileImage}
      style={{ backgroundImage: photoURL ? `url("${photoURL}")` : undefined }}
    >
      {!photoURL && displayName && displayName[0]}
    </div>
  );
};

export default ProfileImage;
