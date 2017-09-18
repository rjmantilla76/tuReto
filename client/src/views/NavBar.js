import React, { Component } from 'react';
import './NavBar.css';
import { Nav, NavItem, NavDropdown, MenuItem, Navbar } from 'react-bootstrap';
export default class NaviBar extends Component{
    state = {
        logged: false
    };
    render(){
        if(this.props.loggedIn === true){
            return (
                <div>
                    <Navbar collapseOnSelect inverse >
                        <Navbar.Header>
                            <Navbar.Brand>
                                <a href="#" className="title">UVA CHALLENGE</a>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                            <Nav pullRight onSelect={this.props.callbackFunc}>
                                <NavItem eventKey={"WallOfShame"} >Wall of Shame</NavItem>
                                <NavItem eventKey={"YourChallenges"}>Your Challenges</NavItem>
                                <NavItem eventKey={"Issue"}>Issue a Challenge</NavItem>
                                <NavItem eventKey={"LogOut"}>LogOut</NavItem>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar> 
                </div>
              );
        } else{
            return (
                <div>
                    <Navbar collapseOnSelect inverse >
                        <Navbar.Header>
                            <Navbar.Brand>
                                <a href="#" className="title">UVA CHALLENGE</a>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                            <Nav pullRight onSelect={this.props.callbackFunc}>
                                <NavItem eventKey={"WallOfShame"} selected >Wall of Shame</NavItem>
                                <NavItem eventKey={"SingUp"}>Sign up</NavItem>
                                <NavItem eventKey={"LogIn"}>Log In</NavItem>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar> 
                </div>
              );
        }
        
    }

}
