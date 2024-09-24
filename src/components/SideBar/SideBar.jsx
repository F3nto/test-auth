import React from "react";
import { Flex, Menu } from "antd";
import {
  UserOutlined,
  ProfileOutlined,
  OrderedListOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import pandaLogo from "../../assets/panda.png";
const SideBar = ({onMenuClick}) => {
  
  return (
    <>
      <Flex align="center" justify="center">
        <div className="logo my-7">
          <img src={pandaLogo} alt="Panda Logo" style={{ width: "100px" }} />
        </div>
      </Flex>

      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        className="menu-bar"
        onClick={(e) => onMenuClick(e.key)}
        items={[
          {
            key: "1",
            icon: <UserOutlined />,
            label: "Dashboard",
          },
          {
            key: "2",
            icon: <ProfileOutlined />,
            label: "User Lists",
          },

          {
            key: "3",
            icon: <OrderedListOutlined />,
            label: "Order Lists",
          },
          {
            key: "4",
            icon: <LogoutOutlined />,
            label: "Log Out",
          },
        ]}
      />
    </>
  );
};

export default SideBar;
