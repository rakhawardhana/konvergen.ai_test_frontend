import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import cookies from 'universal-cookie'
const cookie = new cookies()

class DetailTask extends Component {

    state = {
        task : {},
        download: false
        
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
                console.log(this.state.download)
                
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
        let admin_id = this.props.user.id

        axios.patch('https://konvergen-api.herokuapp.com/task/bookingTask/'+id, {
            admin_id
        }, {
            headers: {
                'Authorization': `Bearer ${cookie.get('token')}`
            }
        }).then(res=>{
            this.componentDidMount()
        })

    }

    revokeBooking = (id) => {
        let admin_id = this.props.user.id

        axios.patch('https://konvergen-api.herokuapp.com/task/revokingTask/'+id, {
            admin_id
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
                    <div style={{margin: 0, padding: 5}} >{this.state.download? <button className='btn btn-primary' onClick={()=>{this.revokeBooking(this.state.task.id)}}> Revoke Booking </button> : <button className='btn btn-primary' onClick={()=>{this.booking(this.state.task.id)}}> Booking </button> }</div>
                    <div>{this.state.download? <a href={this.state.task.dataset} download>Click to download</a> : <a>booking first before download dataset</a>} </div>
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

export default connect(mapStateToProps)(DetailTask)
