import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import cookies from 'universal-cookie'
const cookie = new cookies()

class ManageAnnotator extends Component {

    constructor(props){
        super(props)  
        this.state = { 
            tasks: [],
            modal: false,
            id: null
        }

        this.toggle = this.toggle.bind(this);
    }

    getAnnotator() {  
        axios.get('https://konvergen-api.herokuapp.com/annotator/listAnnotator', {
            headers: {
                'Authorization': `Bearer ${cookie.get('token')}`
            }
        }).then(res =>  this.setState({tasks: res.data}))
      
    }
    

    componentDidMount() {
        axios.get('https://konvergen-api.herokuapp.com/annotator/listAnnotator', {
            headers: {
                'Authorization': `Bearer ${cookie.get('token')}`
            }
        }).then(res => {console.log(res.data); this.setState({tasks: res.data})})
    }

    
    toggle() { 
    this.setState(prevState => ({
      modal: !prevState.modal 
    }));
    }


    deleteProduct = (id) => { 
        axios.delete('https://konvergen-api.herokuapp.com/annotator/deleteAnnotator/'+id, {
            headers: {
                'Authorization': `Bearer ${cookie.get('token')}`
            }
        }).then(res=>{
            this.componentDidMount()
        })
    }

    edit = () => {
        
        const password = this.password.value
       
        axios.patch(
            'https://konvergen-api.herokuapp.com/annotator/editAnnotator/' + this.state.id,{
                password: password
            }, {
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
        if(this.props.user.id !== ''){ 
            return this.state.tasks.map( item => 
                { 
                        return (
                            <tr key={item.id}>
                                <td scope="col">{item.id}</td>
                                <td scope="col">{item.username}</td>
                                <td scope="col" >SUPERADMIN</td>
                                <td> 
                                    <button className = 'btn btn-warning m-1' onClick={()=>{this.deleteProduct(item.id)}}>Delete</button>
                                    <button className = 'btn btn-danger m-1' onClick={()=>{
                                        this.toggle()
                                        this.setState({id: item.id})}}> Change Password
                                    </button>

                                </td>
                            </tr>
                            
                        )
                    
            })
        }
        
        }

    render () {
        return (
         <div className="container">
             <div>
                      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>EDIT annotator</ModalHeader>
                        <ModalBody>
                            <div>
                            <input className='form-control' type='hidden' value = {this.state.id}
                                    ref={input => {this.id = input}}/>
                            PASSWORD
                            <input className='form-control' type='password'  
                                    ref={input => {this.password = input}}
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
            <div>
                <h3 className = 'justify'> MANAGE ANNOTATOR </h3>
                <table style={{margin: 0, padding: 5, width: 800}} className="table table-hover mb-4">
                <thead>
                    <tr>
                        <th scope="col">USER ID</th>
                        <th scope="col">USERNAME</th>
                        <th scope="col">CREATED BY</th>
                        <th scope="col">ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderList()}
                </tbody>
                </table>
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

export default connect(mapStateToProps) (ManageAnnotator)

