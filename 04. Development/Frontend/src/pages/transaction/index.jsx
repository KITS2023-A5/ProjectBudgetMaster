import classNames from "classnames/bind";
import styles from "./transaction.module.scss";
import { Content } from "antd/es/layout/layout";
import Footer from "../../layouts/footer";
import { Layout } from "antd";
import Sidebar from "../../layouts/sidebar";
import Header from "../../layouts/header";

const cx = classNames.bind(styles);

const TransactionPage = () => {
  return (
    <>
      <div className={cx("transactionpage")}>
        <Layout>
          <Sidebar />

          <Layout>
            <Header />

            <Content></Content>

            <Footer />
          </Layout>
        </Layout>
      </div>
    </>
  );
};

export default TransactionPage;
