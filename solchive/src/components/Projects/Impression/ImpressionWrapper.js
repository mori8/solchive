import React, { Component } from 'react';
import Impression from './Impression';
import style from './Impression.module.css';

class ImpressionWrapper extends Component {
    state = {
        impressions: [],
        impressionComponents: [],
    }

    BACKGROUND_COLORS = ['#aac9c2', '#b6b4c2', '#c9bbc8', '#e5c1cd', '#f3dbcf'];
    EMOJIS = ['🧛🏻‍♀️', '🧝‍♀️', '🤵🏼‍♀️', '👩🏻‍🔬', '👩‍🎤'];
    impressionList = [];

    async componentDidMount() {
        await this.callAPI().then((res) => {
            this.setState({impressions: res[0]});
            console.log(this.state.impressions);
        }).catch((error) => {
            console.log(error);
        });
        for (let i = 1; i <= 5; i++) {
            let com = "comment" + i;
            let name = "name" + i;
            if (this.state.impressions && this.state.impressions[com] !== "" && this.state.impressions[name] !== "") {
                this.setState((prevState) => ({
                    impressionComponents: [ ...prevState.impressionComponents, <Impression
                        name={this.state.impressions[name]}
                        text={this.state.impressions[com]}
                        emoji={this.EMOJIS[i-1]}
                        bgColor={this.BACKGROUND_COLORS[i-1]}
                    />]
                }))
            }
        }
    }

    callAPI = async () => {
        const id = this.props.projectId;
        const res = await fetch('http://localhost:5000/api/comment/' + id);
        const body = await res.json();
        return body;
    }

    render() {
        return (
            <>
                <div className={style.question_wrapper}>
                    <p className={style.interviewer}>👩🏻‍🦰</p>
                    <p className={style.small_title}>💬 프로젝트 참여 후기를 들려주세요!</p>
                </div> 
                <div className={style.wrapper}>
                    {this.state.impressionComponents}
                </div>
            </>
        
        );
    }
}

export default ImpressionWrapper;