import React, { Component } from 'react';
import style from './MainStyle.module.css';

class MainHeader extends Component {
    render() {
        return (
            <div className={style.header_wrapper}>
                <h1 className={style.header_title}>솔카이브<br/>
                <span className={style.highlight}>Solchive</span></h1>
                <p className={style.desc}>숙명여자대학교 중앙 프로그래밍 동아리인 SOLUX에서 진행한<br/>
                모든 프로젝트를 기록하고 보관합니다.</p>
            </div>
        );
    }
}

export default MainHeader;