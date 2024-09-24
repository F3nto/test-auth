import React, { useState, useEffect } from "react";
import { Typography, Form, Button, Space, Flex } from "antd";
import { MailOutlined, KeyOutlined } from "@ant-design/icons";
import {
  FormInputItem,
  FormPasswordItem,
} from "../../components/FormInput/FormInput";
import { postLoginApi } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import ToastNotification, {
  showSuccessToast,
  showErrorToast,
} from "../../utils/Toast/ToastNotification";
import LoadingDots from "../../utils/Loading/LoadingDots";
import { setToken } from "../../redux/features/authSlice";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const verifyMutation = useMutation({
    mutationFn: async (formData) => {
      const response = await postLoginApi(formData);
      return response.data;
    },
    onSuccess: (data) => {
      if (data?.token) {
        const decoded = jwtDecode(data.token);
        const user = {
          id: decoded.id,
          name: decoded.name,
          email: decoded.email,
        };
        dispatch(setToken({ token: data.token, user }));
        showSuccessToast("Login Successful!");
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        showErrorToast("No token received. Login failed.");
      }
    },
    onError: (error) => {
      const statusCode = error.response?.status;
      const message = error.response?.data?.message;

      if (statusCode === 401 && message === "Invalid email or password!") {
        showErrorToast("Invalid Email or Password!");
      } else {
        showErrorToast("Login failed. Try again.");
      }
    },
    onSettled: () => setIsLoading(false),
  });

  const [form] = Form.useForm();
  const onFinish = (formData) => {
    setIsLoading(true);
    setTimeout(() => {
      verifyMutation.mutate(formData);
    }, 1500);
  };

  return (
    <>
      <Flex
        vertical
        justify="center"
        align="center"
        style={{ height: "100vh" }}
      >
        <Form
          form={form}
          onFinish={onFinish}
          style={{ width: "400px" }}
          className="bg-gray-600 bg-opacity-10 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg p-6"
        >
          <Typography>
            <Title level={2} style={{ color: "white", textAlign: "center" }}>
              Login
            </Title>
          </Typography>

          <Space direction="vertical" style={{ width: "100%" }}>
            <FormInputItem
              name="email"
              placeholder="Email"
              icon={<MailOutlined />}
              type="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please input a valid email!",
                },
              ]}
            />

            <FormPasswordItem
              name="password"
              placeholder="Password"
              icon={<KeyOutlined />}
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            />

            <Form.Item>
              <Button size="large" type="primary" htmlType="submit" block>
                {loading ? (
                  <>
                    <LoadingDots isLoading={loading} />
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </Flex>
      <ToastNotification />
    </>
  );
};

export default Login;
