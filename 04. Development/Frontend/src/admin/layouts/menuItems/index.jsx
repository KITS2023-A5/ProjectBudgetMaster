import { Menu } from "antd";
import classNames from "classnames/bind";
import {
  FaChartColumn,
  FaHouseChimney,
  FaMoneyBillTransfer,
  FaPiggyBank,
  FaTags,
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
      key: "/admin",
      icon: <FaHouseChimney className={cx("menu__icon")} />,
      label: (
        <Link to={"/admin"} className={cx("menuItems__link")}>
          {/* {t("Home")} */}
          Home
        </Link>
      ),
      className: cx("menuItems__item", {
        "menuItems__item--collapsed": collapsed,
      }),
    },
    {
      key: "/admin/trackingUser",
      icon: <FaMoneyBillTransfer className={cx("menu__icon")} />,
      label: (
        <Link to={"/admin/trackingUser"} className={cx("menuItems__link")}>
          {/* {t("TrackingUser")} */}
          Tracking User
        </Link>
      ),
      className: cx("menuItems__item", {
        "menuItems__item--collapsed": collapsed,
      }),
    },
    {
      key: "/admin/customerService",
      icon: <FaPiggyBank className={cx("menu__icon")} />,
      label: (
        <Link to={"/admin/customerService"} className={cx("menuItems__link")}>
          {/* {t("CustomerService")} */}
          Customer Service
        </Link>
      ),
      className: cx("menuItems__item", {
        "menuItems__item--collapsed": collapsed,
      }),
    },
    {
      key: "/admin/customerBehaviorAnalytics",
      icon: <FaChartColumn className={cx("menu__icon")} />,
      label: (
        <Link to={"/admin/customerBehaviorAnalytics"} className={cx("menuItems__link")}>
          {/* {t('CustomerBehavior')} */}
          Customer Behavior Analytics
        </Link>
      ),
      className: cx("menuItems__item", {
        "menuItems__item--collapsed": collapsed,
      }),
    },
    {
      key: "/admin/category",
      icon: <FaTags className={cx("menu__icon")} />,
      label: (
        <Link to={"/admin/category"} className={cx("menuItems__link")}>
          {/* {t('Category')} */}
          Category
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
