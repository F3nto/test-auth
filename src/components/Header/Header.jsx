import React from "react";
import { Flex, Typography, Avatar } from "antd";
import Search from "antd/es/input/Search";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((state) => state.auth?.user);
  const username = user ? user.name : "Guest";
  return (
    <>
      <Flex align="center" justify="space-around">
        <Typography.Title level={3} type="secondary">
          Welcome, {username}
        </Typography.Title>

        <Flex align="center" gap="48px">
          <Search />

          <Flex align="center" gap="30px">
            <Avatar icon={<UserOutlined />} className="hover:bg-blue-400" />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Header;
