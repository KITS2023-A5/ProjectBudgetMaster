import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Layout,
  Modal,
  Pagination,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
  notification,
} from "antd";
import { Content } from "antd/es/layout/layout";
import classNames from "classnames/bind";
import { FaCirclePlus, FaPenToSquare, FaTrashCan } from "react-icons/fa6";
import Footer from "../../layouts/footer";
import Header from "../../layouts/header";
import Sidebar from "../../layouts/sidebar";
import styles from "./budget.module.scss";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { useDispatch, useSelector } from "react-redux";
import {
  requestCreateBudget,
  requestDeleteBudget,
  requestGetAllbudget,
  requestUpdateBudget,
} from "../../redux/slices/budgetSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { requestGetAllCategory } from "../../redux/slices/categorySlice";
import dayjs from "dayjs";
import moment from "moment/moment";

const cx = classNames.bind(styles);

const BudgetPage = () => {
  const [form] = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [budgetDatas, setBudgetDatas] = useState([]);
  const [categoryDatas, setCategoryDatas] = useState([]);
  const [valueEdit, setValueEdit] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [totalBudgets, setTotalBudgets] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const dispatch = useDispatch();
  const budgets = useSelector((state) => state.budget.budgets);
  const totalCount = useSelector((state) => state.budget.totalCount);
  const loading = useSelector((state) => state.budget.loading);

  const showModal = () => {
    setIsModalOpen(true);
    setValueEdit(undefined);
    setIsEdit(false);
  };

  const handleOk = () => {
    form.validateFields().then(async (value) => {
      try {
        if (!isEdit) {
          const data = await dispatch(
            requestCreateBudget({
              description: value.description,
              amount: value.amount,
              startDate: value.time,
              endDate: value.time,
              categoryId: value.category,
            })
          );
          unwrapResult(data);
        } else if (valueEdit.budgetId) {
          const data = await dispatch(
            requestUpdateBudget({
              budgetId: valueEdit.budgetId,
              categoryId: valueEdit.category.categoryId,
              description: value.description,
              amount: value.amount,
              startDate: value.time,
              endDate: value.time,
            })
          );
          unwrapResult(data);
        }
        loadAllBudget();
        handleCancel();

        notification.success({
          message: !isEdit ? "Created successfully" : " Updated successfully",
          duration: 1.5,
        });
      } catch (error) {
        notification.error({
          message: "Created error",
        });
      }
    });
    setIsModalOpen(false);
  };

  const handleDeleteBudget = async (budgetId) => {
    try {
      budgetId;
      const data = await dispatch(
        requestDeleteBudget({
          budgetId,
        })
      );
      unwrapResult(data);
      loadAllBudget();
      notification.success({
        message: "Delete successfully",
        duration: 1.5,
      });
    } catch (error) {
      notification.error({
        message: "Delete error",
        duration: 1.5,
      });
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setValueEdit(undefined);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (valueEdit) {
      form.setFieldsValue({
        time: moment(valueEdit.endDate),
        category: valueEdit?.category.categoryId,
        amount: valueEdit?.amount,
        description: valueEdit?.description,
      });
      console.log(valueEdit);
    }
  }, [valueEdit]);

  useEffect(() => {
    loadAllCategory();
  }, []);

  useEffect(() => {
    loadAllBudget(currentPage - 1, pageSize);
  }, [currentPage, pageSize]);

  const loadAllBudget = async (currentPage, pageSize) => {
    try {
      const result = await dispatch(
        requestGetAllbudget({ page: currentPage, size: pageSize })
      );
      const res = unwrapResult(result);
      setTotalBudgets(res.totalBudgets);
      setBudgetDatas(res.budgets.map((e) => ({ ...e, key: e.budgetId })));
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
      setCategoryDatas(res.map((e) => ({ ...e })));
    } catch (error) {
      notification.error({
        message: "Load category error",
      });
    }
  };

  const handleChangePage = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const columns = [
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
      title: "Description",
      key: "description",
      dataIndex: "description",
      ellipsis: true,
      responsive: ["md"],
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      // defaultSortOrder: ["descend", "ascend"],
      sorter: (a, b) => a.amount - b.amount,
      ellipsis: true,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="small">
          <Tooltip placement="top" title="Edit">
            <Button
              className={cx("action__btn")}
              onClick={() => {
                setIsModalOpen(true);
                setValueEdit(text);
                setIsEdit(true);
              }}
            >
              <FaPenToSquare className={cx("action__icon")} />
            </Button>
          </Tooltip>
          <Popconfirm
            placement="bottomRight"
            title="Are you sure?"
            onConfirm={() => {
              handleDeleteBudget(text.budgetId);
            }}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip placement="top" title="Delete">
              <Button className={cx("action__btn")}>
                <FaTrashCan className={cx("action__icon")} />
              </Button>
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className={cx("budgetpage")}>
        <Layout>
          <Sidebar />

          <Layout>
            <Header />

            <Content className={cx("budgetpage__wide")}>
              <section className={cx("budgetpage__wrapper")}>
                <h4 className={cx("budgetpage__title")}>Budget</h4>

                <div className={cx("budgetpage__content")}>
                  <Row style={{ marginBottom: "2rem" }}>
                    <Col
                      xl={8}
                      lg={8}
                      md={24}
                      sm={24}
                      xs={24}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "1rem",
                      }}
                    >
                      <div className={cx("budgetpage__label")}>Time budget</div>
                      <DatePicker
                        className={cx("budgetpage__datepicker")}
                        format={"MM/YYYY"}
                        picker="month"
                      />
                    </Col>

                    <Col
                      xl={8}
                      lg={8}
                      md={12}
                      sm={24}
                      xs={24}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "1rem",
                      }}
                    >
                      Total: 8000
                    </Col>

                    <Col
                      xl={8}
                      lg={8}
                      md={12}
                      sm={24}
                      xs={24}
                      style={{
                        justifyContent: "center",
                        display: "flex",
                        marginBottom: "1rem",
                      }}
                    >
                      <button
                        className={cx("budgetpage__button")}
                        onClick={showModal}
                      >
                        <FaCirclePlus
                          className={cx("budgetpage__button--icon")}
                        />
                        Add budget
                      </button>
                    </Col>
                  </Row>

                  <Table
                    className={cx("budgetpage__table")}
                    columns={columns}
                    dataSource={budgetDatas}
                    loading={loading}
                    pagination={false}
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
                </div>
              </section>
            </Content>

            <Footer />
          </Layout>
        </Layout>
      </div>

      <Modal
        title={isEdit ? "Edit Budget" : "Create Budget"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} name="addbudget" layout="vertical">
          <Form.Item name="time" label="Time start - Time end">
            <DatePicker
              className={cx("budgetpage__datepicker")}
              format={"MM/YYYY"}
              picker="month"
              style={{ width: "100%" }}
              size="large"
            />
          </Form.Item>

          <Form.Item name="category" label="Category">
            <Select size="large" style={{ width: "100%" }}>
              {categoryDatas.map((item) => (
                <Select.Option
                  key={item.categoryId}
                  value={item.categoryId}
                  mode="tags"
                >
                  <Tag color={item.colorCode}>{item.name.toUpperCase()}</Tag>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="amount"
            label="Amount"
            rules={[
              {
                required: true,
                message: "Please enter this field!",
              },
            ]}
          >
            <Input
              placeholder="Enter amount"
              size="large"
              type="number"
              min={0}
            />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input placeholder="Enter description" size="large" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default BudgetPage;
