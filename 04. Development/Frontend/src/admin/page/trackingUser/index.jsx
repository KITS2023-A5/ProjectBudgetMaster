import classNames from "classnames/bind";
import styles from "./tracking-user.module.scss";
import Layout, { Content } from "antd/es/layout/layout";
import Footer from "../../layouts/footer";
import Sidebar from "../../layouts/sidebar";
import Header from "../../layouts/header";
import { useState } from "react";
import { Space, Table, Typography, Input, Button, DatePicker } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const cx = classNames.bind(styles);
const columns = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Expense",
    dataIndex: "expense",
    key: "expense",
  },
  {
    title: "Income",
    dataIndex: "income",
    key: "income",
  },
  {
    title: "Spending Rate",
    dataIndex: "spendingRate",
    key: "spendingRate",
  },
];
const data = [
  {
    key: "1",
    username: "Nguyen Thi Linh",
    expense: 16011995,
    income: 16011995,
    spendingRate: 16011995,
  },
  {
    key: "2",
    username: "Nguyen Ngoc Linh",
    expense: 16011995,
    income: 16011995,
    spendingRate: 16011995,
  },
  {
    key: "3",
    username: "Dang Thai Son",
    expense: 16011995,
    income: 16011995,
    spendingRate: 16011995,
  },
];
const TrackingUserPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [displayData, setDisplayData] = useState(data);
  
const handleSearch = () => {
  const newDataDisplay = data.filter((a) => a.username.includes(inputValue));
  setDisplayData(newDataDisplay);
}


  return (
    <>
      <div className={cx("homepage")}>
        <Layout>
          <Sidebar />

          <Layout>
            <Header />

            <Content className={cx("trackingUser__wide")}>
              <Space
                direction="vertical"
                size="middle"
                className={cx("trackingUser__content")}
              >
                <Title level={2}>Welcome to tracking user</Title>
                <Space>
                  <Input
                    onChange={(e) => setInputValue(e.target.value)}
                    suffix={<SearchOutlined />}
                    placeholder="Search"
                  />
                  {/* {console.log(value)} */}
                  <Button onClick={() => handleSearch()}>Search</Button>
                </Space>
                <Space>
                  <DatePicker picker="month" bordered={true} />
                  <DatePicker picker="year" bordered={true} />{" "}
                </Space>
                <Table dataSource={displayData} columns={columns} />
              </Space>
            </Content>

            <Footer />
          </Layout>
        </Layout>
      </div>
    </>
  );
};

export default TrackingUserPage;
