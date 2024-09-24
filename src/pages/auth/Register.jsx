import React, { useState } from "react";
import { Typography, Form, Button, Space, Flex } from "antd";
import {
  UserOutlined,
  MailOutlined,
  KeyOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { postRegisterApi } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import LoadingDots from "../../utils/Loading/LoadingDots";
import ToastNotification, {
  showSuccessToast,
  showErrorToast,
} from "../../utils/Toast/ToastNotification";
import {
  FormInputItem,
  FormPasswordItem,
  FormDateItem,
} from "../../components/FormInput/FormInput";

const { Title } = Typography;

const Register = () => {
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState(false);

  const verifyMutation = useMutation({
    mutationFn: (formData) => postRegisterApi(formData),
    onSuccess: () => {
      showSuccessToast("Registration Successful!");
      setTimeout(() => navigate("/login"), 1500);
    },
    onError: (error) => {
      const statusCode = error.response?.status;
      const message = error.response?.data?.message;

      if (statusCode === 400 && message === "User already exists!") {
        showErrorToast("User already exists!");
      } else {
        showErrorToast("Registration failed. Try again.");
      }
    },
    onSettled: () => setIsLoading(false),
  });

  const [form] = Form.useForm();
  const onFinish = (formData) => {
    console.log("formData", formData)
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
              Register
            </Title>
          </Typography>

          <Space direction="vertical" style={{ width: "100%" }}>
            <FormInputItem
              name="name"
              placeholder="Name"
              icon={<UserOutlined />}
              rules={[{ required: true, message: "Please input your name!" }]}
            />

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

            <FormDateItem
              name="dateOfBirth"
              placeholder="Date of Birth"
              icon={<CalendarOutlined />}
              form={form}
              rules={[
                {
                  required: true,
                  message: "Please select your date of birth!",
                },
              ]}
            />

            <Form.Item>
              <Button size="large" type="primary" block htmlType="submit">
                {loading ? (
                  <>
                    <LoadingDots isLoading={loading} />
                  </>
                ) : (
                  "Register"
                )}
              </Button>
            </Form.Item>
            <Form.Item>
              <Typography>
                <Title
                  level={5}
                  style={{ color: "white", textAlign: "center" }}
                >
                  Already have an account?
                  <a
                    type="link"
                    onClick={() => navigate("/login")}
                    className="ant-typography"
                  >
                    Log in
                  </a>
                </Title>
              </Typography>
            </Form.Item>
          </Space>
        </Form>
      </Flex>
      <ToastNotification />
    </>
  );
};

export default Register;
