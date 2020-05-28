import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import axios from 'axios';

import cookies from 'universal-cookie'
const cookie = new cookies()

class EachItem extends Component {
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
    
    render(){
        return (
            <div className="card col-3 m-5">
                 {this.renderRedirect()}
                <div className='card-body'>
                    <h5 className='card-title'> {this.props.item.name}</h5>
                    <p className='card-text'> {this.props.item.description}</p>
                    <Link to={'/DetailTask/' + this.props.item.id}>
                        <button className='btn btn-outline-primary btn-block'>Details</button>
                    </Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth 
    }
}

export default connect(mapStateToProps)(EachItem)