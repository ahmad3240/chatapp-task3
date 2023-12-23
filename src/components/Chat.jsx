import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db, auth } from "../firebase-config";
import "../styles/Chat.css";
const Chat = ({ room }) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesRef = collection(db, "messages");
  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
      console.log("Messages updated:", messages);
    });
    return () => unsuscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if there is an authenticated user
    const user = auth.currentUser;
    if (!user) {
      console.error("No authenticated user.");
      return;
    }
  
    // Continue with the submission
    if (newMessage === "") return;
  
    try {
      await addDoc(messagesRef, {
        text: newMessage,
        createdAt: serverTimestamp(),
        user: user.displayName, // Access displayName from the authenticated user
        room: room,
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error adding message to Firestore:", error);
    }
  };
  
  return (
    <div className="chat-app">
      <div className="header">
        <h1>Welcome to: {room.toUpperCase()}</h1>
      </div>
      <div className="messages">
        {messages.map((msg) => (
          <div className="message" key={msg.id}>
            <span className="user">{msg.user}</span>
            {msg.text}
          </div>
        ))}
      </div>
      <form className="new-message-form" onSubmit={handleSubmit}>
        <input
          className="new-message-input"
          placeholder="Type your message"
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        ></input>
        <button type="submit" className="send-button">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Chat;
