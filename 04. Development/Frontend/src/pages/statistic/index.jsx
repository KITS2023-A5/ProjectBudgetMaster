import { Card, Col, DatePicker, Layout, Row, Statistic } from "antd";
import { Content } from "antd/es/layout/layout";
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import classNames from "classnames/bind";
import { Chart, Line, Pie } from "react-chartjs-2";
import {
  FaMoneyBillTrendUp,
  FaPersonArrowDownToLine,
  FaPersonArrowUpFromLine,
} from "react-icons/fa6";
import Footer from "../../layouts/footer";
import Header from "../../layouts/header";
import Sidebar from "../../layouts/sidebar";
import styles from "./statistic.module.scss";
import moment from "moment";

const cx = classNames.bind(styles);

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  BarElement,
  LineElement,
  Tooltip,
  Legend,
  LineController,
  BarController
);

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

const labelStatistic = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

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
                    <Col
                      span={24}
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        marginBottom: "2rem",
                      }}
                    >
                      <div className={cx("statistic__label")}>Time</div>
                      <DatePicker
                        className={cx("statistic__datepicker")}
                        format={"MM/YYYY"}
                        picker="month"
                        disabledDate={(current) => {
                          return current && current > moment().endOf("month");
                        }}
                      />
                    </Col>

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
                      <Card
                        title={"Income Chart"}
                        bordered={false}
                        className={cx("statistic__card--chart")}
                      >
                        <Pie
                          options={{
                            responsive: true,
                          }}
                          data={data}
                        />
                      </Card>
                    </Col>

                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                      <Card
                        title={"Expense Chart"}
                        bordered={false}
                        className={cx("statistic__card--chart")}
                      >
                        <Pie
                          options={{
                            responsive: true,
                          }}
                          data={data}
                        />
                      </Card>
                    </Col>

                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                      <Card
                        title={"Statistic Chart"}
                        bordered={false}
                        className={cx("statistic__card--chart")}
                      >
                        <Chart
                          type="line"
                          data={{
                            labels: labelStatistic,
                            datasets: [
                              {
                                label: "Data 1",
                                data: [
                                  10, 20, 15, 25, 30, 28, 23, 30, 16, 21, 26,
                                  23,
                                ],
                                fill: false,
                                borderColor: "rgb(75, 192, 192)",
                                backgroundColor: "rgb(75, 192, 192)",
                                tension: 0.1,
                              },
                              {
                                label: "Data 2",
                                data: [
                                  20, 17, 25, 16, 13, 18, 23, 23, 19, 22, 24,
                                  26,
                                ],
                                fill: false,
                                borderColor: "rgb(255, 99, 132)",
                                backgroundColor: "rgb(255, 99, 132)",
                                tension: 0.1,
                              },
                            ],
                          }}
                          options={{}}
                        />
                      </Card>
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
