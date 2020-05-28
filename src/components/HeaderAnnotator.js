import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { logoutAnnotator } from '../actions'

import cookies from 'universal-cookie'
const cookie = new cookies()

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


class HeaderAnnotator extends Component {
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
        // menghapus username dari redux state
        this.props.logoutAnnotator()
    }

    

    render () {
         if(this.props.annotator.username === ''){
            return (
                <div>
                    <Navbar color="black" light expand="md">
                    <NavbarBrand href="/">COFFEE EX MACHINE</NavbarBrand>
					<NavbarBrand href="./Aboutus">SIAPA KITA?</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar >
                        <NavItem>
                            <Link to='./itemannotator' >All Tasks</Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/loginannotator' >
                                <Button color="success">Login</Button>
                            </Link>
                        </NavItem>
                        </Nav>
                    </Collapse>
                    </Navbar>
                </div>
            )
        } 

        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">FREE DATASET</NavbarBrand>
					<NavbarBrand href="./Aboutus">Your Booking</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                    <NavItem className='mt-2'>
                        <Link to='./item' >All Tasks</Link>
                    </NavItem>
                  
                    <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                    Hallo, {this.props.annotator.username}
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem divider />
                        <Link to='/loginannotator' >
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
    
}

const mapStateToProps = state => {
    return {
        annotator: state.annotator 
    }
}

export default connect(mapStateToProps, {logoutAnnotator})(HeaderAnnotator)
