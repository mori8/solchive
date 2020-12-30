import React, { Component, Fragment } from 'react';
import '../App.css'

// TODO: a -> Link로 수정
class Header extends Component {
    render() {
        return (
            <Fragment>
                <header className="header">
                    <a href="/board" className="logo"><span>SOLCHIVE</span></a>
                    <div className="spacer"></div>
                </header>
            </Fragment>
        );
    }
}

export default Header;