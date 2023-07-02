import React, { useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import config from '../config.json'
import axios from 'axios';

const About = () => {
    const navigate = useNavigate()
    const [connected,setConnected] = useState(false);
    const [username,setUsername] = useState("")

    useEffect(()=>{
        if(localStorage.getItem('JWT') && JSON.parse(localStorage.getItem('JWT')).expiry > new Date().getTime()){
            setConnected(true)
            getUsername().then((username)=>setUsername(username)) 
        }
    },[])


    const getUsername = async () => {
        let username = "";
        await axios.get(config.api_url + '/api/secure/' + JSON.parse(localStorage.getItem('JWT')).userId).then((res) => {
            username = res.data.user.pseudo
        })
        return username
    }

    const brandLink = () => {
        navigate('/')
    }

    return (
        <div>
            <Nav brandLink={brandLink} connected={connected} username={username}></Nav>
            <h1 className='text-center'>About</h1>
            <div className="text-center mt-5">
                <p>Ce tchat est uniquement à but d'entrainement :</p>
                <ul className='mx-2 mt-4'>
                    <li>Etablir un tchat avec la librairie Socket.IO afin d'éviter les requêtes inutiles</li>
                    <li>Interface dynamique et Responsive</li>
                    <li>Système d'authentification et d'enregistrement pour accéder au tchat </li>
                    <li>MongoDb</li>
                    <li>Déploiement dans le cloud</li>
                    <li>Déploiement continu</li>
                </ul>
                <p>Prochaines updates :</p>
                <ul className='mx-2 mt-4'>
               <li>Afficher pseudo</li> 
               <li>Notifications</li>
               <li>Better UI/UX</li>
               <li>Soon...</li> 
                </ul>
            </div>
        </div>
    );
};

export default About;