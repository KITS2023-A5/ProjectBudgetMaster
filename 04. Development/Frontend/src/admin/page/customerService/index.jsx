import classNames from "classnames/bind";
import styles from "./customer-service.module.scss";
import Layout, { Content } from "antd/es/layout/layout";
import Footer from "../../layouts/footer";;
import Sidebar from "../../layouts/sidebar";
import Header from "../../layouts/header";
import { Space, Table, Typography,Input, Button, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useState } from "react";

const { Title, Text } = Typography;
const cx = classNames.bind(styles);

const CustomerServicePage = () => {
    const [inputValue, setInputValue] = useState("");
    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Content',
            dataIndex: 'content',
            key: 'content',
        },      
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
    ];


    const dataSource = [
        {
            key: '1',
            username: 'linhsocute',
            date: '29/10/2001',
            content: 'This is content',
            status: 'read',
        },
        {
            key: '2',
            username: 'linhsocute',
            date: '29/10/2001',
            content: 'This is content',
            status: 'read',
        },
        {
            key: '3',
            username: 'linhsocute',
            date: '29/10/2001',
            content: 'This is content',
            status: 'read',
        },
    ];
    const handelSearch = () =>{
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

                        <Content className={cx("customerService__wide")}>
                            <Space direction="vertical" size="middle" className={cx("customerService__content")}>
                                <Title level={2}>Welcome to customer service</Title>
                                <Space>
                                    <Input onChange={(e)=>setInputValue(e.target.value)} suffix={<SearchOutlined />} placeholder="Search"/>
                                    <Button onClick={()=>handelSearch()}>Search</Button>
                                </Space>
                                <Space>
                                    <Text>Start date:</Text>
                                    <DatePicker></DatePicker>
                                    <Text>End date:</Text>
                                    <DatePicker></DatePicker>
                                </Space>
                                <Table dataSource={dataSource} columns={columns} />
                            </Space>
                        </Content>

                        <Footer />
                    </Layout>
                </Layout>
            </div>
        </>
    );
};

export default CustomerServicePage;
