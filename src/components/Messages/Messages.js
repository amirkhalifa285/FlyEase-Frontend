// src/components/Messages/Messages.js
import React, { useEffect, useState } from "react";
import axios from "../../api";
import "./Messages.css";

const Messages = () => {
  const [messages, setMessages] = useState([]);

  // Fetch messages on component mount
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get("/messages");
      setMessages(response.data.messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const markAsRead = async (messageId) => {
    try {
      await axios.put(`/messages/${messageId}`);
      // Update local state to reflect read status
      setMessages(messages.map(msg => 
        msg.id === messageId ? { ...msg, status: "read" } : msg
      ));
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };

  return (
    <div className="messages-container">
      <h1>My Messages</h1>
      
      {messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <div className="messages-list">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`message-item ${message.status}`}
              onClick={() => markAsRead(message.id)}
            >
              <div className="message-content">
                <p>{message.content}</p>
                <small>
                  {new Date(message.created_at).toLocaleString()}
                </small>
              </div>
              {message.status === "unread" && (
                <span className="unread-badge">New</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Messages;