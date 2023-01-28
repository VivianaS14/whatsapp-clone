import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Chat.css";
import db from "./firebase";
import { doc, getDoc, getDocs, collection } from "firebase/firestore/lite";
import { query, orderBy } from "firebase/firestore";

const Chat = () => {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomid } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    /* Generate random avatars everytime to render */
    setSeed(Math.floor(Math.random() * 5000));
    getRoomName();
    getRoomMessages();
  }, [roomid]);

  const getRoomName = async () => {
    const docSnap = await getDoc(doc(db, "rooms", roomid));
    setRoomName(docSnap.data().name);
  };

  const getRoomMessages = async () => {
    let messages = await getDocs(collection(db, "rooms", roomid, "messages"));
    let order = messages.docs.sort((a, b) => a.timestamp - b.timestamp);
    setMessages(order.map((doc) => doc.data()));
  };

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("You typed >>> ", input);
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>Last seen at ...</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <p className={`chat__message ${true && "chat__reciever"}`}>
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            type="text"
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
};

export default Chat;
