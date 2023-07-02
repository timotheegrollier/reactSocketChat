import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Nav extends Component {
    constructor(props) {
        super(props);
        // N’appelez pas `this.setState()` ici !
        this.state = {
            counter: 0,
            connected:false,
        };
        this.navigate = this.props.navigate
        this.handleClick = ()=>{
            this.navigate()
        };
    }


  
    

    componentDidMount() {
        this.checkAndUpdateNav()
        var path = window.location.pathname;
        
        if (path === "/about") {
            document.getElementById("about").classList.add('selected')
        } else if (path === "/") {
            document.getElementById("home").classList.add('selected')
        } else if (path === "/register") {
            document.getElementById("register").classList.add('selected')
        }
        
    }
    
    checkAndUpdateNav(){
            if (localStorage.getItem('JWT') && JSON.parse(localStorage.getItem('JWT')).expiry > new Date().getTime()) {
                this.setState({ connected: true })
            }

    }
    

    handleLogout(e){
        e.preventDefault()
        localStorage.removeItem("JWT")
        window.location.reload()
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
                        {!this.state.connected ? (
                            <li>
                                <Link id='register' className='navLink' to="/register">Signup</Link>
                            </li>
                        ) : 
                        (
                            <li>
                                    <a onClick={this.handleLogout} style={{cursor:'pointer'}} className='navLink'>Logout </a>
                            </li>
                        )
                        }
                    </ul>
                        <div id='brandLogo' className='d-none d-sm-block' onClick={this.handleClick}></div>
                </nav>
            </div>
        );
    }
}

export default Nav;