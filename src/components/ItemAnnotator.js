import React, { Component } from 'react'
import axios from '../config/axios'

import EachItemAnnotator from './EachItemAnnotator'

import cookies from 'universal-cookie'
const cookie = new cookies()

class ItemAnnotator extends Component {

    state = {
        tasks: [],
        searchtasks: []
    }

    componentDidMount() {
        this.getTasks()    
    }

    

    getTasks = () => {
        axios.get('task/alltask', {
            headers: {
                'Authorization': `Bearer ${cookie.get('token')}`
            }
        })
            .then(res => {
                console.log(res.data)
               this.setState({tasks: res.data, searchtasks: res.data})
            })
    }

    renderList = () => {
        return this.state.tasks.map(item => {
            console.log(item);
            
            return (
                <EachItemAnnotator item={item}/> 
            ) 
        })
    }

    render () {
        return (
            <div className="row">
                
                <div className="row col-10">
                    {this.renderList()}
                </div>
            </div>
        )
    }
}

export default ItemAnnotator