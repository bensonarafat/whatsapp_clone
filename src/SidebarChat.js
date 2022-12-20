import React from 'react';
import "./SidebarChat.css"
import db from './firebase'
import { collection, doc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom"

function SideBarChat ({ id, name, addNewChat}) {


    const [seed, setSeed] = React.useState('');
    const style = {
        width: '50px'
    }

    React.useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);
    
    const createChat = () => {
        const roomName = prompt("Please enter name for chat");
        const newRoom = doc(collection(db, "rooms"));
        setDoc(newRoom, {name: roomName});
    }

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
        <div className="sidebarChat">
            <img style={style} src={`https://avatars.dicebear.com/api/human/${seed}.svg`} alt={seed}/>
            <div className="sidebarChat__info">
                <h2>{name}</h2>
                <p> 
                    Last Messages... 
                </p>
            </div>
        </div>
        </Link>
    ) : 
    (
        <div onClick={createChat} className="sidebarChat">
            <h1>Add new Chat</h1>
        </div>
    )
}

export default SideBarChat