import React from 'react';
import { Modal, Button } from 'antd';

const Logout = ({ open, onCancel, onConfirm }) => {
  return (
    <Modal
      title="Logout"
      open={open}
      onCancel={onCancel}
      footer={[
        <Button onClick={onCancel}>Cancel</Button>,
        <Button type="primary" danger onClick={onConfirm}>
          Logout
        </Button>,
      ]}
    >
      Are you sure you want to logout?
    </Modal>
  );
};

export default Logout;