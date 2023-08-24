import classNames from "classnames/bind";
import styles from "./customer-behavior-analytics.module.scss";
import Layout, { Content } from "antd/es/layout/layout";
import Footer from "../../layouts/footer";
import Sidebar from "../../layouts/sidebar";
import Header from "../../layouts/header";
import { Space, Typography } from "antd";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import BarChart from "./chart";
const { Title } = Typography;
Chart.register(CategoryScale);
const cx = classNames.bind(styles);

const CustomerBehaviorAnalyticsPage = ({ chartData }) => {

  return (
    <>
      <div className={cx("homepage")}>
        <Layout>
          <Sidebar />

          <Layout>
            <Header />

            <Content className={cx("homepage__wide")}>
              <Space
                direction="vertical"
                size="middle"
                className={cx("customerBehavior__content")}
              >
                <Title>Welcome to customer behavior analytics</Title>
                <div className="Chart">
                  <BarChart chartData={chartData} />
                </div>
              </Space>
            </Content>

            <Footer />
          </Layout>
        </Layout>
      </div>
    </>
  );
};

export default CustomerBehaviorAnalyticsPage;
