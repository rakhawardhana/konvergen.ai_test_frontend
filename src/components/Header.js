import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import { logoutUser } from '../actions'
import { logoutAnnotator } from '../actions'

import cookies from 'universal-cookie'

import {
    Button,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

const cookie = new cookies()

class Header extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false,
        };
      }
    toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

  

    onButtonClick = () => {
        this.props.logoutUser()
    }

    onButtonClickAnnotator = () => {
        this.props.logoutAnnotator()
    }
    

    render () {
         if(this.props.user.id === '' && this.props.annotator.username === ''){
            return (
                <div>
                    <Navbar color="black" light expand="md">
                    <NavbarBrand href="/">SERVE YOUR DATASETS</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar >
                        <NavItem>
                            <Link to='./loginannotator' >Login as Annotator</Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/register'>
                                <Button color="primary" className="mx-3">Register</Button>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/login' >
                                <Button color="success">Login</Button>
                            </Link>
                        </NavItem>
                        </Nav>
                    </Collapse>
                    </Navbar>
                </div>
            )
        } if(this.props.user.id ){
            return (
                <div>
                    <Navbar color="light" light expand="md">
                        <NavbarBrand href="/">SERVE YOUR DATASETS</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                        <NavItem className='mt-2'>
                            <Link to='../item' >All Tasks</Link>
                        </NavItem>
                      
                        <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            SUPERADMIN
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>
                            <Link to='/managetask' >Manage Tasks</Link>
                            </DropdownItem>
                            <DropdownItem>
                            <Link to='/createannotator'>Create Annotator</Link>
                            </DropdownItem>
                            <DropdownItem>
                            <Link to='/manageannotator' >Manage Annotator</Link>
                            </DropdownItem>
                            <DropdownItem divider />
                            <Link to='/login' >
                            <Button className='dropdown-item' onClick={this.onButtonClick}>
                                Logout
                            </Button>
                            </Link>
                        </DropdownMenu>
                        </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                    </Navbar>
                </div>
                
              );
        }
            else {
                 return (
                <div>
                    <Navbar color="light" light expand="md">
                        <NavbarBrand href="/">FREE DATASET</NavbarBrand>
                        <NavbarBrand href="./Aboutus">Your Booking</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                        <NavItem className='mt-2'>
                            <Link to='./itemannotator' >All Tasks</Link>
                        </NavItem>
                      
                        <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                        Hallo, {this.props.annotator.username}
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem divider />
                            <Link to='/login' >
                            <Button className='dropdown-item' onClick={this.onButtonClickAnnotator}>
                                Logout
                            </Button>
                            </Link>
                        </DropdownMenu>
                        </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                    </Navbar>
                </div>
              );
        }   
        }  
    }
    
const mapStateToProps = state => {
    return {
        user: state.auth, 
        annotator: state.annotator 

    }
}

export default connect(mapStateToProps, {logoutUser, logoutAnnotator})(Header)
