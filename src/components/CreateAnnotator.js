import React, { Component } from 'react'
import axios from '../config/axios'
import { Link, Redirect } from 'react-router-dom'

import cookies from 'universal-cookie'
const cookie = new cookies()

class CreateAnnotator extends Component {

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
        const password = this.password.value

        axios.post(
            '/auth/register-annotator',
            {
                username, password
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
                        <h1>CREATE ANNOTATOR</h1>
                        <div className="form-group">
                            <label htmlFor="name">Username</label>
                            <input ref={input => this.username = input} type="text" className="form-control"  />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input ref={input => this.password = input} type="password" className="form-control" />
                        </div>       
                    </form>             
                    <button
                        className='btn btn-primary'
                        onClick={this.onButtonClick}
                    >ADD ANNOTATOR
                    </button>

                </div>
        )

    }



}

export default CreateAnnotator