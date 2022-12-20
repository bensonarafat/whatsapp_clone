import React from 'react'
import "./Sidebar.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from '@mui/material';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import SideBarChat from './SidebarChat'
import db from './firebase'
import { onSnapshot, collection, query, } from "firebase/firestore";

function Sidebar() {

  const [rooms, setRooms] = React.useState([]);
  React.useEffect(() => {

   const q = query(collection(db, "rooms"))
    onSnapshot(q, (snapshot) => {
      setRooms(snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      })))
    })
  }, [])

  return (
    <div className="sidebar">
        <div className="sidebar__header">
            <AccountCircleIcon/>
            <div className="sidebar_headerRight">
              <IconButton>
                <DonutLargeIcon/>
              </IconButton>
              <IconButton>
                <ChatIcon/>
              </IconButton>
              <IconButton>
              <MoreVertIcon/>
              </IconButton>
               
            </div>
        </div>
        <div className="sidebar_search">
          <div className="siderbar__searchContainer">
            <SearchIcon/>
            <input type="text" placeholder="Search or start new conversation"/>
          </div>
        </div>
        <div className="sidebar_chats">
          <SideBarChat addNewChat/>
          {
            rooms.map((room) => (
              <SideBarChat key={room.id} id={room.id} name={room.data.name}/>
            ))
          }


        </div>
    </div>
  )
}

export default Sidebar