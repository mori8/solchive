import React, { Component } from 'react';
import style from './SectionStyle.module.css';

class Footer extends Component {
    render() {
        return (
            <div className={style.footer}>
                <span>2020(c)Copyright SOLUX All right reserved.</span>
            </div>
        );
    }
}

export default Footer;