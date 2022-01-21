import React, { useEffect, useRef } from "react";
import Nav from '../components/Nav';
import socketIOClient from "socket.io-client";
import axios from "axios";
import { useStateIfMounted } from "use-state-if-mounted";


const Home = () => {
    const [msg, setMsg] = useStateIfMounted([])
    const [submitted, setSubmitted] = useStateIfMounted(false)
    const [errors, setErrors] = useStateIfMounted()
    const sendBtn = useRef()
    const [userCount,setUserCount] = useStateIfMounted()
    const socketRef = useRef()

    useEffect(() => {
        fetchMessages()
        socketRef.current = socketIOClient()
        socketRef.current.on("newMsg", () => {
            fetchMessages()
        })
        socketRef.current.on("reset", () => {
            fetchMessages()
        })

        socketRef.current.on('count',(count)=>{
            setUserCount(count)
        })

        return () => socketRef.current.disconnect();

    }, []);



    const sendMessage = (e) => {
        e.preventDefault();
        let newMessage = {
            message: document.getElementById('message').value
        }
        setSubmitted(true)

        axios.post('/api/messages/new', newMessage)
            .then(() => {
                socketRef.current.emit("newMsg")
                document.getElementById('message').value = ""
                setSubmitted(false)
                sendBtn.current.setAttribute("disabled", "disabled")
                document.getElementById("message").focus()
            })
            .catch(() => {
                setSubmitted(false)
                setErrors("Message not sent")
            })
    }


    const fetchMessages = async () => {
      await  axios.get('/api/messages')
            .then(res => setMsg(res.data.messages))
            .catch(error => console.log(error))
        document.getElementById("tchat").scrollTop = document.getElementById("tchat").scrollHeight - document.getElementById("tchat").clientHeight
    }

    if (errors) {
        setTimeout(() => {
            setErrors("")
        }, 1500)
    }

    const checkMessage = (e) => {
        let message = e.target.value;
        if (message === "") {
            sendBtn.current.setAttribute("disabled", "disabled")
        } else {
            sendBtn.current.removeAttribute("disabled")
        }
    }



    return (
        <div>
            <Nav></Nav>
            <h3>Utilisateurs en ligne :   
                {userCount}
            </h3>
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
                <input style={submitted ? { display: "none" } : { display: "block" }} autoFocus name="message" type="text" id="message" autoComplete="off" onChange={checkMessage} ></input>
                <input ref={sendBtn} style={submitted ? { display: "none" } : { display: "block" }} id="sendBtn" type="submit" value="Send" className="btn btn-primary col-2" disabled />
                <div className="spinner-grow" style={!submitted ? { display: "none" } : { width: '3rem', height: '3rem' }} role="status">
                </div>
            </form>
        </div>
    );
};

export default Home;