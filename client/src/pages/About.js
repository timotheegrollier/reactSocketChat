import React from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';

const About = () => {

    const navigate = useNavigate()


    const brandLink = () => {
        navigate('/')
    }
    return (
        <div>
            <Nav navigate={brandLink}></Nav>
            <h1 className='text-center'>About</h1>
            <div className="text-center mt-5">
                <p>Ce tchat est uniquement à but d'entrainement :</p>
                <ul className='mx-2 mt-4'>
                    <li>Etablir un tchat avec la librairie Socket.IO afin d'éviter les requêtes inutiles</li>
                    <li>Interface dynamique et Responsive</li>
                    <li>Système d'authentification et d'enregistrement pour accéder au tchat (bientôt)</li>
                    <li>MongoDb</li>
                    <li>Déploiement dans le cloud</li>
                </ul>
            </div>
        </div>
    );
};

export default About;