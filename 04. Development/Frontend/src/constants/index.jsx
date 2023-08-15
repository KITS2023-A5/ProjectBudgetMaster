/* eslint-disable react-refresh/only-export-components */
import { FaMars, FaMarsAndVenus, FaVenus } from "react-icons/fa6";
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
