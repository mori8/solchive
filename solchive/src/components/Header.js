import React, { Component, Fragment } from 'react';
import '../App.css'

// TODO: a -> Link로 수정
class Header extends Component {
    render() {
        return (
            <Fragment>
                <header className="header" style={{padding: "0 2rem"}}>
                    <a href="/" className="logo"><span>Solchive.</span></a>
                    <div className="spacer"></div>
                    <a href="/create"><button type="button" className="btn">프로젝트 추가</button></a>
                </header>
            </Fragment>
        );
    }
}

export default Header;