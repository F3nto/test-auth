import React from "react";
import { Toaster, toast } from "react-hot-toast";

const ToastNotification = () => {
  return <Toaster position="top-center" reverseOrder={false} />;
};

export const showSuccessToast = (message) => {
  return toast.success(message);
};

export const showErrorToast = (message) => {
  return toast.error(message);
};

export default ToastNotification;
