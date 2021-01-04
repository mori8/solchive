import React, { Component } from 'react';

class Login extends Component {
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
                            <input style = {loginAreastyle} type="text" placeholder="User ID" />
                        </div>
                        <div>
                            <input style = {loginAreastyle} type="password" placeholder="User PW" />
                        </div>
                        <div>
                            <button style = {loginAreastyle} type="submit" id = "login_btn">Login</button>
                        </div>
                    </form>
                </div>
                
            </div>
        );
    }
}

export default Login;