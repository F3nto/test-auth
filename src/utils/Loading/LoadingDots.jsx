import React from "react";

const LoadingDots = ({ isLoading }) => {
  if (!isLoading) return null;
  return (
    <>
      <span className="dot-load">.</span>
      <span className="dot-load">.</span>
      <span className="dot-load">.</span>
    </>
  );
};

export default LoadingDots;
