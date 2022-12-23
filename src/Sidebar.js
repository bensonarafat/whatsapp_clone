import React from 'react'
import "./Sidebar.css";
import { IconButton } from '@mui/material';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import SideBarChat from './SidebarChat'
import db from './firebase'
import { onSnapshot, collection, query, } from "firebase/firestore";
import { useStateValue } from './StateProvider'

function Sidebar() {
  const [{user}, dispatch] = useStateValue();
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

  //style 
  const style = {
    width: '50px', 
    height: '50px',
    borderRadius: '100%',
  }
  return (
    <div className="sidebar">
        <div className="sidebar__header">
          
            <img src={user.photoURL} alt={user.displayName} referrerPolicy="no-referrer" style={style}/>

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