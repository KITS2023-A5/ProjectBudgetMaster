import { Menu } from "antd";
import classNames from "classnames/bind";
import {
  FaChartColumn,
  FaHouseChimney,
  FaMoneyBillTransfer,
  FaPiggyBank,
} from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./menuItems.module.scss";

const cx = classNames.bind(styles);

const MenuItems = ({ onClick, currentPath }) => {
  const collapsed = useSelector((state) => state.collapsed);
  const { t } = useTranslation();

  const items = [
    {
      key: "/",
      icon: <FaHouseChimney className={cx("menu__icon")} />,
      label: (
        <Link to={"/"} className={cx("menuItems__link")}>
          {t("Home")}
        </Link>
      ),
      className: cx("menuItems__item", {
        "menuItems__item--collapsed": collapsed,
      }),
    },
    {
      key: "/transaction",
      icon: <FaMoneyBillTransfer className={cx("menu__icon")} />,
      label: (
        <Link to={"/transaction"} className={cx("menuItems__link")}>
          {t("Transaction")}
        </Link>
      ),
      className: cx("menuItems__item", {
        "menuItems__item--collapsed": collapsed,
      }),
    },
    {
      key: "/budget",
      icon: <FaPiggyBank className={cx("menu__icon")} />,
      label: (
        <Link to={"/budget"} className={cx("menuItems__link")}>
          {t("Budget")}
        </Link>
      ),
      className: cx("menuItems__item", {
        "menuItems__item--collapsed": collapsed,
      }),
    },
    {
      key: "/statistic",
      icon: <FaChartColumn className={cx("menu__icon")} />,
      label: (
        <Link to={"/statistic"} className={cx("menuItems__link")}>
          {t("Statistic")}
        </Link>
      ),
      className: cx("menuItems__item", {
        "menuItems__item--collapsed": collapsed,
      }),
    },
  ];

  return (
    <>
      <Menu
        className={cx("menuItems")}
        mode="inline"
        defaultSelectedKeys={[currentPath]}
        selectedKeys={[currentPath]}
        onClick={onClick}
        items={items}
      />
    </>
  );
};

export default MenuItems;
