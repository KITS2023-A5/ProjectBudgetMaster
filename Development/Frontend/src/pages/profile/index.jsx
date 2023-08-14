import classNames from "classnames/bind";
import styles from "./profile.module.scss";

const cx = classNames.bind(styles);

const ProfilePage = () => {
  return (
    <>
      <h1 className={cx("title")}>this is profile</h1>
    </>
  );
};

export default ProfilePage;
