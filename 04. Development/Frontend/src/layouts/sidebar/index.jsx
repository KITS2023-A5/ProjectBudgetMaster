import { Drawer, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import classNames from "classnames/bind";
import { FaCamera } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import styles from "./sidebar.module.scss";
import useWindowResize from "../../hooks/useWindowResize";
import { toggleCollapsed } from "../../redux/slices/collapsedSlice";

const cx = classNames.bind(styles);

const Sidebar = () => {
  // const collapsed = useSelector((state) => state.collapsed);
  const windownSize = useWindowResize();

  const collapsed = useSelector((state) => state.collapsed);
  const dispatch = useDispatch();

  const handleDrawerToggle = () => {
    dispatch(toggleCollapsed());
  };

  const handleCollapseToggle = () => {
    dispatch(toggleCollapsed());
  };

  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();

  return (
    <>
      {windownSize.width > 992 ? (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          onCollapse={handleCollapseToggle}
          width={260}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "sticky",
            zIndex: "5",
            left: 0,
            top: 0,
            bottom: 0,
          }}
          theme="light"
        >
          <div className="sidebar__logo" />
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <FaCamera />,
                label: "nav 1",
              },
              {
                key: "2",
                icon: <FaCamera />,
                label: "nav 2",
              },
              {
                key: "3",
                icon: <FaCamera />,
                label: "nav 3",
              },
            ]}
          />
        </Sider>
      ) : (
        <Drawer
          placement={"left"}
          onClose={handleDrawerToggle}
          open={collapsed}
        >
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <FaCamera />,
                label: "nav 1",
              },
              {
                key: "2",
                icon: <FaCamera />,
                label: "nav 2",
              },
              {
                key: "3",
                icon: <FaCamera />,
                label: "nav 3",
              },
            ]}
          />
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
