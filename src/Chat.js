import React from 'react'
import "./Chat.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
function Chat() {
    const [input, setInput] = React.useState();

    const sendMessage = (e) => {
        e.preventDefault();
        console.log(`You type ${input}`);
        setInput("");
    }
    return (
        <div className="chat"> 
            <div className="chat__header">
                <AccountCircleIcon/>

                <div className="chat__headerInfo">
                    <h3>Room name</h3>
                    <p>Last seen at ...</p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchIcon/>
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                <p className={`chat__message ${false && "chat__receiver"}`} >
                    <span className="chat__name">Sonny Sangha</span>
                    Hey Guys
                    <span className="chat_timestamp">3:52pm</span>
                </p>
            </div>

            <div className="chat__footer">
                <InsertEmoticonIcon/>
                    <form>
                        <input type="text" onSubmit={sendMessage} onChange={ (e) => setInput(e.target.value)} placeholder="Type a message"/>
                        <button type="submit"  onClick={sendMessage} >Send a message</button>
                    </form>
                <MicIcon/>
            </div>
        </div>
    )
}
export default Chat