import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

import cookies from 'universal-cookie'
const cookie = new cookies()

class Home extends Component {

    render () {
        return <Redirect to ='/Login'/>

    }

}

export default Home