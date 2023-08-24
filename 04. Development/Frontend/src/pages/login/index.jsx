import { Button, Checkbox, Form, Input, notification } from "antd";
import classNames from "classnames/bind";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { FaLock, FaUserLarge } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/apiConfig";
import FormComponent from "../../components/form";
import styles from "./login.module.scss";
import { unwrapResult } from "@reduxjs/toolkit";
import { requestLogin } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

const cx = classNames.bind(styles);

const LoginPage = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);

  useEffect(() => {
    document.title = "Login";
  }, []);

  useEffect(() => {
    if (userInfo?.username) {
      navigator(-1);
    }
  }, [userInfo]);

  const handleLogin = async (data) => {
    try {
      const { usernameOrEmail, password } = data;
      const actionResult = await dispatch(
        requestLogin({ usernameOrEmail, password })
      );
      const res = unwrapResult(actionResult);

      switch (res.status) {
        case 200:
          Cookies.set("token", res.data.token, {
            expires: 60 * 60 * 24 * 30,
          });
          navigator("/");
          return notification.success({
            message: "Login successful",
            duration: 1.5,
          });

        default:
          return notification.error({
            message: "Login failed",
            duration: 1.5,
          });
      }
    } catch (error) {
      notification.error({
        message: "Server error",
        duration: 1.5,
      });
    }
  };

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
            onFinish={handleLogin}
          >
            <Form.Item
              name="usernameOrEmail"
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
