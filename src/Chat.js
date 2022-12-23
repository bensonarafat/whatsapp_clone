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
import { getDoc, doc,collection,orderBy,query,getDocs,setDoc  } from "firebase/firestore"; 
import { useStateValue } from './StateProvider';
import { serverTimestamp } from "firebase/firestore";

function Chat() {
    const [input, setInput] = useState('');
    const history = useHistory()
    const { roomId } = useParams();
    const [seed, setSeed] = useState('');
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();
    const style = {
        width: '50px'
    }
    const sendMessage = (e) => {
        e.preventDefault();
       
        const roomsRef = collection(db, `rooms/${roomId}/messages`);
        const newRoom = doc(roomsRef);
        setDoc(newRoom, {
            message:input,
            name: user.displayName,
            timestamp: serverTimestamp(),
          });

          console.log(`You type ${input}`);
        setInput("");
    }

    useEffect(() => {
        if(roomId){
            getDocument("rooms", roomId);
            getMessages(roomId);
        }
        history.listen((location) => {
            if(location){ 
                const pathname = location.pathname;
                const roomId = pathname.split("/")[2];
                setSeed(Math.floor(Math.random() * 5000));
                getDocument("rooms", roomId);
                getMessages(roomId);
            }
        })
        
    }, [history, roomId])



    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    
    // get the document details 
    async function getMessages (id){
        const roomsRef = collection(db, `rooms/${id}/messages`);

        const q = query(roomsRef, orderBy("timestamp"));
        const snapshot = await getDocs(q);
        setMessages(snapshot.docs.map((e) => e.data()));
    }
    // get the room details 
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
            {
                messages.map((message) => (
                <p className={`chat__message ${true && "chat__receiver"}`} key={message.id}>
                    <span className="chat__name">{message.name}</span>
                    {message.message}
                    <span className="chat_timestamp">
                        {new Date(message.timestamp.toDate()).toUTCString()}
                    </span>
                </p>
                ))
            }
                
            </div>

            <div className="chat__footer">
                <InsertEmoticonIcon/>
                    <form>
                        <input type="text" value={input} onChange={ (e) => setInput(e.target.value)} placeholder="Type a message"/>
                        <button type="submit" onClick={sendMessage} >Send a message</button>
                    </form>
                <MicIcon/>
            </div>
        </div>
    )
}
export default Chat