import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Layout,
  Modal,
  Row,
  Space,
  Table,
  Tooltip,
} from "antd";
import { Content } from "antd/es/layout/layout";
import classNames from "classnames/bind";
import { FaCirclePlus, FaPenToSquare, FaTrashCan } from "react-icons/fa6";
import Footer from "../../layouts/footer";
import Header from "../../layouts/header";
import Sidebar from "../../layouts/sidebar";
import styles from "./budget.module.scss";
import { useState } from "react";
import { useForm } from "antd/es/form/Form";

const cx = classNames.bind(styles);

const BudgetPage = () => {
  const [form] = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Category",
      key: "category",
      dataIndex: "category",
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      defaultSortOrder: ["descend", "ascend"],
      sorter: (a, b) => a.amount - b.amount,
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

  const datas = [
    {
      key: "1",
      category: "Food",
      description: "",
      amount: 100,
    },
    {
      key: "2",
      category: "Shopping",
      description: "vcl",
      amount: 50,
    },
    {
      key: "3",
      category: "Fee",
      description: "",
      amount: 100,
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
                    dataSource={datas}
                    // loading={loading}
                    pagination={{
                      pageSize: 5,
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
        title="Budget"
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
              style={{ padding: "12px", width: "100%" }}
            />
          </Form.Item>

          <Form.Item name="category" label="Category">
            <Input placeholder="Enter username" style={{ padding: "12px" }} />
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
            <Input placeholder="Enter amount" style={{ padding: "12px" }} />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input
              placeholder="Enter description"
              style={{ padding: "12px" }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default BudgetPage;
