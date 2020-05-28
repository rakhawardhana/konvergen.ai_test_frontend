import React, { Component } from 'react'
import axios from '../config/axios'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import cookies from 'universal-cookie'
const cookie = new cookies()

class ManageTask extends Component {

    constructor(props) {
        super(props);
        this.state = {
          tasks: [],
          id: null,
          name: null, 
          description: null, 
          dataset: null, 
          booked: null
      
        };
    
        this.toggle = this.toggle.bind(this);
    }

    
    toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
    }

    componentDidMount(){
    
        axios.get('task/alltask', {
            headers: {
                'Authorization': `Bearer ${cookie.get('token')}`
            }
        })
            .then(res => {
               this.setState({tasks: res.data })
            })
        
    }

    getProduct = () => {
        axios.get('/task/alltask', {
            headers: {
                'Authorization': `Bearer ${cookie.get('token')}`
            }
        })
            .then(res => {
               this.setState({tasks: res.data})
            })
    }
    
    
    onButtonClick = () => {

        const formData = new FormData()
        
        const dataset = this.dataset.files[0]
        const name = this.name.value
        const description = this.description.value
        const admin_id = this.props.auth.id

        formData.append('datasets', dataset)
        formData.append('name', name)
        formData.append('description', description)
        formData.append('booked', 0)
        formData.append('admin_id', admin_id)


        axios.post(
            '/task/createTask',
            formData,
            
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${cookie.get('token')}`
                },
                
            }
        ).then (res => {
            console.log(res.data)
            document.location.reload(true)
        })
        
    }
    

    delete = (id) => {
        axios.patch(
            'task/disableTask/' + id, null, {
                headers: {
                    'Authorization': `Bearer ${cookie.get('token')}`
                }
            }).then (res => {
            console.log(res.data)
            document.location.reload(true)

        })
    }

    edit = () => {
        
        const formData = new FormData()
        
        const name = this.state.name
        const description = this.state.description
        const dataset = this.state.dataset
        const booked = this.state.booked
        const admin_id = this.props.auth.id
        
        console.log(this.dataset.files[0])
        console.log(dataset)
        formData.append('name', name)
        formData.append('description', description)
        formData.append('datasets', this.state.dataset)
        formData.append('booked', booked)
        formData.append('admin_id', admin_id)

       
        
        axios.patch(
            '/task/editTask/' + this.state.id,
            formData, {
                headers: {
                    'Authorization': `Bearer ${cookie.get('token')}`
                }
            }
        ).then (res => {
            console.log(res.data)
            document.location.reload(true)

        })
    }

    

    renderList = () => {
       
        return this.state.tasks.map( item => { 
            return (
                
                <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    
                    <td><a href={item.dataset} download>{`${item.name}.zip`}</a></td>
                    <td></td>
                    <td>
                        <button className = 'btn btn-primary' onClick={() => {
                            this.toggle()
                            this.setState({id: item.id, name: item.name, description: item.description, dataset: item.dataset, booked: item.booked})
                            }}>Edit</button>
                        <button className = 'btn btn-warning' onClick={()=>{this.delete(item.id)}} >Delete Task </button>
                    </td>
                </tr>
                
            )
        })
    }
    render () {
        if (this.props.auth.id) {
        let task = this.state.tasks.filter(value => {
            if(value.id === this.state.id){
                return true
            }
        })
        // console.log(task)
            return (
                <div className="container">
                    <div>
                      {/* <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button> */}
                      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>EDIT TASKS</ModalHeader>
                        <ModalBody>
                         <div>
                            <input className='form-control' type='hidden' value = {this.state.id}
                                    ref={input => {this.id = input}}/>
                            NAME_PRODUCT
                            <input className='form-control' type='text'  
                                    value = {this.state.name}
                                    ref={input => {this.name = input}}
                                    onChange={event => {
                                        this.setState({name: event.target.value})}}
                                    /> 
                           
                            DESCRIPTION
                            <input className='form-control' type='text' 
                                    ref={input => {this.description = input}}
                                    value = {this.state.description}
                                    onChange={event => {
                                        this.setState({description: event.target.value})}}
                                    />
                            DATASET
                            <input  type='file' 
                                ref={input => {this.dataset = input}} 
                                  onChange={event=> {
                                   this.setState({dataset: event.target.files[0]})
                                }}
                            />    
                         </div>
                        </ModalBody>
                         <ModalFooter>
                           <Button color="primary"  onClick={() => {
                                this.toggle()
                                this.edit()}} >Edit</Button>
                           <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                      </Modal>
                    </div>
                    <h1 className="display-4 text-center">LIST OF TASKS</h1>
                    <table className="table table-hover mb-5">
                        <thead>
                            <tr>
                                <th scope="col">NAME</th>
                                <th scope="col">DESCRIPTION</th>
                                <th scope="col">DATASET</th>
                                <th scope="col">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderList()}
                        </tbody>
                    </table>

                    <h1 className="display-4 text-center">Input Tasks</h1>
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th scope="col">NAME</th>
                                <th scope="col">DESC</th>
                                <th scope="col">DATASET</th>
                                <th scope="col">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="col"><input ref={input => this.name = input} className="form-control" type="text" /></th>
                              
                                <th scope="col" style={{width:450}}  > <textarea className="form-control" rows="5" type="text" ref={input => this.description = input}  /></th>
                                
                                <th className='custom-file'>
                                    <input type='file' ref={input => {this.dataset = input}}/>
                                </th>
            
                                <th scope="col"><button className="btn btn-outline-warning" onClick={this.onButtonClick}>Add</button></th>
                            </tr>
                        </tbody>
                    </table>
                  
                </div>
            )
            }
            //return <Redirect to='/loginadmin'/>
        }
        
}


const mapStateToProps = state => {
    return {
        auth: state.auth 
    }
}

export default connect(mapStateToProps)(ManageTask)
