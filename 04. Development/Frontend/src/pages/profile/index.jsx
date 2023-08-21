import classNames from "classnames/bind";
import styles from "./profile.module.scss";
import { Content } from "antd/es/layout/layout";
import Sidebar from "../../layouts/sidebar";
import { Col, Layout, Row, Upload } from "antd";
import Header from "../../layouts/header";
import Footer from "../../layouts/footer";
import fallbackAvatar from "../../assets/images/fallback-avt.jpg";
import {
  FaCalendarDays,
  FaCamera,
  FaClipboardUser,
  FaEnvelope,
  FaPhoneFlip,
  FaRotate,
  FaTransgender,
  FaTrashCan,
  FaUser,
  FaUserPen,
} from "react-icons/fa6";

const cx = classNames.bind(styles);

const ProfilePage = () => {
  return (
    <>
      <div className={cx("profilepage")}>
        <Layout>
          <Sidebar />

          <Layout>
            <Header />

            <Content className={cx("profilepage__wide")}>
              <section className={cx("profilepage__wrapper")}>
                <h4 className={cx("profilepage__title")}>Profile</h4>

                <div className={cx("profilepage__content")}>
                  <Row className={cx("profile__row")}>
                    <Col md={12} lg={10} xl={10}>
                      <div className={cx("profile__avatar")}>
                        <Upload
                          className={cx("profile__avatar--upload")}
                          name="avatar"
                          maxCount={1}
                          accept="image/*"
                          showUploadList={false}
                        >
                          <img
                            className={cx("profile__img")}
                            src={fallbackAvatar}
                          />
                        </Upload>
                        <FaCamera className={cx("profile__upload--icon")} />
                      </div>

                      <div className={cx("profile__username")}>username123</div>

                      <Row className={cx("profile__groupbtn")}>
                        <Col xl={16} lg={22} md={16} sm={13} xs={18}>
                          <button className={cx("profile__button")}>
                            <Row className={cx("profile__button--row")}>
                              <Col
                                className={cx("profile__button--col")}
                                span={4}
                              >
                                <FaUserPen
                                  className={cx("profile__button--icon")}
                                />
                              </Col>
                              <Col span={20}>Edit profile</Col>
                            </Row>
                          </button>
                        </Col>

                        <Col xl={16} lg={22} md={16} sm={13} xs={18}>
                          <button className={cx("profile__button")}>
                            <Row className={cx("profile__button--row")}>
                              <Col
                                className={cx("profile__button--col")}
                                span={4}
                              >
                                <FaRotate
                                  className={cx("profile__button--icon")}
                                />
                              </Col>
                              <Col span={20}>Change password</Col>
                            </Row>
                          </button>
                        </Col>

                        <Col xl={16} lg={22} md={16} sm={13} xs={18}>
                          <button className={cx("profile__button", "danger")}>
                            <Row className={cx("profile__button--row")}>
                              <Col
                                className={cx("profile__button--col")}
                                span={4}
                              >
                                <FaTrashCan
                                  className={cx("profile__button--icon")}
                                />
                              </Col>
                              <Col span={20}>Delete account</Col>
                            </Row>
                          </button>
                        </Col>
                      </Row>
                      <div className={cx("line")}></div>
                    </Col>

                    <Col md={12} lg={14} xl={14}>
                      <Row className={cx("profile__info--row")}>
                        <Col xl={18} lg={18} md={20} sm={22} xs={22}>
                          <div className={cx("profile__info")}>
                            <div className={cx("profile__info--iconwrap")}>
                              <FaClipboardUser
                                className={cx("profile__info--icon")}
                              />
                            </div>
                            <div className={cx("profile__info--text")}>
                              <div className={cx("profile__info--key")}>
                                Username
                              </div>
                              <div className={cx("profile__info--value")}>
                                username123
                              </div>
                            </div>
                          </div>
                        </Col>

                        <Col xl={18} lg={18} md={20} sm={22} xs={22}>
                          <div className={cx("profile__info")}>
                            <div className={cx("profile__info--iconwrap")}>
                              <FaEnvelope
                                className={cx("profile__info--icon")}
                              />
                            </div>
                            <div className={cx("profile__info--text")}>
                              <div className={cx("profile__info--key")}>
                                Email
                              </div>
                              <div className={cx("profile__info--value")}>
                                email@gmail.com
                              </div>
                            </div>
                          </div>
                        </Col>

                        <Col xl={18} lg={18} md={20} sm={22} xs={22}>
                          <div className={cx("profile__info")}>
                            <div className={cx("profile__info--iconwrap")}>
                              <FaUser className={cx("profile__info--icon")} />
                            </div>
                            <div className={cx("profile__info--text")}>
                              <div className={cx("profile__info--key")}>
                                Name
                              </div>
                              <div className={cx("profile__info--value")}>
                                Nguyen Van A
                              </div>
                            </div>
                          </div>
                        </Col>

                        <Col xl={18} lg={18} md={20} sm={22} xs={22}>
                          <div className={cx("profile__info")}>
                            <div className={cx("profile__info--iconwrap")}>
                              <FaCalendarDays
                                className={cx("profile__info--icon")}
                              />
                            </div>
                            <div className={cx("profile__info--text")}>
                              <div className={cx("profile__info--key")}>
                                Birthday
                              </div>
                              <div className={cx("profile__info--value")}>
                                22/05/2002
                              </div>
                            </div>
                          </div>
                        </Col>

                        <Col xl={18} lg={18} md={20} sm={22} xs={22}>
                          <div className={cx("profile__info")}>
                            <div className={cx("profile__info--iconwrap")}>
                              <FaPhoneFlip
                                className={cx("profile__info--icon")}
                              />
                            </div>
                            <div className={cx("profile__info--text")}>
                              <div className={cx("profile__info--key")}>
                                Phone
                              </div>
                              <div className={cx("profile__info--value")}>
                                0999999999
                              </div>
                            </div>
                          </div>
                        </Col>

                        <Col xl={18} lg={18} md={20} sm={22} xs={22}>
                          <div className={cx("profile__info")}>
                            <div className={cx("profile__info--iconwrap")}>
                              <FaTransgender
                                className={cx("profile__info--icon")}
                              />
                            </div>
                            <div className={cx("profile__info--text")}>
                              <div className={cx("profile__info--key")}>
                                Gender
                              </div>
                              <div className={cx("profile__info--value")}>
                                Male
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </section>
            </Content>

            <Footer />
          </Layout>
        </Layout>
      </div>
    </>
  );
};

export default ProfilePage;
