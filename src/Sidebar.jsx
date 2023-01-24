import React, { useEffect, useState } from "react";
import { Avatar, IconButton } from "@mui/material";
import "./Sidebar.css";
import {
  Chat,
  DonutLarge,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import SidebarChat from "./SidebarChat";
import db from "./firebase";
import { getDocs, collection } from "./firebase";

const Sidebar = () => {
  /* Rooms for chat */
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getRooms();
  }, [rooms]);

  const getRooms = async () => {
    const roomsDocs = await getDocs(collection(db, "rooms"));
    setRooms(
      roomsDocs.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }))
    );
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input type="text" placeholder="Search or start new chat" />
        </div>
      </div>
      <div className="sidebar__chats">
        {/* Component for the chats */}
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
