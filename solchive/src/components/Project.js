import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../App.css';
import ProjectListItem from './ProjectListItem';
import DeleteProject from './DeleteProject';
import UpdateProject from './UpdateProject';

class Project extends Component {
    state = {
        projects: [],
    }

    componentDidMount() {
        this.callAPI().then(
            res => {
                this.setState({projects: res[0]});
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
        const btnModifyStyle = {
            margin: "5px",
            marginRight: "15px",
            float: "right",
        }

        return (
            <div className="body--wrapper">
                <div> 
                    <Link to={{
                        pathname: `/update/${this.props.match.params.id}`,
                        state: {
                            title: this.state.projects.title,
                            framework: this.state.projects.framework,
                            team: this.state.projects.team,
                            git_url: this.state.projects.git_url,
                            period: this.state.projects.period,
                            body_images: this.state.projects.body_images,
                            summary: this.state.projects.summary,
                            body_text: this.state.projects.body_text,
                        }
                    }}>
                        <button className="btn" style={btnModifyStyle}>수정</button>
                    </Link>
                    <DeleteProject id = {this.props.match.params.id}>삭제</DeleteProject>
                </div>
                <div className="description--section">
                    <div className="body--title">
                        <h1>{this.state.projects.title}</h1>
                    </div>
                    { /* 이미지 들어갈 부분 */ }
                    <div className="body--subinfo">
                        <span>{this.state.projects.team}</span>
                        <span>{this.state.projects.period}</span>
                    </div>
                    <div className="body--framework">
                        <span>사용 프레임워크</span>
                        <span>{this.state.projects.framework}</span>
                    </div>
                    <div className="body--short">
                        <p>{this.state.projects.title} 한줄소개 👀</p>
                        <p>{this.state.projects.body_text}</p>
                    </div>
                    <div className="body--content">
                        <p>{this.state.projects.body_content}</p>
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