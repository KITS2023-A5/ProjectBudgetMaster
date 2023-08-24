import classNames from "classnames/bind";
import styles from "./profile.module.scss";
import { Content } from "antd/es/layout/layout";
import Sidebar from "../../layouts/sidebar";
import {
  Col,
  DatePicker,
  Form,
  Input,
  Layout,
  Modal,
  Row,
  Select,
  Upload,
} from "antd";
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
import { useEffect, useState } from "react";
import { PhoneRegExp } from "../../utils/validation";
import { GENDERS } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { requestGetUserFromToken } from "../../redux/slices/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import Loading from "../../components/loading";
import moment from "moment";
import { useForm } from "antd/es/form/Form";

const cx = classNames.bind(styles);

const ProfilePage = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const loading = useSelector((state) => state.auth.loading);
  const [formEditProfile] = useForm();

  const [formChangepassword] = Form.useForm();
  const [formDeleteAccount] = Form.useForm();
  // const [formEditProfile] = Form.useForm();

  const [isModalChangePasswordOpen, setIsModalChangePasswordOpen] =
    useState(false);
  const [isModalDeleteAccountOpen, setIsModalDeleteAccountOpen] =
    useState(false);
  const [isModalEditProfileOpen, setIsModalEditProfileOpen] = useState(false);

  useEffect(() => {
    if (userInfo)
      formEditProfile.setFieldsValue({
        name: userInfo?.name,
        phoneNumber: userInfo?.phone,
        birth: userInfo?.dob ? moment(userInfo?.dob) : null,
        gender: userInfo?.gender,
      });
    console.log(userInfo);
  }, [formEditProfile, userInfo]);

  // useEffect(() => {
  //   handleGetUserInfo();
  // }, []);
  // const handleGetUserInfo = async () => {
  //   try {
  //     const actionResult = await dispatch(requestGetUserFromToken());
  //     const res = unwrapResult(actionResult);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  const handleChangePasswordOpen = () => {
    setIsModalChangePasswordOpen(true);
  };

  const handleChangePasswordOk = () => {
    setIsModalChangePasswordOpen(false);
  };

  const handleChangePasswordCancel = () => {
    formChangepassword.setFieldsValue({
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    });
    setIsModalChangePasswordOpen(false);
  };

  const handleDeleteAccountOpen = () => {
    setIsModalDeleteAccountOpen(true);
  };

  const handleDeleteAccountOk = () => {
    setIsModalDeleteAccountOpen(false);
  };

  const handleDeleteAccountCancel = () => {
    formDeleteAccount.setFieldsValue({
      deleteAcc: "",
    });
    setIsModalDeleteAccountOpen(false);
  };

  const handleEditProfileOpen = () => {
    setIsModalEditProfileOpen(true);
  };

  const handleEditProfileOk = () => {
    setIsModalEditProfileOpen(false);
  };

  const handleEditProfileCancel = () => {
    formEditProfile.setFieldsValue({
      deleteAcc: "",
    });
    setIsModalEditProfileOpen(false);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
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
                              src={
                                userInfo && userInfo.image != null
                                  ? userInfo.image
                                  : fallbackAvatar
                              }
                            />
                          </Upload>
                          <FaCamera className={cx("profile__upload--icon")} />
                        </div>

                        <div className={cx("profile__username")}>
                          {/* {userInfo && userInfo.username != null
                            ? userInfo.username
                            : " "} */}
                          {userInfo?.username}
                        </div>

                        <Row className={cx("profile__groupbtn")}>
                          <Col xl={16} lg={22} md={16} sm={13} xs={18}>
                            <button
                              className={cx("profile__button")}
                              onClick={handleEditProfileOpen}
                            >
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
                            <button
                              className={cx("profile__button")}
                              onClick={handleChangePasswordOpen}
                            >
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
                            <button
                              className={cx("profile__button", "danger")}
                              onClick={handleDeleteAccountOpen}
                            >
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
                                  {userInfo && userInfo.username != null
                                    ? userInfo.username
                                    : " "}
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
                                  {userInfo && userInfo.email != null
                                    ? userInfo.email
                                    : " "}
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
                                  {userInfo && userInfo.name != null
                                    ? userInfo.name
                                    : " "}
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
                                  {userInfo && userInfo.dob != null
                                    ? moment(userInfo.dob).format("DD-MM-YYYY")
                                    : " "}
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
                                  {userInfo && userInfo.phone != null
                                    ? userInfo.phone
                                    : " "}
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
                                  {userInfo && userInfo.gender != null
                                    ? userInfo.gender
                                    : " "}
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

          <Modal
            title="Change password"
            open={isModalChangePasswordOpen}
            onOk={handleChangePasswordOk}
            onCancel={handleChangePasswordCancel}
          >
            <Form
              form={formChangepassword}
              name="changePassword"
              layout="vertical"
            >
              <Form.Item name="password" label={"Current password"}>
                <Input
                  type="password"
                  placeholder="Current password"
                  style={{ padding: "1.2rem" }}
                />
              </Form.Item>
              <Form.Item
                name="newPassword"
                label={"New password"}
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                    message: "Please enter your new password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") !== value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new password must be different from the current password!"
                        )
                      );
                    },
                  }),
                  {
                    min: 8,
                    pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$*])/,
                    message:
                      "Password must have at least 8 characters, must contain at least one special character, one uppercase letter, one lowercase letter and one number.",
                  },
                ]}
              >
                <Input
                  type="password"
                  placeholder="New password"
                  style={{ padding: "1.2rem" }}
                />
              </Form.Item>
              <Form.Item
                name="confirmNewPassword"
                label={"Confirm new password"}
                dependencies={["newPassword"]}
                rules={[
                  {
                    required: true,
                    message: "Please enter this field!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Password does not match!")
                      );
                    },
                  }),
                ]}
              >
                <Input
                  type="password"
                  placeholder="Confirm password"
                  style={{ padding: "1.2rem" }}
                />
              </Form.Item>
            </Form>
          </Modal>

          <Modal
            title="Delete account"
            open={isModalDeleteAccountOpen}
            onOk={handleDeleteAccountOk}
            onCancel={handleDeleteAccountCancel}
          >
            <Form
              form={formDeleteAccount}
              name="deleteAccount"
              layout="vertical"
            >
              <Form.Item
                name="deleteAcc"
                label={`To confirm, type ${userInfo?.username} in the box below`}
              >
                <Input type="text" style={{ padding: "1.2rem" }} />
              </Form.Item>
            </Form>
          </Modal>

          <Modal
            title="Edit profile"
            open={isModalEditProfileOpen}
            onOk={handleEditProfileOk}
            onCancel={handleEditProfileCancel}
            // getContainer={false}
            forceRender={true}
          >
            <Form form={formEditProfile} name="editProfile" layout="vertical">
              <Form.Item name="name" label={"Name"}>
                <Input type="text" style={{ padding: "1.2rem" }} />
              </Form.Item>

              <Form.Item
                name="phoneNumber"
                label="Phone number"
                rules={[
                  {
                    pattern: PhoneRegExp,
                    message: "The phone number format is incorrect",
                  },
                  {
                    required: true,
                    message: "Please enter this field!",
                  },
                ]}
              >
                <Input style={{ padding: "1.2rem" }} />
              </Form.Item>

              <Form.Item
                name="gender"
                label={"Gender"}
                rules={[
                  {
                    required: true,
                    message: "Please select a gender",
                  },
                ]}
              >
                <Select
                  optionLabelProp="label"
                  size={"large"}
                  className={cx("modal__select--gender")}
                >
                  {GENDERS?.map((data) => (
                    <Select.Option
                      value={data.value}
                      key={data.value}
                      label={data.label}
                    >
                      {data.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="birth"
                label={"Birth"}
                rules={[
                  {
                    required: true,
                    message: "Please select birth date",
                  },
                ]}
              >
                <DatePicker
                  suffixIcon={<FaCalendarDays />}
                  placeholder=""
                  format={"DD/MM/YYYY"}
                  allowClear={false}
                  showToday={false}
                  className={cx("register__datepicker")}
                />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
