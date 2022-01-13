import React, { useState, useEffect } from "react";
import Nav from '../components/Nav';
import socketIOClient from "socket.io-client";
import axios from "axios";


const Home = () => {
    const [msg,setMsg] = useState([])
    const [userCount,setUserCount] = useState(0)
    useEffect(() => {
        fetchMessages()

       const socket = socketIOClient();
       socket.on("msgNotif",()=>{
           fetchMessages()
       })
       socket.on("reset",()=>{
           fetchMessages()
       })

    }, []);


    
    const sendMessage = (e) => {
        e.preventDefault();
        let newMessage = {
            message: document.getElementById('message').value
        }
        const socket = socketIOClient();
        socket.emit("newMsg")
        postToDb(newMessage)
    }

    const postToDb = async (newMessage)=>{
        await axios.post('/api/messages/new', newMessage)
            .then()
        document.getElementById('message').value = ""
        fetchMessages()
    }

    const fetchMessages = ()=>{
        axios.get('/api/messages').then(res=>setMsg(res.data.messages))
    }


    return (
        <div>
            <Nav></Nav>
            <h1 className='text-center'>Home</h1>
            <form className="d-flex justify-content-center flex-column align-items-center" action="" onSubmit={sendMessage}>
                <textarea name="message" id="message" cols="30" rows="10"></textarea>
                <input type="submit" value="Send" />
            </form>

            <ul id="tchat">
        {msg && (
            msg.map((msg)=>{
                return <li key={msg._id}>{msg.message}</li>
            })
        )}
            </ul>
        </div>
    );
};

export default Home;