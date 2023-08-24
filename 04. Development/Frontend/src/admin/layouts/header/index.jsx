import { Avatar, Button, Col, Dropdown, Modal, Row, Select } from "antd";
import classNames from "classnames/bind";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaBars,
  FaBarsStaggered,
  FaChevronDown,
  FaCircleExclamation,
  FaCircleQuestion,
  FaGear,
  FaRegIdCard,
  FaRightFromBracket,
} from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import fallbackAvatar from "../../../assets/images/fallback-avt.jpg";
import { COLOR_FILTERS, IMAGE_FILTERS, LANGUAGES } from "../../../constants";
import { toggleCollapsed } from "../../../redux/slices/collapsedSlice";
import styles from "./header.module.scss";

const cx = classNames.bind(styles);

const Header = () => {
  const [isModalSettingsOpen, setIsModalSettingsOpen] = useState(false);
  const [activeColorOption, setActiveColorOption] = useState("color1");
  const [activeImageOption, setActiveImageOption] = useState(
    IMAGE_FILTERS[3].value
  );

  const dispatch = useDispatch();
  const collapsed = useSelector((state) => state.collapsed);

  const { i18n, t } = useTranslation();

  const handleImageOptionClick = (imageValue) => {
    setActiveImageOption(imageValue);
  };

  const handleColorOptionClick = (value) => {
    setActiveColorOption(value);
  };

  const handleToggleCollapsed = () => {
    dispatch(toggleCollapsed());
  };

  const handleOpenSettings = () => {
    setIsModalSettingsOpen(true);
  };

  const handleSettingsOk = () => {
    setIsModalSettingsOpen(false);
  };

  const onChangeLang = (value) => {
    i18n.changeLanguage(value);
  };

  const onChange = (e) => {
    console.log(e.target.value);
    setColorValue(e.target.value);
  };

  const MENU_DROPDOWN_ITEMS = [
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
      onClick: handleOpenSettings,
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

      <Modal
        title="Settings"
        open={isModalSettingsOpen}
        onCancel={handleSettingsOk}
        footer={null}
      >
        <Row>
          <Col span={24} className={cx("modal__settings--col")}>
            <span className={cx("modal__settings--label")}>Language: </span>

            <Select
              className={cx("modal__settings--select")}
              defaultValue={"ENG"}
              onSelect={onChangeLang}
              size="large"
            >
              {LANGUAGES.map((language) => (
                <Select.Option key={language.code} value={language.code}>
                  <div className={cx("modal__settings--option")}>
                    <img src={language.icon} />
                    <span>{language.label}</span>
                  </div>
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col span={24} className={cx("modal__settings--col")}>
            <span className={cx("modal__settings--label")}>Color filters:</span>

            <div className={cx("modal__settings--radio")}>
              {COLOR_FILTERS.map((item) => (
                <span
                  key={item.value}
                  className={cx("radio__option", `${item.name}`, {
                    active: activeColorOption === item.value,
                  })}
                  value={item.value}
                  onClick={() => handleColorOptionClick(item.value)}
                ></span>
              ))}
            </div>
          </Col>

          <Col
            span={24}
            className={cx("modal__settings--col")}
            style={{ alignItems: "flex-start" }}
          >
            <span className={cx("modal__settings--label")}>Images:</span>

            <div className={cx("img__choose")}>
              {IMAGE_FILTERS.map((item) => (
                <img
                  key={item.value}
                  className={cx("img__choose--option", {
                    active: activeImageOption === item.value,
                  })}
                  src={item.value}
                  value={item.value}
                  alt={item.value}
                  onClick={() => handleImageOptionClick(item.value)}
                />
              ))}
            </div>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default Header;
