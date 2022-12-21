import React, {useEffect, useState} from 'react'
import "./Chat.css"

import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import { useHistory, useParams } from "react-router-dom"
import db from './firebase'
import { getDoc, doc } from "firebase/firestore"; 

function Chat() {
    const [input, setInput] = useState();
    const history = useHistory()
    const { roomId } = useParams();
    const [seed, setSeed] = useState('');
    const [roomName, setRoomName] = useState('');

    const style = {
        width: '50px'
    }
    const sendMessage = (e) => {
        e.preventDefault();
        console.log(`You type ${input}`);
        setInput("");
    }

    useEffect(() => {
        if(roomId){
            getDocument("rooms", roomId);
        }
        history.listen((location) => {
            if(location){ 
                const pathname = location.pathname;
                const roomId = pathname.split("/")[2];
                setSeed(Math.floor(Math.random() * 5000));
                getDocument("rooms", roomId);
            }
        })
        
    }, [history, roomId])



    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    async function getDocument (coll, id) {
        const snap = await getDoc(doc(db, coll, id))
        if (snap.exists()){
            setRoomName(snap.data().name);
        }else{
           Promise.reject(Error(`No such document: ${coll}.${id}`))
        }
      }

      
    return (
        <div className="chat"> 
            <div className="chat__header">
                 <img style={style} src={`https://avatars.dicebear.com/api/human/${seed}.svg`} alt={seed}/>

                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
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