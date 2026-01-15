import React from "react";

const Loading = ({ message = "Loading...", fullScreen = false }) => {
  const containerClass = fullScreen
    ? "fixed inset-0 flex flex-col items-center justify-center "
    : "flex items-center justify-center";

  return (
    <div className={containerClass}>
      <div className="flex flex-col items-center space-y-2">
        <div className="loading loading-spinner text-primary"></div>
        {message && <p className="text-sm">{message}</p>}
      </div>
    </div>
  );
};

export default Loading;
