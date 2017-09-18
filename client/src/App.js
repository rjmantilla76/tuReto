import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Wall from './views/wall.js';
import NavBar from './views/NavBar.js'
class App extends Component {
  state = {
    logged: false,
    currentView: "WallOfShame"
  }
  render() {
    return (
      <div className="App">
        <NavBar loggedIn = {this.state.logged} callbackFunc = {(eventKey)=>{
          switch (eventKey){
            case "WallOfShame":
              this.setState({logged: this.state.logged, currentView: "WallOfShame"});
              break;
            case "SingUp":
              //TODO
              break;
            case "LogIn":
              //TODO
              this.setState({logged: true, currentView: "WallOfShame"});
              break;
            case "LogOut":
              this.setState({logged: false, currentView: "WallOfShame"});
              break;
            case "YourChallenges":
              this.setState({logged: this.state.logged, currentView: "YourChallenges"});
              break;
            case "Issue":
              this.setState({logged: this.state.logged, currentView: "Issue"});
              break;
            default:
              this.setState({logged: false, currentView: "WallOfShame"});
          }
        }}/>
        {this.state.currentView==="WallOfShame" && <Wall />}
        //TODO add two views
      </div>
    );
  }
}

export default App;
