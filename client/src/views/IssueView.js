import React, {Component} from 'react';

// import assets
import 'react-bootstrap-carousel/dist/bootstrap.min.css';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import './IssueView.css';

// component class + export
export default class Issue extends Component {
  // component constructor
  constructor(props) {
    super(props);
    
    // define component state
    this.state = {users: [], problems: [], currVictim: undefined, currProblem: undefined};
    
    // bind function for jsx usage
    this.selectUser = this.selectUser.bind(this);
    this.selectProblem = this.selectProblem.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  
  // fetch users from server
  getUsers() {
    fetch('/users')  
    .then(res => res.json())
    .then(users => this.setState({users: users}));
  }
  
  // fetch problems from server
  getProblems() {
    fetch('/problems')
    .then(res => res.json())
    .then(problems => this.setState({problems: problems}));
  }
  
  // define behavior when component mount
  componentDidMount(){
    this.getUsers();
    this.getProblems();
  }
  
  // handle user selection
  selectUser(userId) {
    this.setState({currUser: userId});
  }
  
  // handle problem selection
  selectProblem(problemId) {
    this.setState({currProblem: problemId});
  }
  
  // handle send challenge button
  handleClick(challengeSend) {
    // try to create the challenge
    let data = {challengedId: this.props.user, victimId: this.state.currUser, problemId: this.state.currProblem};

    fetch('challenges', {method: 'POST', body: data})
    .then(res => res.json())
    .then(res => alert(res.message));
  }
  
  // get users as jsx
  getUsersRender() {
    return this.state.users.map(user => (
      <li
        id={user.id}
        key={user.id}
        style={{height: 250, width: '100%'}}
        className="user col-5 row"
        onClick={() => this.selectUser(user.id)}>
          
        <div className="col-4">
          <img className="profilePic img-fluid" src={user.avatar} alt="Profile pic" />
        </div>
        
        <div className="col-7">
          <center className="topText">
            <p>{user.name} ({user.handle})</p>
            <p>Level: {user.level}</p>
          </center>
        </div>
      </li>
    ));
  }
  
  // get problems as jsx
  getProblemsRender() {
    return this.state.problems.map(problem => (
      <li
        id={problem.pid}
        key={problem.pid}
        style={{height: 250, width: '100%'}}
        className="problem col-5 row"
        onClick={() => this.selectProblem(problem.pid)}>
        
        <p>{problem.number} -- {problem.title}</p>
      </li>
    ));
  }
  
  // render function, required as always
  render() {
    return (
      <div style={{margin: 20}}>
        <h1>Time to challenge someone</h1>
  
        <h2>Users</h2>
        <ul>{this.getUsersRender()}</ul>
        
        <h2>Problems</h2>
        <ul>{this.getProblemsRender()}</ul>
        
        <button onClick={this.handleClick}>Challenge him now!</button>
      </div>
    );
  }
}