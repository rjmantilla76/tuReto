import React, { Component } from 'react';
import 'react-bootstrap-carousel/dist/bootstrap.min.css';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import {React_Bootstrap_Carousel} from 'react-bootstrap-carousel';
import './challengesView.css';
const prettydate = require("pretty-date");

export default class Challenges extends Component{
    constructor(props) {
        super(props);
    }
     state = {challengeInfo: []};

     getChallenges(){
        fetch('/challenges/byUser/'+this.props.user)  
        .then(res =>{
            return res.json();
        })
        .then(challengeInfo => { 
            let cont=1;
            let newState = {challengeInfo: challengeInfo.map(challenge =>
            ({id: "challenge_"+(cont++),
                challengeDate: challenge.createdAt,
                challenger: challenge.challenger.name,
                problemUrl: challenge.problem.url,
                challengeId: challenge._id,
                problemname: challenge.problem.name,
                avatar: challenge.challenger.avatar
            }))};
            return this.setState(newState);
        });
     }
     componentDidMount(){
        this.getChallenges();
     }
     handleClick(challengeSend){
         fetch('/challenges/'+challengeSend, {
             method: 'PUT'
         }).then(res =>{
            return res.json();
         }).then(res =>{
             alert(res.message);
         }).then (()=>{
            this.getChallenges();
         })
     }
     render(){
        return(
           <div style={{margin:20}}>
               <h1> Pending Challenges </h1>
           
           <div className="row">
            {this.state.challengeInfo.map(challenge =>(
            <div style={{height:250,width:"100%"}} id ={challenge.id} key={challenge.id} className="challenge col-5 row">
                    
                        <div className="col-4">
                            <img className="profilePic img-fluid" src={challenge.avatar} alt="Profile pic"/>
                        </div>
                        <div className="col-7">
                            <center className="topText">{challenge.challenger} challenged you to solve <a target="_blank" href={challenge.problemUrl}>{challenge.problemname}</a>!</center>
                            <div className="date pull-right">{prettydate.format(new Date(challenge.challengeDate))}</div>
                            <button type="button" className="btn btn-primary btn-lg" onClick={()=> this.handleClick(challenge.challengeId)}>I solved it! </button>
                        </div>
                        <div className="col-1">&nbsp;</div>
                    
            </div>))
            }
           </div>

         </div>
 
        );
    }
    
};