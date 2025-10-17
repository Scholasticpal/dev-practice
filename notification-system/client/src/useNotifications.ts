import { useState, useEffect } from "react";
import io from "socket.io-client";

interface Notification {
  id: string;
  message: string;
  isRead: boolean;
}

const socket = io("http://localhost:4000");

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/notifications")
      .then((res) => res.json())
      .then((data: Notification[]) => setNotifications(data));

    socket.on("new_notification", (newNotification: Notification) => {
      setNotifications((prevNotifications: Notification[]) => [
        newNotification,
        ...prevNotifications,
      ]);
    });

    return () => {
      socket.off("new_notification");
    };
  }, []);

  return notifications;
};
