import axios from 'axios';
import React, { Component } from 'react';


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
        const user = {
            pseudo: document.getElementById('pseudo').value,
            password: document.getElementById('password').value
        }
        axios.post('/api/secure/login', user).then(async (res) => {
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
                <form className='col-10 col-md-6' action="" onSubmit={this.login}>
                    <label htmlFor="pseudo">Pseudo :</label>
                    <input id='pseudo' type="text" name="pseudo" className='form-control' />
                    <label htmlFor="password">Password :</label>
                    <input id='password'  type="password" name="password" className='form-control' />
                    <div className="d-flex justify-content-center">
                    <button type="submit" className='btn btn-success col-6 col-sm-3'>Login</button>
                    </div>
                </form>
                {this.state.loginError && (
                    <p className='text-danger text-center'>{this.state.loginError}</p>
                )}
            </div>
        )
    }
}
