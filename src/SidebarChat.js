import React from 'react';
import "./SidebarChat.css"


function SideBarChat ({ addNewChat}) {

    const [seed, setSeed] = React.useState('');
    const style = {
        width: '50px'
    }

    React.useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);
    
    const createChat = () => {
        const roomName = prompt("Please enter name for chat");
        console.log(roomName);
    }
    return !addNewChat ? (
        <div className="sidebarChat">
            <img style={style} src={`https://avatars.dicebear.com/api/human/${seed}.svg`} alt={seed}/>
            <div className="sidebarChat__info">
                <h2>Room name</h2>
                <p> 
                    Last Messages... 
                </p>
            </div>
        </div>
    ) : 
    (
        <div onClick={createChat} className="sidebarChat">
            <h1>Add new Chat</h1>
        </div>
    )
}

export default SideBarChat