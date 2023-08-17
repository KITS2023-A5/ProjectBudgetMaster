import { Avatar, Button, Dropdown } from "antd";
import classNames from "classnames/bind";
import {
  FaBars,
  FaBarsStaggered,
  FaChevronDown,
  FaHouseUser,
} from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleCollapsed } from "../../redux/slices/collapsedSlice";
import styles from "./header.module.scss";
import fallbackAvatar from "../../assets/images/fallback-avt.jpg";
import { MENU_DROPDOWN_ITEMS } from "../../constants";

const cx = classNames.bind(styles);

const Header = () => {
  const collapsed = useSelector((state) => state.collapsed);
  const dispatch = useDispatch();

  const handleToggleCollapsed = () => {
    dispatch(toggleCollapsed());
  };

  return (
    <>
      <header className={cx("header")}>
        <div className={cx("header__container")}>
          <Button
            type="text"
            icon={collapsed ? <FaBars /> : <FaBarsStaggered />}
            onClick={handleToggleCollapsed}
            className={cx("header__collapsed--btn")}
          />

          <div className={cx("header__auth")}>
            {/* <div className={cx("header__combo--btn")}>
              <Link to={"/login"} className={cx("header__btn--link")}>
                <button className={cx("header__button")}>Login</button>
              </Link>
              <Link to={"/signup"} className={cx("header__btn--link")}>
                <button className={cx("header__button")}>Signup</button>
              </Link>
            </div> */}

            <Dropdown
              menu={{ items: MENU_DROPDOWN_ITEMS }}
              trigger={["click"]}
              placement={"bottomRight"}
            >
              <button className={cx("header__avatar--btn")}>
                <Avatar
                  className={cx("header__avatar")}
                  size={40}
                  src={fallbackAvatar}
                />
                <span className={cx("header__avatar--name")}>Name</span>
                <FaChevronDown className={cx("profile__avatar--icon")} />
              </button>
            </Dropdown>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
