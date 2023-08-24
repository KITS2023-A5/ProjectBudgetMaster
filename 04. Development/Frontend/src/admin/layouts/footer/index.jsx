import { Col, Row } from "antd";
import classNames from "classnames/bind";
import { FaHeart } from "react-icons/fa6";
import { SOCIAL_ICON } from "../../../constants";
import styles from "./footer.module.scss";

const cx = classNames.bind(styles);

const Footer = () => {
  return (
    <>
      <footer className={cx("footer")}>
        <Row className={cx("footer__row")}>
          <Col className={cx("footer__col")} xs={24} sm={24} md={12} lg={12}>
            <div className={cx("footer__brand")}>
              Made with
              <FaHeart className={cx("footer__branch--icon")} />
              &nbsp;
              <span className={cx("footer__branch--dot")}>·</span>
              &nbsp;Powered by
              <span className={cx("footer__branch--name")}>
                &nbsp;KITS2023_A5
              </span>
            </div>
          </Col>

          <Col className={cx("footer__col")} xs={24} sm={24} md={12} lg={12}>
            <Row className={cx("footer__social--row")}>
              {SOCIAL_ICON?.map((item) => (
                <Col
                  xs={3}
                  sm={2}
                  md={2}
                  lg={2}
                  key={item.name}
                  className={cx("footer__social--col")}
                >
                  <a href={item.link} target="_blank" rel="noreferrer">
                    <span className={cx("footer__social--icon")}>
                      {item.icon}
                    </span>
                  </a>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </footer>
    </>
  );
};

export default Footer;
