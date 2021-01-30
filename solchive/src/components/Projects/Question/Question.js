import React, { Component } from 'react';
import style from './Question.module.css';

class Question extends Component {
    render() {
        return (
            <div className={style.wrapper}>
                <div className={style.question_wrapper}>
                    <p className={style.interviewer}>👩🏻‍🦰</p>
                    <p className={style.small_title}>{this.props.question}</p>
                </div>
                <div className={style.answer_wrapper}>
                    <p className={style.contents}>{this.props.answer}</p>
                    <p className={style.interviewee}>👱‍♀️</p>
                </div>
                
            </div>
        );
    }
}

export default Question;