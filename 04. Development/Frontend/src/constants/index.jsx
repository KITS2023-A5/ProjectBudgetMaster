/* eslint-disable react-refresh/only-export-components */
import classNames from "classnames/bind";
import {
  FaChartPie,
  FaFileInvoiceDollar,
  FaLinkedin,
  FaMars,
  FaMarsAndVenus,
  FaMoneyBillTransfer,
  FaPiggyBank,
  FaSquareFacebook,
  FaSquareGithub,
  FaSquareYoutube,
  FaTags,
  FaUserGear,
  FaVenus,
} from "react-icons/fa6";
import styles from "../pages/signup/signup.module.scss";
import VietnameseIcon from "../assets/images/vietnam.png";
import EnglishIcon from "../assets/images/united-kingdom.png";
import imgSidebar1 from "../assets/images/sidebar-img1.jpg";
import imgSidebar2 from "../assets/images/sidebar-img2.jpg";
import imgSidebar3 from "../assets/images/sidebar-img3.jpg";
import imgSidebar4 from "../assets/images/sidebar-img4.jpg";

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

export const TRANSACTION_TYPE = [
  {
    name: "income",
    value: "income",
    label: "income",
  },
  {
    name: "expense",
    value: "expense",
    label: "expense",
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

export const LANGUAGES = [
  { label: "Vietnamese", code: "VIE", icon: VietnameseIcon },
  { label: "English", code: "ENG", icon: EnglishIcon },
];

export const COLOR_FILTERS = [
  {
    value: "color1",
    name: "green",
    color: "#009d9d",
  },
  {
    value: "color2",
    name: "blue",
    color: "#00bbff",
  },
  {
    value: "color3",
    name: "orange",
    color: "#ff9800",
  },
  {
    value: "color4",
    name: "rose",
    color: "#e91e63",
  },
];

export const IMAGE_FILTERS = [
  {
    value: imgSidebar1,
    name: "img1",
  },
  {
    value: imgSidebar2,
    name: "img2",
  },
  {
    value: imgSidebar3,
    name: "img3",
  },
  {
    value: imgSidebar4,
    name: "img4",
  },
];
