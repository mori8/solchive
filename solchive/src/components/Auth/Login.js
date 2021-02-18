import React, { Component } from 'react';
import style from './Login.module.css';

class Login extends Component {
    state = {
        user_id:'',
        user_pw:''
    };

    handleSubmit = (e) => {
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
            credentials: 'include',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo),
        })
        .then((response)=>{
            return response.json();
        })
        .then((res)=>{
            if(res.user_id){
                alert("로그인에 성공했습니다.");
                window.location.href = '/';
            }
            else{
                alert("일치하는 ID와 PW가 없습니다.");
                window.location.href = '/login';
            }
        });
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
        console.log(this.state);
    }

    render() {
        return (
            <div className="wrapper">
                <div className={style.container}>
                    <h1 className={style.head_title}>Welcome to SOLCHIVE!</h1>
                    <form className="loginForm">
                        <div>
                            <input 
                                name="user_id"  
                                value={this.state.user_id} 
                                onChange={this.handleValueChange}
                                className={style.login_input}
                                type="text" 
                                placeholder="User ID" 
                            />
                        </div>
                        <div>
                            <input 
                                name="user_pw"  
                                value={this.state.user_pw} 
                                onChange={this.handleValueChange}
                                className={style.login_input} 
                                type="password" 
                                placeholder="User PW" 
                            />
                        </div>
                        <div>
                            <button
                                className={style.login_input}
                                type="submit" onClick={this.projectLogin}
                                id="login_btn">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
                
            </div>
        );
    }
}

export default Login;
