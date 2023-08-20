import classNames from "classnames/bind";
import Footer from "../../layouts/footer";
import Header from "../../layouts/header";
import Sidebar from "../../layouts/sidebar";
import styles from "./statistic.module.scss";
import { Card, Col, Layout, Row, Statistic } from "antd";
import { Content } from "antd/es/layout/layout";
import {
  FaMoneyBillTrendUp,
  FaPersonArrowDownToLine,
  FaPersonArrowUpFromLine,
} from "react-icons/fa6";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

const cx = classNames.bind(styles);

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderWidth: 1,
    },
  ],
};

const datasetLabel = {
  ["numIncome"]: {
    label: "Income",
    color: "#66bb6a",
  },
  ["numExpense"]: {
    label: "Expense",
    color: "#ef5350",
  },
  ["numProfit"]: {
    label: "Profit",
    color: "#00acc1",
  },
};

const StatisticPage = () => {
  return (
    <>
      <div className={cx("statisticpage")}>
        <Layout>
          <Sidebar />

          <Layout>
            <Header />

            <Content className={cx("statisticpage__wide")}>
              <section className={cx("statisticpage__wrapper")}>
                <h4 className={cx("statisticpage__title")}>Statistic</h4>

                <div className={cx("statisticpage__content")}>
                  <Row gutter={16}>
                    <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                      <Card bordered={false} className={cx("statistic__card")}>
                        <Statistic
                          title={datasetLabel["numIncome"].label}
                          value={1000}
                          valueStyle={{
                            color: datasetLabel["numIncome"].color,
                          }}
                          prefix={<FaPersonArrowUpFromLine />}
                        />
                      </Card>
                    </Col>

                    <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                      <Card bordered={false} className={cx("statistic__card")}>
                        <Statistic
                          title={datasetLabel["numExpense"].label}
                          value={1000}
                          valueStyle={{
                            color: datasetLabel["numExpense"].color,
                          }}
                          prefix={<FaPersonArrowDownToLine />}
                        />
                      </Card>
                    </Col>

                    <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                      <Card bordered={false} className={cx("statistic__card")}>
                        <Statistic
                          title={datasetLabel["numProfit"].label}
                          value={1000}
                          valueStyle={{
                            color: datasetLabel["numProfit"].color,
                          }}
                          prefix={<FaMoneyBillTrendUp />}
                        />
                      </Card>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                      <Pie
                        options={{
                          responsive: true,
                        }}
                        data={data}
                      />
                    </Col>

                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                      <Pie
                        options={{
                          responsive: true,
                        }}
                        data={data}
                      />
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

export default StatisticPage;
