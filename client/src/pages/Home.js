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
       socket.on("deleted",fetchMessages())
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
            .catch(console.log("erreur d'envoi"))
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

            <form action="" onSubmit={sendMessage}>
                <input type="text" id="message"/>
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