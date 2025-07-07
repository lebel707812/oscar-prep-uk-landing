import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NotificationProps {
  id: number;
  type: "success" | "error" | "info" | "warning";
  message: string;
  onClose: (id: number) => void;
}

const bgColors = {
  success: "bg-green-100 border-green-400 text-green-700",
  error: "bg-red-100 border-red-400 text-red-700",
  info: "bg-blue-100 border-blue-400 text-blue-700",
  warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
};

export const Notification = ({
  id,
  type,
  message,
  onClose,
}: NotificationProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 3500);
    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className={`border-l-4 p-4 rounded shadow-md mb-3 max-w-sm ${bgColors[type]}`}
      >
        {message}
      </motion.div>
    </AnimatePresence>
  );
};
