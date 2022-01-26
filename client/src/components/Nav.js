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
    }

componentDidUpdate(prev){
    if(prev.Logged !== this.props.Logged)
        setTimeout(() => {

this.setState({connected:true})
        }, 500)

}
    

    componentDidMount() {
        this.checkAndUpdateNav()
        var path = window.location.pathname;
        
        if (path === "/about") {
            document.getElementById("about").classList.add('selected')
        } else if (path === "/") {
            document.getElementById("home").classList.add('selected')
        } else if (path === "/inscription") {
            document.getElementById("signupLink").classList.add('selected')
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
                                <Link id='signupLink' className='navLink' to="/inscription">Signup</Link>
                            </li>
                        ) : 
                        (
                            <li>
                                    <a onClick={this.handleLogout} href="#" className='navLink'>Logout </a>
                            </li>
                        )
                        }
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Nav;