import React, { useEffect } from "react";
import Nav from '../components/Nav';
import socketIOClient from "socket.io-client";
import axios from "axios";
import { useStateIfMounted } from "use-state-if-mounted";


const Home = () => {
    const [msg, setMsg] = useStateIfMounted([])
    const [submitted, setSubmitted] = useStateIfMounted(false)
    const [errors, setErrors] = useStateIfMounted()

    useEffect(() => {
        fetchMessages()

        const socket = socketIOClient();
        socket.on("newMsg", () => {
            fetchMessages()
        })
        socket.on("reset", () => {
            fetchMessages()
        })


        return () => socket.disconnect();

    }, []);


    
    const sendMessage = (e) => {
        e.preventDefault();
        let newMessage = {
            message: document.getElementById('message').value
        }
        setSubmitted(true)
        const socket = socketIOClient();

        axios.post('/api/messages/new', newMessage)
            .then(() => {
                socket.emit("newMsg")
                document.getElementById('message').value = ""
                setSubmitted(false)
                document.getElementById("message").focus()
            })
            .catch(() => {
                setSubmitted(false)
                setErrors("Message not sent")
            })
    }


    const fetchMessages = () => {
        axios.get('/api/messages').then(res => setMsg(res.data.messages).catch(console.log(res)))
    }

    if (errors) {
        setTimeout(() => {
            setErrors("")
        }, 1500)
    }




    return (
        <div>
            <Nav></Nav>
            <h1 className='text-center'>Home</h1>


            <ul id="tchat">
                {msg && (
                    msg.map((msg) => {
                        return <li key={msg._id}>{msg.message}</li>
                    })
                )}
            </ul>


            <form id="messageForm" action="" onSubmit={sendMessage} >
                {errors && (
                    <p style={{ color: "red", display: "flex", position: "absolute", top: "-50px" }}>{errors}</p>
                )}
                <input style={submitted ? { display: "none" } : { display: "block" }} autoFocus name="message" type="text" id="message" autoComplete="off"></input>
                <input style={submitted ? { display: "none" } : { display: "block" }} autoFocus name="message" type="text" id="message" autoComplete="off" id="sendBtn" type="submit" value="Send" className="btn btn-primary col-2" />
                <button style={submitted ? { display: "block" } : { display: "none" }} class="btn btn-primary col-4" type="button" disabled>
                    <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                    <span class="sr-only">Loading...</span>
                </button>
            </form>
        </div>
    );
};

export default Home;