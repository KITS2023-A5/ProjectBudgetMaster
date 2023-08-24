import classNames from "classnames/bind";
import styles from "./home.module.scss";
import Layout, { Content } from "antd/es/layout/layout";
import Footer from "../../layouts/footer";;
import Sidebar from "../../layouts/sidebar";
import Header from "../../layouts/header";
import { Col, Row } from "antd";
import logoImg from "../../../assets/images/logo1600.png";
import { HOME_INTRO } from "../../../constants/adminConstants";

const cx = classNames.bind(styles);

const AdminHomePage = () => {
    return (
        <>
            <div className={cx("homepage")}>
                <Layout>
                    <Sidebar />

                    <Layout>
                        <Header />

                        <Content className={cx("homepage__wide")}>
                            <section className={cx("homepage__wrapper")}>
                                <Row className={cx("homepage__row")}>
                                    <Col md={12} lg={8} xl={8} className={cx("logo_col")}>
                                        <div className={cx("homepage__logo")}>
                                            <img
                                                src={logoImg}
                                                alt="logo"
                                                className={cx("homepage__logo--img")}
                                            />
                                        </div>
                                    </Col>
                                </Row>

                                <Row className={cx("homepage__row")} gutter={24}>
                                    {HOME_INTRO.map((item) => (
                                        <Col
                                            xs={10}
                                            sm={16}
                                            md={10}
                                            lg={8}
                                            xl={6}
                                            key={item.name}
                                            className={cx("homepage__col")}
                                        >
                                            <div className={cx("homepage__card")}>
                                                <div className={cx("homepage__card--inner")}>
                                                    <div
                                                        className={cx(
                                                            "homepage__card--center",
                                                            `${item.color}`
                                                        )}
                                                    >
                                                        <span className={cx("homepage__card--number")}>
                                                            {item.number}
                                                        </span>

                                                        <div className={cx("homepage__card--head")}>
                                                            <span className={cx("homepage__card--icon")}>
                                                                {item.icon}
                                                            </span>
                                                            <h4 className={cx("homepage__card--title")}>
                                                                {item.name}
                                                            </h4>
                                                        </div>
                                                        <div className={cx("homepage__card--desc")}>
                                                            {item.desc}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </section>
                        </Content>

                        <Footer />
                    </Layout>
                </Layout>
            </div>
        </>
    );
};

export default AdminHomePage;
