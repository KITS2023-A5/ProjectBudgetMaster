import classNames from "classnames/bind";
import styles from "./home.module.scss";
import Layout, { Content } from "antd/es/layout/layout";
import Footer from "../../layouts/footer";
import Sidebar from "../../layouts/sidebar";
import Header from "../../layouts/header";

const cx = classNames.bind(styles);

const HomePage = () => {
  return (
    <>
      <div className={cx("homepage")}>
        <Layout>
          <Sidebar />

          <Layout>
            <Header />

            <Content>
              <h1 className={cx("title")}>Hello this is home page</h1>
              <div className={cx("home_test")}>
                <span>Hello</span>
              </div>
            </Content>

            <Footer />
          </Layout>
        </Layout>
      </div>
    </>
  );
};

export default HomePage;
