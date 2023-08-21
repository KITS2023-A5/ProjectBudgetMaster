import classNames from "classnames/bind";
import styles from "./resetPassword.module.scss";
import FormComponent from "../../components/form";
import { FaRegEnvelope } from "react-icons/fa6";
import { Button, Col, Form, Input, Row } from "antd";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const cx = classNames.bind(styles);

const ResetPasswordPage = () => {
  useEffect(() => {
    document.title = "Forgot password";
  }, []);

  return (
    <>
      <div className={cx("reset-password__over")}>
        <div className={cx("reset-password__wrapper")}>
          <h2 className={cx("reset-password__title")}>Reset Password</h2>
          <FormComponent
            name="reset_password"
            className={cx("reset-password__form")}
            onFinish={() => {}}
          >
            <Form.Item name="email">
              <Input
                prefix={
                  <FaRegEnvelope
                    className={cx("site-form-item-icon input__icon")}
                    style={{ fontSize: "1.8rem", marginRight: "0.8rem" }}
                  />
                }
                placeholder="Enter your email"
                style={{ padding: "12px" }}
              />
            </Form.Item>

            <Form.Item>
              <Row gutter={16}>
                <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Button
                    type="default"
                    htmlType="cancel"
                    className={cx("reset-password-form-button__cancel")}
                  >
                    <Link to="/login">Cancel</Link>
                  </Button>
                </Col>
                <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className={cx("reset-password-form-button__submit")}
                    // loading={loading}
                  >
                    Reset password
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </FormComponent>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;
