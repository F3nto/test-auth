import React, {useState} from "react";
import { Input, Form, DatePicker, Space } from "antd";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";

export const FormInputItem = ({
  name,
  placeholder,
  icon,
  rules = [],
  type = "text",
}) => (
  <Form.Item name={name} rules={rules}>
    <Input
      type={type}
      placeholder={placeholder}
      size="large"
      prefix={React.cloneElement(icon, { style: { marginRight: "8px" } })}
    />
  </Form.Item>
);

export const FormPasswordItem = ({ name, placeholder, icon, rules = [] }) => (
  <Form.Item name={name} rules={rules}>
    <Input.Password
      placeholder={placeholder}
      size="large"
      type="password"
      prefix={React.cloneElement(icon, { style: { marginRight: "8px" } })}
      iconRender={(visible) =>
        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
      }
    />
  </Form.Item>
);

export const FormDateItem = ({ name, placeholder, icon, form, rules = [] }) => {
  
  const handleChange = (date, dateString) => {
    form.setFieldValue(name, dateString)
  };

  return (
    <Form.Item
      name={name}
      rules={rules}
    >
      <Space.Compact>
        <Input
          prefix={React.cloneElement(icon, { style: { marginRight: "8px" } })}
          size="large"
          style={{
            width: "10%",
            background: 'white',
            borderRight: 'none',
          }}
         
         
        />
        <DatePicker
          placeholder={placeholder}
          style={{
            width: "90%",
          }}
          size="large"
          format="YYYY-MM-DD"
          onChange={handleChange}
        />
      </Space.Compact>
    </Form.Item>
  );
};