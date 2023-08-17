import classNames from "classnames/bind";
import styles from "./signup.module.scss";
import FormComponent from "../../components/form";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
} from "antd";
import {
  FaCalendarDays,
  FaEnvelope,
  FaLock,
  FaPhoneFlip,
  FaTransgender,
  FaUser,
  FaUserPlus,
} from "react-icons/fa6";
import { GENDERS } from "../../constants";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  EmailRegExp,
  PasswordRegExp,
  PhoneRegExp,
  UsernameRegExp,
} from "../../utils/validation";

const cx = classNames.bind(styles);

const SignupPage = () => {
  const [formSignup] = Form.useForm();

  const [agreementChecked, setAgreementChecked] = useState(false);

  useEffect(() => {
    document.title = "Sign up";
  }, []);

  const onFinish = (values) => {
    // TODO: api signup hear
    console.log("Received values of form: ", values);
  };

  return (
    <>
      <div className={cx("register__over")}>
        <div className={cx("register__wrapper")}>
          <h2 className={cx("register__title")}>Sign up</h2>
          <FormComponent
            name="register"
            className={cx("register__form")}
            onFinish={onFinish}
            form={formSignup}
          >
            <Row gutter={16}>
              <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please enter this field!",
                    },
                    {
                      min: 6,
                      max: 15,
                      message:
                        "The username must be between 6 and 15 characters.",
                    },
                    {
                      pattern: UsernameRegExp,
                      message:
                        "The username can only contain allowable characters including: uppercase letters, lowercase letters, digits (a-z, A-Z, 0-9), underscore, hyphen, and dot.",
                    },
                  ]}
                >
                  <Input
                    prefix={
                      <FaUserPlus
                        className={cx("site-form-item-icon input__icon")}
                        style={{ fontSize: "1.8rem", marginRight: "0.8rem" }}
                      />
                    }
                    placeholder="Enter username"
                    style={{ padding: "12px" }}
                  />
                </Form.Item>
              </Col>

              <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      // pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      pattern: EmailRegExp,
                      message: "The email is not in the correct format!",
                    },
                    {
                      required: true,
                      message: "Please enter this field!",
                    },
                  ]}
                >
                  <Input
                    prefix={
                      <FaEnvelope
                        className={cx("site-form-item-icon input__icon")}
                        style={{ fontSize: "1.8rem", marginRight: "0.8rem" }}
                      />
                    }
                    placeholder="Enter email"
                    style={{ padding: "12px" }}
                  />
                </Form.Item>
              </Col>

              <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter this field!",
                    },
                  ]}
                >
                  <Input
                    prefix={
                      <FaUser
                        className={cx("site-form-item-icon input__icon")}
                        style={{ fontSize: "1.8rem", marginRight: "0.8rem" }}
                      />
                    }
                    placeholder="Enter name"
                    style={{ padding: "12px" }}
                  />
                </Form.Item>
              </Col>

              <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                <Form.Item
                  name="phoneNumber"
                  rules={[
                    {
                      // pattern: /^0\d{9}$/,
                      pattern: PhoneRegExp,
                      message: "The phone number format is incorrect",
                    },
                    {
                      required: true,
                      message: "Please enter this field!",
                    },
                  ]}
                >
                  <Input
                    prefix={
                      <FaPhoneFlip
                        className={cx("site-form-item-icon input__icon")}
                        style={{ fontSize: "1.8rem", marginRight: "0.8rem" }}
                      />
                    }
                    placeholder="Enter phone number"
                    style={{ padding: "12px" }}
                  />
                </Form.Item>
              </Col>

              <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                <Form.Item
                  name="gender"
                  rules={[
                    {
                      required: true,
                      message: "Please select a gender",
                    },
                  ]}
                >
                  <Select
                    className={cx("register__select")}
                    allowClear
                    optionLabelProp="label"
                    placeholder={
                      <React.Fragment>
                        <FaTransgender
                          className={cx("site-form-item-icon input__icon")}
                          style={{
                            fontSize: "1.8rem",
                            marginRight: "0.8rem",
                            color: "#000",
                          }}
                        />
                        &nbsp; Select gender
                      </React.Fragment>
                    }
                    size={"large"}
                  >
                    {GENDERS?.map((data) => (
                      <Select.Option
                        value={data.value}
                        key={data.value}
                        label={
                          <React.Fragment>
                            {data.icon}
                            &nbsp;
                            {data.label}
                          </React.Fragment>
                        }
                      >
                        {data.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                <Form.Item
                  name="birth"
                  rules={[
                    {
                      required: true,
                      message: "Please select birth date",
                    },
                  ]}
                >
                  <DatePicker
                    suffixIcon={<FaCalendarDays />}
                    placeholder="Select birth date"
                    format={"DD/MM/YYYY"}
                    allowClear={false}
                    showToday={false}
                    className={cx("register__datepicker")}
                  />
                </Form.Item>
              </Col>

              <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please enter this field!",
                    },
                    {
                      min: 8,
                      pattern: PasswordRegExp,
                      message:
                        "The password must be at least 8 characters long and contain at least one special character, one uppercase letter, one lowercase letter, and one digit",
                    },
                  ]}
                >
                  <Input.Password
                    prefix={
                      <FaLock
                        className={cx("site-form-item-icon input__icon")}
                        style={{ fontSize: "1.8rem", marginRight: "0.8rem" }}
                      />
                    }
                    type="password"
                    placeholder="Enter password"
                    style={{ padding: "12px" }}
                  />
                </Form.Item>
              </Col>

              <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                <Form.Item
                  name="confirm"
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: "Please enter this field!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("The passwords do not match")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    prefix={
                      <FaLock
                        className={cx("site-form-item-icon input__icon")}
                        style={{ fontSize: "1.8rem", marginRight: "0.8rem" }}
                      />
                    }
                    type="password"
                    placeholder="Confirm password"
                    style={{ padding: "12px" }}
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item name="agreement" valuePropName="checked">
                  <Checkbox
                    onChange={(e) => setAgreementChecked(e.target.checked)}
                  >
                    I have read the{" "}
                    <Link
                      to="/privacy"
                      className={cx("register__toprivacylink")}
                    >
                      agreement
                    </Link>
                  </Checkbox>
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item style={{ marginBottom: "0rem" }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className={cx("register-form-button")}
                    disabled={!agreementChecked}
                    // loading={loading}
                  >
                    Sign up
                  </Button>
                </Form.Item>

                <div className={cx("register__or")}>
                  <span className={cx("register__ortext")}>OR</span>
                </div>
                <div className={cx("register__tologin")}>
                  Do you already have an account?{" "}
                  <Link to="/login" className={cx("register__tologinlink")}>
                    Login now!
                  </Link>
                </div>
              </Col>
            </Row>
          </FormComponent>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
