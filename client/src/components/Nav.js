import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
    constructor(props) {
        super(props);
        // N’appelez pas `this.setState()` ici !
        this.state = {
             counter: 0 ,
            selectedUrl:window.location.href,
            };
    }

componentDidMount(){
    if(this.state.selectedUrl.includes("/about")){
        document.getElementById("about").classList.add('selected')
    } else if (this.state.selectedUrl == "http://localhost:3000/" || "https://socket-tchat.herokuapp.com"){
        document.getElementById("home").classList.add('selected')
    }else if(this.state.selectedUrl.includes('/inscription')){
        document.getElementById("signup").classList.add('selected')
    }
}

    render() {
        return (
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link id="home" className='navLink' to="/">Home</Link>
                        </li>
                        <li>
                            <Link id='about' className='navLink' to="/about">About</Link>
                        </li>
                        <li>
                            <Link id='signup' className='navLink' to="/inscription">Signup</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Nav;