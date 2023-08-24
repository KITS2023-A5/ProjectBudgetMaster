import Layout, { Content } from "antd/es/layout/layout";
import Footer from "../../layouts/footer";
import Sidebar from "../../layouts/sidebar";
import Header from "../../layouts/header";
import { Input, Space, Typography } from "antd";
import { MdFastfood, MdHealthAndSafety } from "react-icons/md";
import { FaTruckMoving, FaGamepad, FaUser, FaShower } from "react-icons/fa";
import { RiMoneyPoundCircleFill } from "react-icons/ri";
import { SiWebmoney } from "react-icons/si";
import { BiSolidAddToQueue } from "react-icons/bi";
import React, { useState } from "react";
import {Modal, ColorPicker} from "antd";

const { Title, Text } = Typography;

function Category() {
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
  return (
    <>
      <Layout>
        <Sidebar />
        <Layout>
          <Header />

          <Content
            style={{
              padding: "1rem 4rem 4rem 4rem",
              backgroundImage:
                "url(/src/assets/images/background-category.jpg)",
              backgroundSize: "cover",
            }}
          >
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Title level={2} style={{ textAlign: "center" }}>
                List of Category
              </Title>
              <Title level={3}>Expense</Title>
              <Space
                direction="vertical"
                style={{ width: "100%", textAlign: "center" }}
              >
                <Space>
                  <Space
                    direction="vertical"
                    style={{ padding: "1rem 10rem 3rem 10rem" }}
                  >
                    <MdFastfood size={100} className="Eat-icon" color="#FED7D7"/>
                    <Title level={3}>Eating</Title>
                  </Space>
                  <Space
                    direction="vertical"
                    style={{ padding: "1rem 10rem 3rem 10rem" }}
                  >
                    <FaShower size={100} className="Activity-icon" color="#FEB2B2"/>
                    <Title level={3}>Daily Activities</Title>
                  </Space>
                  <Space
                    direction="vertical"
                    style={{ padding: "1rem 10rem 3rem 10rem" }}
                  >
                    <FaTruckMoving size={100} className="Moving-icon" color="#FC8181"/>
                    <Title level={3}>Moving</Title>
                  </Space>
                </Space>
                <Space>
                  <Space
                    direction="vertical"
                    style={{ padding: "1rem 10rem 3rem 10rem" }}
                  >
                    <FaGamepad size={100} className="Entertainment-icon" color="#F56565" />
                    <Title level={3}>Entertainment</Title>
                  </Space>
                  <Space
                    direction="verticalv"
                    style={{ padding: "1rem 10rem 3rem 10rem" }}
                  >
                    <FaUser size={100} className="Self-dev-icon" color="#E53E3E"/>
                    <Title level={3}>Self Development</Title>
                  </Space>
                  <Space
                    direction="vertical"
                    style={{ padding: "1rem 10rem 3rem 10rem" }}
                  >
                    <MdHealthAndSafety size={100} className="Heath-con" color="#C53030" />
                    <Title level={3}>Healthy</Title>
                  </Space>
                </Space>
              </Space>

              <Title level={3}>Income</Title>
              <Space
                direction="vertical"
                style={{ width: "100%", textAlign: "center" }}
              >
                <Space>
                  <Space
                    direction="vertical"
                    style={{ padding: "1rem 15rem 3rem 15rem" }}
                  >
                    <RiMoneyPoundCircleFill size={100} color="#00AA00"/>
                    <Title level={3}>Salary</Title>
                  </Space>
                  <Space
                    direction="vertical"
                    style={{ padding: "1rem 15rem 3rem 15rem" }}
                  >
                    <SiWebmoney size={100} color="#006600"/>
                    <Title level={3}>Extra Income</Title>
                  </Space>
                </Space>
              </Space>

              <Space >
                <BiSolidAddToQueue size={30} onClick={showModal} />
                <Title level={3}>Add Category</Title>
              </Space>
              <Modal
                title="Create Category "
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <div style={{margin:20}}>
                  <label>Category Name</label>
                  <Input></Input>
                </div>
                <div style={{margin:20}}>
                  <label>Category color</label>
                </div>
                <div style={{margin:20}}>
                  <Space>
                      <ColorPicker size="large" showText />
                  </Space>
                </div>
              </Modal>
            </Space>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </>
  );
}

export default Category;
