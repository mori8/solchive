import React, { Component } from 'react';
import '../App.css';
import ProjectListItem from './ProjectListItem';
import DeleteProject from './DeleteProject';

class Project extends Component {
    state = {
        project: []
    }

componentDidMount() {
    this.callAPI().then(
        res => {
            this.setState({project: res[0]});
    }).catch(
        error => { console.log(error);
    });
}

callAPI = async () => {
    const { id } = this.props.match.params;
    const res = await fetch(`/api/project/${id}`);
    const body = await res.json();
    return body;
}

    render() {

        return (
            
            <div className="body--wrapper">
                <div> 
                    <DeleteProject id = {this.state.id}/>
                </div>
                <div className="description--section">
                    <div className="body--title">
                        <h1>{this.state.title}</h1>
                    </div>
                    { /* 이미지 들어갈 부분 */ }
                    <div className="body--subinfo">
                        <span>{this.state.team}</span>
                        <span>{this.state.period}</span>
                    </div>
                    <div className="body--framework">
                        <span>사용 프레임워크</span>
                        <span>{this.state.framework}</span>
                    </div>
                    <div className="body--short">
                        <p>{this.state.title} 한줄소개 👀</p>
                        <p>{this.state.body_text}</p>
                    </div>
                    <div className="body--content">
                        <p>{this.state.body_content}</p>
                    </div>
                    <div className="body--comments">

                    </div>
                </div>
                <div className="image--section">

                </div>
            </div>
        );
    }
}

export default Project;