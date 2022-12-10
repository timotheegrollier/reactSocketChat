import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';


const config = require('../config.json')


export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            loginError:"",
        }
        this.login = this.login.bind(this)
        this.getLogged = this.props.getLogged
    }
    login(e) {
        e.preventDefault()
        const userCredentials = {
            pseudo: document.getElementById('pseudo').value,
            password: document.getElementById('password').value
        }
        axios.post(config.api_url + '/api/secure/login', userCredentials).then(async (res) => {
           this.getLogged(true)
           const userConnected = {
                token:res.data.token,
                userId:res.data.userId,
               expiry: new Date().getTime() + 86400000
            }
            localStorage.setItem('JWT', JSON.stringify(userConnected))
        })
            .catch(res => {
                this.setState({loginError:res.response.data.error})
            })
    }
    render() {
        return (

            <div id='loginComponent'>
                <h3>Login</h3>
                <p className='col-10 text-center text-muted mt-3 mb-2 h6'>Hey welcome bro !<br />You need to login for access tchat </p>
                <form className='col-10 col-md-6' action="" onSubmit={this.login}>
                    <label className='text-center h6' htmlFor="pseudo">Pseudo :</label>
                    <input id='pseudo' type="text" name="pseudo" className='form-control' />
                    <label className='text-center h6' htmlFor="password">Password :</label>
                    <input id='password'  type="password" name="password" className='form-control' />
                    <div className="d-flex justify-content-center">
                    <button type="submit" className='btn btn-success col-6 col-sm-3 mt-3'>Login</button>
                    </div>
                </form>
                {this.state.loginError && (
                    <p className='text-danger text-center'>{this.state.loginError}</p>
                )}
                <p className='mt-3'>Haven't got an account yet ? </p>
                <Link to="/register">Register now !</Link>
            </div>
        )
    }
}
