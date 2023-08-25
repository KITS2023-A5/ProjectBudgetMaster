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
  Pagination,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
  notification,
} from "antd";
import Sidebar from "../../layouts/sidebar";
import Header from "../../layouts/header";
import { useForm } from "antd/es/form/Form";
import { TRANSACTION_TYPE } from "../../constants";
import Upload from "antd/es/upload/Upload";
import { FaPenToSquare, FaTrashCan } from "react-icons/fa6";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { requestGetAllTransaction } from "../../redux/slices/transactionSlice";
import { requestGetAllCategory } from "../../redux/slices/categorySlice";
import dayjs from "dayjs";

const cx = classNames.bind(styles);

const TransactionPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [transactionDatas, setTransactionDatas] = useState([]);
  const [form] = useForm();

  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transaction.transactions);
  const categorys = useSelector((state) => state.category.categorys);
  const totalCount = useSelector((state) => state.transaction.totalCount);
  const loading = useSelector((state) => state.transaction.loading);

  useEffect(() => {
    loadAllTransaction(currentPage - 1, pageSize);
  }, [currentPage, pageSize]);

  useEffect(() => {
    // loadAllCategory();
  }, []);

  const handleChangePage = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const loadAllTransaction = async (currentPage, pageSize) => {
    try {
      const result = await dispatch(
        requestGetAllTransaction({ page: currentPage, size: pageSize })
      );
      const res = unwrapResult(result);
      // console.log({ res });
      setTransactionDatas(
        res.transactions.map((e) => ({
          ...e,
          key: e.transactionId,
        }))
      );
    } catch (error) {
      notification.error({
        message: "No results",
      });
    }
  };

  const loadAllCategory = async () => {
    try {
      const result = await dispatch(requestGetAllCategory());
      const res = unwrapResult(result);
    } catch (error) {
      notification.error({
        message: "Load category error",
      });
    }
  };

  const columns = [
    {
      title: "Type",
      key: "type",
      dataIndex: "category",
      ellipsis: true,
      render: (text) => <>{text.type}</>,
    },
    {
      title: "Category",
      key: "category",
      dataIndex: "category",
      ellipsis: true,
      render: (_, record) => (
        <>
          <Tag
            color={record.category.colorCode}
            key={record.category.categoryId}
          >
            {record.category.name.toUpperCase()}
          </Tag>
        </>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      sorter: (a, b) => a.amount - b.amount,
      ellipsis: true,
    },
    {
      title: "Date",
      dataIndex: "createdTime",
      sorter: (a, b) =>
        dayjs(a.createdTime).valueOf() - dayjs(b.createdTime).valueOf(),
      ellipsis: true,
      render: (text) => <>{dayjs(text).format("YYYY-MM-DD")}</>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Tooltip placement="top" title="Edit">
            <Button
              className={cx("action__btn")}
              onClick={() => {
                // setIsModalOpen(true);
              }}
            >
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
                          dataSource={transactionDatas}
                          pagination={false}
                          scroll={{ x: 500 }}
                          loading={loading}
                        />
                        <Pagination
                          showSizeChanger
                          onShowSizeChange={handleChangePage}
                          pageSizeOptions={[5, 10, 15]}
                          defaultPageSize={5}
                          total={totalCount}
                          onChange={handleChangePage}
                          style={{
                            marginTop: "2rem",
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
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
