/* eslint-disable react-refresh/only-export-components */
import classNames from "classnames/bind";
import {
  FaMoneyBillTransfer,
  FaTags,
  FaUserGear,
  FaChartColumn,
} from "react-icons/fa6";
import styles from "../pages/signup/signup.module.scss";

const cx = classNames.bind(styles);


export const HOME_INTRO = [
  {
    name: "Tracking User",
    number: "01",
    icon: <FaMoneyBillTransfer className={cx("homepage__card--icon")} />,
    desc: "General customer's budget follow Month, Quater, Year",
    color: "orange",
  },
  {
    name: "Customer Service",
    number: "02",
    icon: <FaUserGear className={cx("homepage__card--icon")} />,
    desc: "Allows admin to organize customer feedback, suggestions, and complaints in a clear and concise manner. This enables you to prioritize tasks effectively and efficiently, reducing the feeling of overwhelm and exhaustion that can come with managing a high volume of customer requests.",
    color: "green",
  },
  {
    name: "Customer Behavior Analytics",
    number: "03",
    icon: <FaChartColumn className={cx("homepage__card--icon")} />,
    desc: "Organizations that have insight into which customers bought what, when, and via which channels gain a competitive advantage because they are better equipped to make data-based marketing decisions.",
    color: "blue",
  },
  {
    name: "Category",
    number: "04",
    icon: <FaTags className={cx("homepage__card--icon")} />,
    desc: "Allows asmin to manage and flexible editing and add a new category",
    color: "violet",
  },
];