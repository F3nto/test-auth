import React from 'react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserApi } from '../api/authApi'; // Assume deleteUserApi is implemented
import { Divider, Table, Button, message } from 'antd';

const UserList = () => {

  const { error, isLoading, data } = useQuery({
    queryKey: ["All-Users"],
    queryFn: getUserApi,
  });


  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const tableData = data.map((user, index) => ({
    key: user.id,
    no: index + 1,
    id: user.id,
    name: user.name,
    email: user.email,
    dateOfBirth : user.dateOfBirth
  }));

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "UserId",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button
          type="primary"
          danger
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Divider>User List</Divider>
      <Table
        columns={columns}
        dataSource={tableData} 
        rowKey="id" 
        pagination={false} 
      />
    </div>
  );
};

export default UserList;