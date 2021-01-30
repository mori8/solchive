import React, { Component } from 'react';
import style from './Impression.module.css';

class Impression extends Component {
    state = {
        impressions: []
    }

    BACKGROUND_COLORS = ['#4f6a8f', '#88a2bc', '#f0dbb0', '#efb680', '#d99477'];
    IMOJIES = ['🧛🏻‍♀️', '🧝‍♀️', '🤵🏼‍♀️', '👩🏻‍🔬', '👩‍🎤'];

    componentDidMount() {
        this.callAPI().then((res) => {
            this.setState({impressions: res[0]});
            console.log(this.state.projects);
        }).catch((error) => {
            console.log(error);
        });
    }

    callAPI = async () => {
        const { id } = this.props.match.params;
        const res = await fetch('/api/comment/' + id);
        const body = await res.json();
        return body;
    }

    render() {
        console.log(this.state.impressions);
        return (
        <div>

        </div>
        );
    }
}

export default Impression;