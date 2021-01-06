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
                <div className="description--section">
                    <div className="body--title">
                        <h1>{this.state.projects.title}</h1>
                    </div>
                    <div className="body--subinfo">
                        <span className="body--team">{this.state.projects.team}</span>
                        <div className="spacer"></div>
                        <span className="body--period">{this.state.projects.period}</span>
                    </div>
                    <div className="body--image">
                        <img src={this.state.projects.body_images}/>
                    </div>
                    <div className="body--framework">
                        <p className="body--small--title">👷🏻 사용 프레임워크</p>
                        <p className="body--contents">{this.state.projects.framework}</p>
                    </div>
                    <div className="body--short">
                        <p className="body--small--title">👀 프로젝트 한줄소개</p>
                        <p className="body--contents">{this.state.projects.summary}</p>
                    </div>
                    <div className="body--content">
                        <p className="body--small--title">👩🏻‍💻 개발 스토리</p>
                        <p className="body--contents">{this.state.projects.body_text}</p>
                    </div>
                    <div className="body--comments">

                    </div>
                </div>
                <div className="image--section">
                </div>
                <div> 
                    <Link to={{
                        pathname: `/update/${this.state.projects.id}`,
                        state: {
                            id: this.state.projects.id,
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
            </div>
        );
    }
}

export default Project;