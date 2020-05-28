import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'

import {onLoginAnnotator} from '../actions'

import cookies from 'universal-cookie'
const cookie = new cookies()

class LoginAnnotator extends Component {

    onButtonClick = () => {
        const data_username = this.username.value
        const data_password = this.password.value
        this.props.onLoginAnnotator(data_username, data_password)
    }

    render () {
        console.log(this.props.id)
        if(!this.props.id) {
            return (
                <div className="mt-5 row">
                        <div className="col-sm-3 mx-auto card">
                            <div className="card-body">
                                <div className="border-bottom border-secondary card-title">
                                    <h1>LOGIN ANNOTATOR</h1>
                                </div>
                                <div className="card-title mt-1">
                                    <h4>Username</h4>
                                </div>
                                <form className="input-group"><input ref={input => this.username = input} className="form-control" type="email"/></form>
                                <div className="card-title mt-1">
                                    <h4>Password</h4>
                                </div>
                                <form className="input-group"><input ref={input => this.password = input} className="form-control" type="password"/></form>
                                <div className="d-flex justify-content-center my-3">
                                    <button className="btn btn-success btn-block" onClick={this.onButtonClick}>Login</button>
                                </div>
                                <p className="lead">Don't have account ? <Link to="/">Sign Up!</Link></p>
                            </div>
                        </div>
                    </div>
            )
        }

        return <Redirect to='/ItemAnnotator'/>
        
    }

}

const mapStateToProps = state => {
    return {
        id : state.annotator.id
    }
}
export default connect(mapStateToProps, {onLoginAnnotator})(LoginAnnotator)