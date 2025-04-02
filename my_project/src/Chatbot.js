import React, { useState } from "react";

import axios from "axios";
import "./styles/Chatbot.css"; // Import CSS for styling

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");

    const sendMessage = async () => {
        if (inputMessage.trim() === "") return;

        const userMessage = { sender: "User", text: inputMessage };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        setInputMessage(""); // ✅ Clears input field after sending

        try {
            const response = await axios.post("http://localhost:8080/chatbot/send", { message: inputMessage });

            const botMessage = { sender: "Bot", text: response.data.response };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            console.error("❌ Error sending message:", error);
            setMessages((prevMessages) => [...prevMessages, { sender: "Bot", text: "⚠ Unable to connect to the server." }]);
        }
    };

    return (
        <div className="chat-container">
            <h2>Chatbot</h2>
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender === "User" ? "user-message" : "bot-message"}>
                        <strong>{msg.sender}: </strong> {msg.text}
                    </div>
                ))}
            </div>
            <div className="input-area">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type a message..."
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()} // ✅ Send message on Enter
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chatbot;
