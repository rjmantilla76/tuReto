import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Wall from './views/wall.js';
import NavBar from './views/NavBar.js';
import Challenges from './views/challengesView.js';
class App extends Component {
  state = {
    logged: false,
    currentView: "WallOfShame",
    user: undefined
  }
  render() {
    return (
      <div className="App">
        <NavBar loggedIn = {this.state.logged} callbackFunc = {(eventKey)=>{
          switch (eventKey){
            case "WallOfShame":
              this.setState({logged: this.state.logged, currentView: "WallOfShame", user: this.state.user});
              break;
            case "SingUp":
              //TODO
              break;
            case "LogIn":
              //TODO
              this.setState({logged: true, currentView: "WallOfShame", user: 162153});
              break;
            case "LogOut":
              this.setState({logged: false, currentView: "WallOfShame", user : undefined});
              break;
            case "YourChallenges":
              this.setState({logged: this.state.logged, currentView: "YourChallenges", user : this.state.user});
              break;
            case "Issue":
              this.setState({logged: this.state.logged, currentView: "Issue", user : this.state.user});
              break;
            default:
              this.setState({logged: false, currentView: "WallOfShame", user : undefined});
          }
        }}/>
        {this.state.currentView==="WallOfShame" && <Wall />}
        {this.state.currentView==="YourChallenges" && <Challenges user={this.state.user}/>}
      </div>
    );
  }
}

export default App;
