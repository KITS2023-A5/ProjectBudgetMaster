import classNames from "classnames/bind";
import styles from "./login.module.scss";
import { Button, Checkbox, Form, Input } from "antd";
import FormComponent from "../../components/form";
import { Link } from "react-router-dom";
import { FaLock, FaUserLarge } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useEffect } from "react";

const cx = classNames.bind(styles);

const LoginPage = () => {
  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <>
      <div className={cx("login__over")}>
        <div className={cx("login__wrapper")}>
          <h2 className={cx("login__title")}>Login</h2>
          <FormComponent
            name="normal_login"
            className={cx("login__form")}
            initialValues={{
              remember: true,
            }}
            onFinish={() => {}}
          >
            <Form.Item
              name="account"
              rules={[
                {
                  required: true,
                  message: "Please enter this field!",
                },
              ]}
            >
              <Input
                prefix={
                  <FaUserLarge
                    className={cx("site-form-item-icon input__icon")}
                    style={{ fontSize: "1.8rem", marginRight: "0.8rem" }}
                  />
                }
                placeholder="Username or email"
                style={{ padding: "12px" }}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter this field!",
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
                placeholder="Password"
                style={{ padding: "12px" }}
              />
            </Form.Item>

            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Link className={cx("login-form-forgot")} to="/resetPassword">
                Forgot password
              </Link>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={cx("login-form-button")}
                // loading={loading}
              >
                Login
              </Button>

              <div className={cx("login__toregister")}>
                Do not have an account?{" "}
                <Link to="/signup" className={cx("login__toregisterlink")}>
                  Sign up now!
                </Link>
              </div>

              <div className={cx("login__or")}>
                <span className={cx("login__ortext")}>OR</span>
              </div>

              <button
                className={cx("btn_login-google")}
                // onClick={(e) => {
                //   e.preventDefault();
                //   login();
                // }}
              >
                <FcGoogle />
                <p>Sign in with Google</p>
              </button>
            </Form.Item>
          </FormComponent>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
