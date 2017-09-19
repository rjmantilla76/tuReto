import React, {Component} from 'react';

// import assets
import 'react-bootstrap-carousel/dist/bootstrap.min.css';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import './ChallengesView.css';

// import others
const prettydate = require('pretty-date');

// component class + export
export default class Challenges extends Component{
  // component constructor
  constructor(props) {
    super(props);
    
    // define component state
    this.state = {challengeInfo: []};
  }
  
  // build a challenge given a server-side one
  buildChallenge(challenge, index) {
    return {
      id: `challenge_${index+1}`,
      challengeDate: challenge.createdAt,
      challenger: challenge.challenger.name,
      problemUrl: challenge.problem.url,
      challengeId: challenge._id,
      problemname: challenge.problem.name,
      avatar: challenge.challenger.avatar
    };
  }
  
  // fetch challenges from server
  getChallenges() {
    fetch(`/challenges/pending`, {credentials: 'same-origin'})  
    .then(res => (res.status === 200 || res.status === 304) ? res.json() : null)
    .then(challengeInfo => {
      if (!challengeInfo) return this.props.logout();
      challengeInfo = challengeInfo.map((challenge, index) => this.buildChallenge(challenge, index));
      this.setState({challengeInfo: challengeInfo});
    });
  }
  
  // define behavior when component mount
  componentDidMount(){
    this.getChallenges();
  }
  
  // handle challenge solved button
  handleClick(challengeSend) {
    // inform the server that this challenge is done
    fetch(`/challenges/${challengeSend}`, {method: 'PUT', credentials: 'same-origin'})
    .then(res => {
      if (res.status !== 200 && res.status !== 304) return this.props.logout();
      res = res.json();
      alert(res.message);
      this.getChallenges();
    });
  }
  
  // get challenges as jsx
  getChallengesRender() {
    return this.state.challengeInfo.map(challenge => (
      <div id ={challenge.id} key={challenge.id} style={{height: 250, width: '100%'}} className="challenge col-5 row">
        <div className="col-4">
          <img className="profilePic img-fluid" src={challenge.avatar} alt="Profile pic" />
        </div>
        
        <div className="col-7">
          <center className="topText">
            {challenge.challenger} challenged you to solve &nbsp;
            <a target="_blank" href={challenge.problemUrl}>{challenge.problemname}</a>!
          </center>
          <div className="date pull-right">{prettydate.format(new Date(challenge.challengeDate))}</div>
          <button type="button" className="btn btn-primary btn-lg" onClick={() => this.handleClick(challenge.challengeId)}>
            I solved it!
          </button>
        </div>

        <div className="col-1">&nbsp;</div>
      </div>
    ));
  }
  
  // render function, required as always
  render() {
    return (
      <div style={{margin: 20}}>
        <h1>Pending Challenges</h1>
        <div className="row">{this.getChallengesRender()}</div>
      </div>
    );
  }
};