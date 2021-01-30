import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import style from './SectionStyle.module.css';

// TODO: a -> Link로 수정
class Header extends Component {

    state = {
        loginresult: false,
    }

    componentDidMount() {
        this.chkId().catch(
            error => { console.log(error);
        });
    }

    chkId = async () => {
        const requestOptions = {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        };
        fetch("http://localhost:5000/chkserver", requestOptions)
        .then(res => {
            console.log(res);
            return res.json();
        })
        .then(responseData => {
            console.log(responseData);
            this.setState({
                loginresult: responseData.loginresult,
            });
            
            console.log(responseData.loginresult);
        }).catch(
            error => { console.log(error);
        });
    }

    render() {
        return (
            <Fragment>
                <header className={style.header} style={{padding: "0 2rem"}}>
                    <Link to="/" className={style.logo}><span>Solchive.</span></Link>
                    <div className={style.spacer}></div>
                    { 
                    this.state.loginresult === "solux1004" ?
                    
                    <Link to="/create"><button type="button" className={"btn " + style.createBtn}>프로젝트 추가</button></Link>
                    :
                    <></>
                    }
                </header>
            </Fragment>
        );
    }
}

export default Header;