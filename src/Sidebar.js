import React from 'react'
import "./Sidebar.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from '@mui/material';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import SideBarChat from './SidebarChat'

function Sidebar() {
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
          <SideBarChat/>
          <SideBarChat/>
          <SideBarChat/>
          <SideBarChat/>
          <SideBarChat/>
          <SideBarChat/>

        </div>
    </div>
  )
}

export default Sidebar