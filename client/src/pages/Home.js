import React, { useState, useEffect } from "react";
import Nav from '../components/Nav';
import socketIOClient from "socket.io-client";
import axios from "axios";


const Home = () => {
    const [msg,setMsg] = useState([])
    useEffect(() => {
        fetchMessages()

       const socket = socketIOClient();
       socket.on("msgNotif",()=>{
           fetchMessages()
       })
       socket.on("reset",()=>{
           fetchMessages()
       })

        // return () => socket.disconnect();

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


            <ul id="tchat">
        {msg && (
            msg.map((msg)=>{
                return <li key={msg._id}>{msg.message}</li>
            })
        )}
            </ul>

            <form id="messageForm" action="" onSubmit={sendMessage}>
                <input name="message" type="text" id="message" autoComplete="off"></input>
                <input type="submit" value="Send" className="btn btn-primary" />
            </form>
        </div>
    );
};

export default Home;