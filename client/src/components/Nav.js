import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Nav extends Component {
    constructor(props) {
        super(props);
        // N’appelez pas `this.setState()` ici !
        this.state = {
            counter: 0,
        };
    }


  
    

    componentDidMount() {
        var path = window.location.pathname;
        
        if (path === "/about") {
            document.getElementById("about").classList.add('selected')
        } else if (path === "/") {
            document.getElementById("home").classList.add('selected')
        } else if (path === "/register") {
            document.getElementById("register").classList.add('selected')
        }
        
    }






    

    handleLogout(e){
        e.preventDefault()
        localStorage.removeItem("JWT")
        window.location.reload()
    }



    render() {
        const {brandLink,username,connected} = this.props
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
                        {!connected ? (
                            <li>
                                <Link id='register' className='navLink' to="/register">Signup</Link>
                            </li>
                        ) : 
                        (
                            <li>
                                    <p onClick={this.handleLogout} style={{cursor:'pointer'}} className='navLink text-white'>Logout </p>
                            </li>
                        )
                        }
                    </ul>
                    <h5>{username && username}</h5>
                        <div id='brandLogo' className='d-none d-sm-block' onClick={brandLink}></div>
                </nav>
            </div>
        );
    }
}

export default Nav;