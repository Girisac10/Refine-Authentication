import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import './Chat.css'

const socket = io("http://localhost:3000");

const ChatApp: React.FC = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket.on("receive_message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, `Server: ${msg}`]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("send_message", message);

      setMessages((prevMessages) => [...prevMessages, `You: ${message}`]);
      setMessage("");
    }
  };

  return (
    <div className="chat-app">
      <h2>Ask for Help or Support</h2>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        className='input-box'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button className='button' onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatApp;