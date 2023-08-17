/* eslint-disable react-refresh/only-export-components */
import {
  FaChartPie,
  FaCircleExclamation,
  FaCircleQuestion,
  FaFileInvoiceDollar,
  FaGear,
  FaLinkedin,
  FaMars,
  FaMarsAndVenus,
  FaMoneyBillTransfer,
  FaPiggyBank,
  FaRegIdCard,
  FaRightFromBracket,
  FaSquareFacebook,
  FaSquareGithub,
  FaSquareYoutube,
  FaTags,
  FaUserGear,
  FaVenus,
} from "react-icons/fa6";
import classNames from "classnames/bind";
import styles from "../pages/signup/signup.module.scss";
import { Link } from "react-router-dom";

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

export const HOME_INTRO = [
  {
    name: "Transactions",
    number: "01",
    icon: <FaMoneyBillTransfer className={cx("homepage__card--icon")} />,
    desc: "Transation are the key of BudgetMaster. Give them a name and desc, assign a category to them, configure them as recurring, and mark them with tags.",
    color: "orange",
  },
  {
    name: "Account",
    number: "02",
    icon: <FaUserGear className={cx("homepage__card--icon")} />,
    desc: "Accounts allow you to group manage your account including: updating Personal information, reseting your password and delete current account. ",
    color: "green",
  },
  {
    name: "Category",
    number: "03",
    icon: <FaTags className={cx("homepage__card--icon")} />,
    desc: "Categories can be assigned to transactions in order to mark them as belonging together. They consist of a name an a color.",
    color: "blue",
  },
  {
    name: "Budget",
    number: "04",
    icon: <FaPiggyBank className={cx("homepage__card--icon")} />,
    desc: "Budget allows you devide your finance effectively. They help you planning your expense monthly/Quarterly/ Yearly.",
    color: "black",
  },
  {
    name: "Statistic",
    number: "05",
    icon: <FaChartPie className={cx("homepage__card--icon")} />,
    desc: "Satitic allows you tracking  your income and expense in general and details by using some function of this application.",
    color: "grey",
  },
  {
    name: "Report",
    number: "06",
    icon: <FaFileInvoiceDollar className={cx("homepage__card--icon")} />,
    desc: "Visualize your data by using charts and data table. You can choose an included chart or define your own and export your data.",
    color: "violet",
  },
];

export const MENU_DROPDOWN_ITEMS = [
  {
    label: <Link to={"/profile"}>Profile</Link>,
    key: "0",
    icon: <FaRegIdCard />,
    style: {
      fontSize: "1.4rem",
      padding: "0.8rem",
    },
  },
  {
    label: "Settings",
    key: "1",
    icon: <FaGear />,
    style: {
      fontSize: "1.4rem",
      padding: "0.8rem",
    },
  },
  {
    label: "Help & support",
    key: "2",
    icon: <FaCircleQuestion />,
    style: {
      fontSize: "1.4rem",
      padding: "0.8rem",
    },
  },
  {
    label: "Give feedback",
    key: "3",
    icon: <FaCircleExclamation />,
    style: {
      fontSize: "1.4rem",
      padding: "0.8rem",
    },
  },
  {
    label: "Logout",
    key: "4",
    icon: <FaRightFromBracket />,
    style: {
      fontSize: "1.4rem",
      padding: "0.8rem",
    },
  },
];
