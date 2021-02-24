import React, { Component } from 'react';
import style from './Impression.module.css';

class Impression extends Component {
    render() {
        const { name, emoji, text, bgColor } = this.props;
        return (
            <div className={style.wrapper}>
                <div className={style.answer_wrapper}>
                    <p className={style.contents} style={{backgroundColor: `${bgColor}`}}>{text}</p>
                    <div className={style.profile}>
                        <div className={style.tail_wrapper}>
                            <div className={style.before_interviewee} style={{borderColor: `transparent transparent transparent ${bgColor}`}}></div>
                            <p className={style.interviewee}>{emoji}</p>
                        </div>
                        <p className={style.name}>{name}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Impression;