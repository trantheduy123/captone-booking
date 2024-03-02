import React from "react";
import toast, { Toaster } from "react-hot-toast";

export const showToast = (message, type) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "loading":
      toast.loading(message);
      break;
    default:
      toast(message);
  }
};

const ToastButton = () => {
  const handleButtonClick = (type) => {
    switch (type) {
      case "success":
        showToast("Success toast.", "success");
        break;
      case "error":
        showToast("Error toast.", "error");
        break;
      case "loading":
        showToast("Loading toast...", "loading");
        break;
      default:
        showToast("Default toast.");
    }
  };

  return (
    <>
      <div>
        <button onClick={() => handleButtonClick("success")}>
          Show Success Toast
        </button>
        <button onClick={() => handleButtonClick("error")}>
          Show Error Toast
        </button>
        <button onClick={() => handleButtonClick("loading")}>
          Show Loading Toast
        </button>
      </div>
      <Toaster />
    </>
  );
};

export default ToastButton;
