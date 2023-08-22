import { Drawer } from "antd";
import Sider from "antd/es/layout/Sider";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import logoImg from "../../assets/images/logo1600.png";
import bgImg4 from "../../assets/images/sidebar-img4.jpg";
import useWindowResize from "../../hooks/useWindowResize";
import { toggleCollapsed } from "../../redux/slices/collapsedSlice";
import MenuItems from "../menuItems";
import styles from "./sidebar.module.scss";
import { useState } from "react";

const cx = classNames.bind(styles);

const Sidebar = () => {
  const { pathname } = useLocation();
  const windownSize = useWindowResize();
  const dispatch = useDispatch();
  const collapsed = useSelector((state) => state.collapsed);

  const [currentPath, setCurrentPath] = useState(pathname);

  const handleDrawerToggle = () => {
    dispatch(toggleCollapsed());
  };

  const handleCollapseToggle = () => {
    dispatch(toggleCollapsed());
  };

  const handleClickMenuItem = (e) => {
    setCurrentPath(e.key);
  };

  const handleClickMenuItemDrawer = (e) => {
    setCurrentPath(e.key);
    dispatch(toggleCollapsed());
  };

  return (
    <>
      {windownSize.width > 992 ? (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          onCollapse={handleCollapseToggle}
          width={260}
          // theme="light"
          style={{
            backgroundImage: `url(${bgImg4})`,
          }}
          className={cx("sidebar__sider")}
        >
          <Link to={"/"} className={cx("header__link")}>
            <div className={cx("sidebar__logo")}>
              <img
                src={logoImg}
                alt="logo"
                className={cx("sidebar__logo--img")}
              />
            </div>
          </Link>
          <MenuItems onClick={handleClickMenuItem} currentPath={currentPath} />
        </Sider>
      ) : (
        <Drawer
          placement={"left"}
          onClose={handleDrawerToggle}
          open={collapsed}
          width={260}
          style={{
            backgroundImage: `url(${bgImg4})`,
          }}
          headerStyle={{ display: "none" }}
          className={cx("sidebar__drawer")}
        >
          <MenuItems
            onClick={handleClickMenuItemDrawer}
            currentPath={currentPath}
          />
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
