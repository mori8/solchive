import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import style from './SectionStyle.module.css';

// TODO: a -> Link로 수정
class Header extends Component {
    render() {
        return (
            <Fragment>
                <header className={style.header} style={{padding: "0 2rem"}}>
                    <Link to="/" className={style.logo}><span>Solchive.</span></Link>
                    <div className={style.spacer}></div>
                    <Link to="/create"><button type="button" className={"btn " + style.createBtn}>프로젝트 추가</button></Link>
                </header>
            </Fragment>
        );
    }
}

export default Header;