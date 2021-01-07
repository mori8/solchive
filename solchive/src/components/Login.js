import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import 'whatwg-fetch';

//import AlertContainer from 'react-alert';

class Login extends Component {
    //https://ljtaek2.tistory.com/102
    //https://calyfactory.github.io/%EC%88%9C%EC%88%98-react.js%EB%A1%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0/
    //https://velopert.com/3629 - constructor 공부
    constructor(props){
		super(props);
		this.state ={
			requestID:'',
			requestPW:''
		};

		this.requestIDChange = this.requestIDChange.bind(this);
		this.requestPWChange = this.requestPWChange.bind(this);
	}

    onSubmit(){
		let userInfo={
			'user_id':this.state.requestID,
			'user_pw':this.state.requestPW
		};

		fetch('/login',{
			method: 'POST',
			headers:{
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userInfo)
	    }).then((response)=> response.json())
	    .then((responseData)=>{
	    	if(responseData.loginresult){
	    		this.props.onSuccess(this.state.requestID);
	    	}
	    });
	}

	requestIDChange(event){
		this.setState({requestID: event.target.value});
	}
	requestPWChange(event){
		this.setState({requestPW: event.target.value});
	}

    render() {

        const containerStyle = {
            textAlign: "center",
            padding: "50px"
        }

        const headTitlestyle ={
            margin: "30px",
        }

        const loginAreastyle = {
            margin: "5px",
            width: "300px",
            height: "35px"
        }

        return (
            <div class="wrapper">
                <div style = {containerStyle} class="container">
                    <h1 style = {headTitlestyle} >Welcome to SOLCHIVE!</h1>
                    <form class="loginForm">
                        <div>
                            <input 
                                name="requestID"  
                                value={this.state.requestID} 
                                onChange={this.requestIDChange}
                                style = {loginAreastyle} 
                                type="text" 
                                placeholder="User ID" 
                            />
                        </div>
                        <div>
                            <input 
                                name="requestPW"  
                                value={this.state.requestPW} 
                                onChange={this.requestPWChange}
                                style = {loginAreastyle} 
                                type="password" 
                                placeholder="User PW" 
                            />
                        </div>
                        <div>
                            <button onClick={this.onSubmit.bind(this)} style = {loginAreastyle} type="submit" id = "login_btn">Login</button>
                        </div>
                    </form>
                </div>
                
            </div>
        );
    }
}

export default Login;