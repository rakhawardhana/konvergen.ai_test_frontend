import React, { Component } from 'react'
import axios from '../config/axios'


import { connect } from 'react-redux'

import cookies from 'universal-cookie'
const cookie = new cookies()

class BookedTasks extends Component {

    state = {
        tasks: [],
        searchtasks: []
    }

    componentDidMount() {
        this.getTasks()    
    }

    getTasks = () => {
        axios.get('task/alltask/' + this.props.annotator.id, {
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
                <div className="card col-3 m-5">
                    <div className='card-body'>
                        <h5 className='card-title'> {item.name}</h5>
                        <p className='card-text'> {item.description}</p>
                        <a href={`https://konvergen-api.herokuapp.com/task/downloadDataset/${item.dataset}`} download>Click to download</a>
                    </div>
                </div>
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

const mapStateToProps = state => {
    return {
        annotator: state.annotator 
    }
}

export default connect(mapStateToProps)(BookedTasks)