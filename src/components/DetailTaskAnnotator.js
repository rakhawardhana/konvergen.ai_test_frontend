import React, { Component } from 'react'
import axios from 'axios'
// import axios from '../config/axios'
import { Link } from "react-router-dom";

import { connect } from 'react-redux'

import cookies from 'universal-cookie'
const cookie = new cookies()

class DetailTaskAnnotator extends Component {

    state = {
        task : {},
        download: false
        
        //task : {
        //     // id: '',
        //     // name: '',
        //     // price: '',
        //     // avatar: ''
        // }
    }

    componentDidMount() {

            let pro_id = this.props.match.params.id
        
            axios.get('https://konvergen-api.herokuapp.com/task/' + pro_id, {
                headers: {
                    'Authorization': `Bearer ${cookie.get('token')}`
                }
            })
            .then(res => {
                console.log(res.data)
                this.setState({
                    task: res.data[0]
                })
                if(res.data[0].booked === 1){
                    this.setState({
                        download: true
                    })
                }
                if(res.data[0].booked === 0){
                    this.setState({
                        download: false
                    })
                }
                
            })
        
    }

    downloadDataset = (dataset) => {
        axios.get('https://konvergen-api.herokuapp.com/task/downloadDataset/' + dataset, {
            headers: {
                'Authorization': `Bearer ${cookie.get('token')}`
            }
        }
        ).then(res => {
            console.log(res)
           return <a href={res.data.path} download>Click to download</a>

        })
    }

    booking = (id) => {
        let annotator_id = this.props.annotator.id

        axios.patch('https://konvergen-api.herokuapp.com/task/bookingTaskAnnotator/'+id, {
            annotator_id
        }, {
            headers: {
                'Authorization': `Bearer ${cookie.get('token')}`
            }
        }).then(res=>{
            this.componentDidMount()
        })

    }

    render() { 
        return (
            <div className='card col-6 mt-5 mx-auto'>
                <div className='card-body'>
                    <h3 className ='card-title'>{this.state.task.name}</h3>
                    <p className='card-text'>{this.state.task.description}</p>
                    <div style={{margin: 0, padding: 5}} >{this.state.download? <button disable="true" className='btn btn-primary'> Unavailable! you can contact your Superadmin</button> : <button className='btn btn-primary' onClick={()=>{this.booking(this.state.task.id)}}> Booking </button> }</div>

                    <Link to='/bookedtasks'>Check your booked taks!</Link>

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

export default connect(mapStateToProps)(DetailTaskAnnotator)
