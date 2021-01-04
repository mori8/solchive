import React, { Component, Fragment } from 'react';
import '../App.css'

// TODO: a -> Link로 수정
class Header extends Component {
    render() {
        const btnMarginStyle = {
            marginRight: "2rem"
        }

        return (
            <Fragment>
                <header className="header">
                    <a href="/projects" className="logo"><span>SOLCHIVE</span></a>
                    <div className="spacer"></div>
                    <a href="/create"><button type="button" className="btn" style={btnMarginStyle}>프로젝트 추가</button></a>
                </header>
            </Fragment>
        );
    }
}

export default Header;