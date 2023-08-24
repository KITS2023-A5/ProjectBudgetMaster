import classNames from "classnames/bind";
import styles from "./transaction.module.scss";
import { Content } from "antd/es/layout/layout";
import Footer from "../../layouts/footer";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Layout,
  Row,
  Select,
  Space,
  Table,
  Tooltip,
} from "antd";
import Sidebar from "../../layouts/sidebar";
import Header from "../../layouts/header";
import { useForm } from "antd/es/form/Form";
import { TRANSACTION_TYPE } from "../../constants";
import Upload from "antd/es/upload/Upload";
import { FaPenToSquare, FaTrashCan } from "react-icons/fa6";
import moment from "moment";

const cx = classNames.bind(styles);

const TransactionPage = () => {
  const [form] = useForm();

  const columns = [
    {
      title: "Type",
      key: "type",
      dataIndex: "type",
      ellipsis: true,
    },
    {
      title: "Category",
      key: "category",
      dataIndex: "category",
      ellipsis: true,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      defaultSortOrder: ["descend", "ascend"],
      sorter: (a, b) => a.amount - b.amount,
      ellipsis: true,
    },
    {
      title: "Date",
      dataIndex: "date",
      defaultSortOrder: ["descend", "ascend"],
      sorter: (a, b) => a.date - b.date,
      ellipsis: true,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Tooltip placement="top" title="Edit">
            <Button className={cx("action__btn")} onClick={showModal}>
              <FaPenToSquare className={cx("action__icon")} />
            </Button>
          </Tooltip>
          <Tooltip placement="top" title="Delete">
            <Button className={cx("action__btn")}>
              <FaTrashCan className={cx("action__icon")} />
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className={cx("transactionpage")}>
        <Layout>
          <Sidebar />

          <Layout>
            <Header />

            <Content className={cx("transaction__wide")}>
              <section className={cx("transaction__wrapper")}>
                <h4 className={cx("transaction__title")}>Transaction</h4>

                <div className={cx("transaction__content")}>
                  <Row>
                    <Col span={24}>
                      <Card
                        title={"Create transaction"}
                        className={cx("transaction__card", "card__top")}
                      >
                        <Form
                          form={form}
                          name="transactionForm"
                          layout="vertical"
                        >
                          <Row gutter={16}>
                            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                              <Form.Item
                                name="Type"
                                label={"Type"}
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter this field!",
                                  },
                                ]}
                              >
                                <Select
                                  className={cx("register__select")}
                                  allowClear
                                  optionLabelProp="label"
                                  size={"large"}
                                >
                                  {TRANSACTION_TYPE?.map((data) => (
                                    <Select.Option
                                      value={data.value}
                                      key={data.value}
                                    >
                                      {data.label}
                                    </Select.Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </Col>

                            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                              <Form.Item
                                name="Category"
                                label={"Category"}
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter this field!",
                                  },
                                ]}
                              >
                                <Select
                                  className={cx("register__select")}
                                  allowClear
                                  optionLabelProp="label"
                                  size={"large"}
                                >
                                  {TRANSACTION_TYPE?.map((data) => (
                                    <Select.Option
                                      value={data.value}
                                      key={data.value}
                                    >
                                      {data.label}
                                    </Select.Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </Col>

                            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                              <Form.Item
                                name="Amount"
                                label={"Amount"}
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter this field!",
                                  },
                                ]}
                              >
                                <Input size="large" />
                              </Form.Item>
                            </Col>

                            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                              <Form.Item
                                name="Date"
                                label={"Date"}
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter this field!",
                                  },
                                ]}
                              >
                                <DatePicker
                                  size="large"
                                  placeholder=""
                                  style={{ width: "100%" }}
                                />
                              </Form.Item>
                            </Col>

                            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                              <Form.Item
                                name="Description"
                                label={"Description"}
                              >
                                <Input size="large" />
                              </Form.Item>
                            </Col>

                            {/* <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                              <Form.Item name="Receipt" label={"Receipt"}>
                                <Upload>
                                  <button>Click to Upload</button>
                                </Upload>
                              </Form.Item>
                            </Col> */}

                            <Col
                              span={24}
                              style={{
                                justifyContent: "flex-end",
                                display: "flex",
                              }}
                            >
                              <button className={cx("transaction__button")}>
                                Create
                              </button>
                            </Col>
                          </Row>
                        </Form>
                      </Card>

                      <Card
                        title={"Transaction"}
                        className={cx("transaction__card")}
                      >
                        <div className={cx("transaction__dateselect")}>
                          <div className={cx("transaction__label")}>Time:</div>
                          <DatePicker.RangePicker
                            format={"DD/MM/YYYY"}
                            size="large"
                            disabledDate={(current) => {
                              return current && current > moment().endOf("day");
                            }}
                          />
                        </div>
                        <Table
                          className={cx("transaction__table")}
                          columns={columns}
                          // dataSource={datas}
                          pagination={{
                            pageSize: 5,
                          }}
                          scroll={{ x: 500 }}
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

export default TransactionPage;
