/* eslint-disable react-refresh/only-export-components */
import {
  FaLinkedin,
  FaMars,
  FaMarsAndVenus,
  FaSquareFacebook,
  FaSquareGithub,
  FaSquareYoutube,
  FaVenus,
} from "react-icons/fa6";
import classNames from "classnames/bind";
import styles from "../pages/signup/signup.module.scss";

const cx = classNames.bind(styles);

export const GENDERS = [
  {
    label: "Male",
    value: 0,
    icon: (
      <FaMars
        className={cx("site-form-item-icon input__icon")}
        style={{
          fontSize: "1.8rem",
          marginRight: "0.8rem",
        }}
      />
    ),
  },
  {
    label: "Female",
    value: 1,
    icon: (
      <FaVenus
        className={cx("site-form-item-icon input__icon")}
        style={{
          fontSize: "1.8rem",
          marginRight: "0.8rem",
        }}
      />
    ),
  },
  {
    label: "Other",
    value: 2,
    icon: (
      <FaMarsAndVenus
        className={cx("site-form-item-icon input__icon")}
        style={{
          fontSize: "1.8rem",
          marginRight: "0.8rem",
        }}
      />
    ),
  },
];

export const SOCIAL_ICON = [
  {
    name: "Facebook",
    link: "http://www.facebook.com",
    icon: <FaSquareFacebook className={cx("footer__social--icon")} />,
  },
  {
    name: "Github",
    link: "https://github.com/KITS2023-A5",
    icon: <FaSquareGithub className={cx("footer__social--icon")} />,
  },
  {
    name: "Linkedin",
    link: "https://www.linkedin.com",
    icon: <FaLinkedin className={cx("footer__social--icon")} />,
  },
  {
    name: "Youtube",
    link: "http://www.youtube.com",
    icon: <FaSquareYoutube className={cx("footer__social--icon")} />,
  },
];
