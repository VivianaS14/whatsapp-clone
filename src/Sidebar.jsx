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
import { Outlet } from "react-router-dom";
import { useStateValue } from "./StateProvider";

const Sidebar = () => {
  /* Rooms for chat */
  const [rooms, setRooms] = useState([]);
  /* Reducer in the context */
  const [{ user }, dispatch] = useStateValue();

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
    /* Optimization tip -> clenUp function, whenever the component sort of unmounts and you always detach the real time listener after is done using it */
    return () => {
      roomsDocs();
    };
  };

  return (
    <>
      <div className="sidebar">
        <div className="sidebar__header">
          <Avatar src={user?.photoURL} />
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
      <Outlet />
    </>
  );
};

export default Sidebar;
