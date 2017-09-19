import React, {Component} from 'react';

// import assets
import './App.css';

// import react components
import Wall from './views/WallView.js';
import NavBar from './views/NavBarView.js';
import Challenges from './views/ChallengesView.js';
import Issue from './views/IssueView.js';

// component class + export
export default class App extends Component {
  // component constructor, init magic here
  constructor(props) {
    super(props);
    
    // configure initial state
    this.state = {
      logged: false,
      currentView: 'WallOfShame',
      user: undefined
    };
    
    // bind functions for use un jsx
    this.changeView = this.changeView.bind(this);
  }
  
  // change view + state depending on event key
  changeView(eventKey) {
    switch (eventKey) {
      // user-flow related events (login, logout, signup)
      case 'SignUp':
        //TODO
        this.setState({logged: true, currentView: 'WallOfShame', user: 162153});
        break;
      case 'LogIn':
        //TODO
        this.setState({logged: true, currentView: 'WallOfShame', user: 162153});
        break;
      case 'LogOut':
        // TODO
        this.setState({logged: false, currentView: 'WallOfShame', user : undefined});
        break;
        
      // main-views related events (wall of shame, your challenges, issue challenge)
      case 'WallOfShame':
      case 'YourChallenges':
      case 'Issue':
        this.setState({currentView: eventKey});
        break;
        
      // if nothing works, home will be wall of shame
      default:
        this.setState({logged: false, currentView: 'WallOfShame', user: undefined});
    }
  }
  
  // get main component to render based on curr state
  getMainComponent() {
    switch (this.state.currentView) {
      case 'WallOfShame': return <Wall />;
      case 'YourChallenges': return <Challenges user={this.state.user} />;
      case 'Issue': return <Issue user={this.state.user} />;
      default: return <Wall />;
    }
  }
  
  // render function, required as always
  render() {
    return (
      <div className="App">
        <NavBar currentView={this.state.currentView} logged={this.state.logged} callbackFunc={this.changeView} />
        {this.getMainComponent()}
      </div>
    );
  }
}
