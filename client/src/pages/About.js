import React from 'react';
import Nav from '../components/Nav';

const About = () => {
    return (
        <div>
            <Nav></Nav>
            <h1 className='text-center'>About</h1>
            <p className='text-center mt-2'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem, itaque, consectetur qui ab exercitationem quaerat quam asperiores fuga, dignissimos odio sint. Nostrum iste inventore qui? Temporibus incidunt necessitatibus doloribus provident a reprehenderit distinctio commodi adipisci quidem sequi! Nobis repellat voluptatem, rerum, dolores dolorem natus, asperiores porro quos ex reiciendis sunt repudiandae eveniet necessitatibus nemo quas placeat eos modi? Delectus, soluta.</p>
            <div className="text-center mt-5">
                <p>Ce tchat est uniquement à but d'entrainement :</p>
                <ul>
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