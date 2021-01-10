import React, { Component } from 'react';

class Login extends Component {
    constructor(props){
		super(props);
		this.state ={
			user_id:'',
			user_pw:''
		};

		this.handleValueChange = this.handleValueChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.projectLogin = this.projectLogin.bind(this);
	}

    handleSubmit(e){

        e.preventDefault();
        this.projectLogin().then((res) => {
            console.log(res.data);
        });

    }
    
    projectLogin = async () => {
        const url = 'http://localhost:5000/chkserver';

        let userInfo={
            'user_id':this.state.user_id,
            'user_pw':this.state.user_pw
        };

        fetch(url,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
            
        })
        .then((response)=>{
            return response.json();
        })
        .then((res)=>{
            if(res.loginresult){
                alert("로그인에 성공했습니다.");
                window.location.href = '/';
            }
            else{
                alert("일치하는 ID와 PW가 없습니다.");
                window.location.href = '/login';
            }
        });
    }

    handleValueChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
        console.log(this.state);
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
            <div className="wrapper">
                <div style = {containerStyle} className="container">
                    <h1 style = {headTitlestyle} >Welcome to SOLCHIVE!</h1>
                    <form className="loginForm">
                        <div>
                            <input 
                                name="user_id"  
                                value={this.state.user_id} 
                                onChange={this.handleValueChange}
                                style = {loginAreastyle} 
                                type="text" 
                                placeholder="User ID" 
                            />
                        </div>
                        <div>
                            <input 
                                name="user_pw"  
                                value={this.state.user_pw} 
                                onChange={this.handleValueChange}
                                style = {loginAreastyle} 
                                type="password" 
                                placeholder="User PW" 
                            />
                        </div>
                        <div>
                            <button style = {loginAreastyle} type="submit" onClick={this.projectLogin} id = "login_btn">Login</button>
                        </div>
                    </form>
                </div>
                
            </div>
        );
    }
}

export default Login;
