import React, { Component } from 'react';
import '../App.css';
import ProjectListItem from './ProjectListItem';
import DeleteProject from './DeleteProject';

class Project extends Component {
    state = {
        id: 1,
        title: "솔룩스 프로젝트 아카이빙 플랫폼, Solchive",
        team: "솔잼",
        period: "2020-12-29 ~ 2020-1-12",
        framework: "React, Node.js(Express)",
        body_text: "솔룩스에서 진행한 역대 프로젝트를 모두 확인할 수 있는 웹 플랫폼입니다.",
        body_content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi \
        ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit \
        in voluptate velit esse cillum dolore eu fugiat nulla pariatur. \
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia \
        deserunt mollit anim id est laborum.",
        body_images: ""
    }

    

    // componentDidMount() {
    //     this.callAPI().then(
    //         res => {
    //             this.setState({project: res[0]});
    //     }).catch(
    //         error => { console.log(error);
    //     });
    // }

    // callAPI = async () => {
    //     const { id } = this.props.match.params;
    //     const res = await fetch(`/api/articles/${id}`);
    //     const body = await res.json();
    //     return body;
    // }

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