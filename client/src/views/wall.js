import React, { Component } from 'react';
import 'react-bootstrap-carousel/dist/bootstrap.min.css';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import {React_Bootstrap_Carousel} from 'react-bootstrap-carousel';
import './wall.css';

const prettydate = require("pretty-date");
export default class Wall extends Component{
    constructor(props) {
        super(props);
    }
     state = {wallInfo: []};
     componentDidMount(){
         fetch('/challenges')  
            .then(res =>{
                return res.json();
            })
            .then(wallInfo => { 
                let cont=1;
                let newState = {wallInfo: wallInfo.map(challenge =>
                ({id: "challenge_"+(cont++),
                    username: challenge.victim.name,
                    challengeDate: challenge.createdAt,
                    challenger: challenge.challenger.name,
                    problemUrl: challenge.problem.url,
                    problemname: challenge.problem.name,
                    avatar: challenge.victim.avatar
                }))};
                return this.setState(newState);
            });

              
     }
     onSelect= (active,direction)=>{
        console.log(`active=${active} && direction=${direction}`);
    }
     render(){
         return(
            <div style={{margin:20}}>
                <h1> Wall of Shame </h1>
            <React_Bootstrap_Carousel
              animation={true}
              onSelect={this.onSelect}
              className="carousel-fade"
            >
            
            {this.state.wallInfo.map(wall =>(
            <div style={{height:400,width:"100%"}} id ={wall.id} key={wall.id}>
                <div className="row">
                    <div className="col-1">&nbsp;</div>
                    <div className="profilePic col-5">
                        <img className="img-responsive" src={wall.avatar} alt="Profile pic"/>
                    </div>
                    <div className="col-5">
                        <center className="topText">The contender {wall.username} hasn't solved the problem <a target="_blank" href={wall.problemUrl}>{wall.problemname}</a>!</center>
                        <center className="challenger">The challenge was issued by {wall.challenger}</center>
                        <div className="date pull-right">{prettydate.format(new Date(wall.challengeDate))}</div>
                    </div>
                    <div className="col-1">&nbsp;</div>
                </div>
            </div>))
            }
        
              
            </React_Bootstrap_Carousel>
          </div>
  
         );
     }
};