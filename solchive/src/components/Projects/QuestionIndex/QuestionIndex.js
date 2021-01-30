import React, { Component } from 'react';
import style from './QuestionIndex.module.css';

class QuestionIndex extends Component {
    render() {
        onscroll = () => {
            var nVscroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (nVscroll > 190) {
                document.querySelector('.' + style.questionindex_wrapper).style.position = 'fixed';
            } else {
                document.querySelector('.' + style.questionindex_wrapper).style.position = 'relative';
            }
        }
        return (
            <div className={style.questionindex_wrapper}>
                <a className={style.question}>👷🏻 어떤 프레임워크를 사용했나요?</a>
                <a className={style.question}>👀 프로젝트에 대해 간단하게 설명해 주세요!</a>
                <a className={style.question}>😇 개발하면서 가장 힘들었던 점은 무엇이었나요?</a>
                <a className={style.question}>💬 프로젝트 참여 후기를 들려주세요!</a>
            </div>
        );
    }
}

export default QuestionIndex;