import { useEffect } from "react";
import { toast } from "react-toastify";

const useWebSocket = () => {
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/ws/notifications");

    socket.onmessage = (event) => {
      const message = event.data;
      // Use "bottom-right" directly as a string
      toast.info(`Notification: ${message}`, {
        position: "bottom-right", // ✅ Fixed here
        autoClose: 3000
      });
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      socket.close();
    };
  }, []);
};

export default useWebSocket;