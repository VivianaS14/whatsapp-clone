import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import db from "./firebase";
import { addDoc } from "./firebase";
import { query, orderBy, collection, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";

const SidebarChat = ({ addNewChat, id, name }) => {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("");

  useEffect(() => {
    if (id) {
      const messagesRef = collection(db, "rooms", id, "messages");
      const qu = query(messagesRef, orderBy("timestamp", "desc"));
      onSnapshot(qu, (snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
    }
  }, [id]);

  useEffect(() => {
    /* Generate random avatars everytime to render */
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = async () => {
    const roomName = prompt("Please enter name for chat room");
    if (roomName) {
      // do some clever database stuff...
      await addDoc(collection(db, "rooms"), {
        name: roomName,
      });
    }
  };

  /* if theres's no a new chat render the usual otherwise render create chat */
  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add new chat</h2>
    </div>
  );
};

export default SidebarChat;
