import React, {Component} from 'react';

// import assets
import './NavBarView.css';

// import react components
import {Nav, NavItem, Navbar} from 'react-bootstrap';

// component class + export
export default class NaviBar extends Component {
  // get nav items based on state
  getNavItems() {
    // items container
    const items = {};
    
    // logged items
    items[true] = [
      {eventKey: 'WallOfShame', title: 'Wall of Shame'},
      {eventKey: 'YourChallenges', title: 'Your Challenges'},
      {eventKey: 'Issue', title: 'Issue a Challenge'},
      {eventKey: 'LogOut', title: 'Logout'}
    ];
    
    // not logged items
    items[false] = [
      {eventKey: 'WallOfShame', title: 'Wall of Shame'},
      {eventKey: 'LogIn', title: 'Login'},
    ];
    
    // return nav items array based on state
    return items[this.props.logged].map((item, index) => {
      if (item.eventKey === "LogIn"){
        return (
        <NavItem key={`nav_${index}`} eventKey={item.eventKey} selected={item.eventKey === this.props.currentView}>
        {item.title}
        <i className="fa fa-fw fa-github"></i>
      </NavItem>);
      } else {
        return (<NavItem key={`nav_${index}`} eventKey={item.eventKey} selected={item.eventKey === this.props.currentView}>
          {item.title}
          
        </NavItem>);
      }
    });
  }
  
  // render function, required as always
  render() {
    return (
      <div>
        <Navbar collapseOnSelect inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#" className="title">UVA CHALLENGE</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          
          <Navbar.Collapse>
            <Nav pullRight onSelect={this.props.callbackFunc}>{this.getNavItems()}</Nav>
          </Navbar.Collapse>
        </Navbar> 
      </div>
    );
  }  
}
