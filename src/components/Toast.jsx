import { useEffect, useState } from "react";

const Toast = ({ type = "success", message, duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!message) return;

    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message || !visible) return null;

  // Ensure type is valid
  const alertClassMap = {
    success: "alert-success",
    error: "alert-error",
    warning: "alert-warning",
    info: "alert-info",
  };

  return (
    <div className="toast toast-top toast-end z-50">
      <div className={`alert ${alertClassMap[type] || "alert-info"} shadow-lg`}>
        <div>
          {message.split("\n").map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Toast;
