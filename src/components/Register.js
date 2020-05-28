import React, { Component } from 'react'
import axios from '../config/axios'
import { Link, Redirect } from 'react-router-dom'

import cookies from 'universal-cookie'
const cookie = new cookies()

class Register extends Component {

    state = {
        redirect: false
    }
    
    refresh = (reload) => {
        document.location.reload(reload)
      }
    
    
    setRedirect = () => {
        this.setState({
          redirect: true
        })
      }
    
    renderRedirect = () => {
        if(this.state.redirect){
          return <Redirect to = '/login' />
        }
      }
    
    
    onButtonClick = () => {
        const username = this.username.value
        const email = this.email.value
        const password = this.password.value

        axios.post(
            '/auth/register',
            {
                username, email, password
            }
        ).then(res => {
            this.setRedirect()
        }).catch(error => {
            console.log(error)
        })
        

    }

    render () {    
        return (
            <div className='container' style={{paddingBottom: "100px"}}>
                {this.renderRedirect()}
                    <form>
                        <h1>REGISTER</h1>
                        <div className="form-group">
                            <label htmlFor="name">Username</label>
                            <input ref={input => this.username = input} type="text" className="form-control"  />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input ref={input => this.email = input} type="email" className="form-control"  />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input ref={input => this.password = input} type="password" className="form-control" />
                        </div>
                    </form>
                    
                    <button
                        className='btn btn-primary'
                        onClick={this.onButtonClick}
                    >CLICK FOR REGISTER
                    </button>
                </div>
        )
    }

}

export default Register