import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap';
//import Cookies from 'js-cookie';
import {Cookie} from './Cookie';
export class Navigation extends Component{

    render(){
        return(
            <Navbar bg="dark" expand="lg">
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
            <NavLink className=" p-2 bg-dark text-white" to="./">
                Home
            </NavLink>
            <NavLink className="p-2 bg-dark text-white" to="./employeelogin">
                log in
            </NavLink>
            <NavLink className="p-2 bg-dark text-white" to="./SteelLadle">
            SteelLadle
            </NavLink>
            <NavLink className="p-2 bg-dark text-white" to="./employee">
                Employee 
            </NavLink>  
            <NavLink className="p-2 bg-dark text-white" to="./history">
                History 
            </NavLink>  
            <NavLink className="p-2 bg-dark text-white" to="./employeelogin">
                <Cookie/>
            </NavLink>      
            </Nav>
            </Navbar.Collapse>
        </Navbar>
        )
    }
}