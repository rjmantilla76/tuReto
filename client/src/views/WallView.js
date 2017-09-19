import React, {Component} from 'react';

// import assets
import 'react-bootstrap-carousel/dist/bootstrap.min.css';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import './WallView.css';

// import react components
import {React_Bootstrap_Carousel} from 'react-bootstrap-carousel';

// import others
const prettydate = require("pretty-date");

// component class + export
export default class Wall extends Component {
  // component constructor
  constructor(props) {
    super(props);
    
    // define component state
    this.state = {wallInfo: []};
    
    // bind functions for jsx usage
    this.onSelect = this.onSelect.bind(this);
  }
  
  // build a challenge given a server-side one
  buildChallenge(challenge, index) {
    return {
      id: `challenge_${index+1}`,
      username: challenge.victim.name,
      challengeDate: challenge.createdAt,
      challenger: challenge.challenger.name,
      problemUrl: challenge.problem.url,
      problemName: challenge.problem.name,
      avatar: challenge.victim.avatar
    };
  }
    
  // perform actions when component mount
  componentDidMount() {
    // fetch wall of shame data from server & update state
    fetch('/challenges')
    .then(res => res.json())
    .then(wallInfo => {
      wallInfo = wallInfo.map((challenge, index) => this.buildChallenge(challenge, index));
      this.setState({wallInfo: wallInfo});
    });
  }
  
  // define behavior when wall of shame challenges are selected
  onSelect(active,direction) {
    console.log(`active=${active} && direction=${direction}`);
  }
  
  // get wall challenges as jsx
  getWallChallenges() {
    return this.state.wallInfo.map(wall => (
      <div id ={wall.id} key={wall.id} style={{height: 400, width: '100%'}}>
        <div className="row">
          <div className="col-1">&nbsp;</div>
          <div className="profilePic col-5">
            <img className="img-responsive" src={wall.avatar} alt="Profile pic"/>
          </div>
          <div className="col-5">
            <center className="topText">
              The contender {wall.username} hasn't solved the problem
              <a target="_blank" href={wall.problemUrl}>{wall.problemName}</a>!
            </center>
            <center className="challenger">The challenge was issued by {wall.challenger}</center>
            <div className="date pull-right">{prettydate.format(new Date(wall.challengeDate))}</div>
          </div>
          <div className="col-1">&nbsp;</div>
        </div>
      </div>
    ));
  }
  
  // render function, required as always
  render() {
    return (
      <div style={{margin: 20}}>
        <h1> Wall of Shame </h1>
        <React_Bootstrap_Carousel animation={true} onSelect={this.onSelect} className="carousel-fade">
          {this.getWallChallenges()}
        </React_Bootstrap_Carousel>
      </div>
    );
  }
}