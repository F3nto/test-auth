import React, { useState } from "react";
import { Layout, Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import SideBar from "../components/SideBar/SideBar";
import CustomHeader from "../components/Header/Header";
import UserList from "./UserList";
import OrderList from "./OrderList";
import Logout from "../Modal/Logout"; // Import the Logout modal
import { clearToken } from "../redux/features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const { Sider, Header, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const renderContent = () => {
    switch (selectedMenuItem) {
      case "1":
        return <div>Dashboard Content</div>;
      case "2":
        return <UserList />;
      case "3":
        return <OrderList />;
      default:
        return <div>Dashboard Content</div>;
    }
  };

  const handleLogout = () => {
    dispatch(clearToken());
    setLogoutModalVisible(false);

    navigate("/");
  };

  const handleMenuClick = (key) => {
    if (key === "4") {
      setLogoutModalVisible(true);
    } else {
      setSelectedMenuItem(key);
    }
  };

  return (
    <>
      <Layout>
        <Sider
          theme="light"
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="sider h-[100vh] sticky left-0 bottom-0 top-0"
        >
          <SideBar onMenuClick={handleMenuClick} />
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            className="triger-btn text-sm w-12 h-12 fixed bottom-2 left-2"
            onClick={() => setCollapsed(!collapsed)}
          ></Button>
        </Sider>
        <Layout>
          <Header className="header p-3 bg-white ">
            <CustomHeader />
          </Header>
          <Content className="content mx-4 my-6">{renderContent()}</Content>
        </Layout>
      </Layout>
      <Logout
        open={logoutModalVisible}
        onCancel={() => setLogoutModalVisible(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default Dashboard;
