import React, { Component } from 'react';
import ProjectListItem from './ProjectListItem';
class ProjectList extends Component {
    state = {
        projects: [
            {
                id: 1,
                title: "솔룩스 프로젝트 아카이빙 플랫폼, Solchive",
                team: "솔잼",
                period: "2020-12-29 ~ 2020-1-12",
                body_text: "솔룩스에서 진행한 역대 프로젝트를 모두 확인할 수 있는 웹 플랫폼입니다.",
                body_images: ""
            },
            {
                id: 2,
                title: "알아보자 Araboja",
                team: "이빈언니네 팀",
                period: "2020-12-29 ~ 2020-2-9",
                body_text: "이빈언니가 소속된 팀입니다 아마도.",
                body_images: ""
            },
        ]
    }

    componentDidMount() {
        this.callAPI().then(
            res => {
                this.setState({projects: res});
            }).catch(
                error => { console.log(error);
            });
    }

    callAPI = async () => {
        const res = await fetch('api/projects');
        const body = res.json();
        return body;
    }

    render() {
        const projectList = this.state.projects.map(
            info => (<ProjectListItem info={info} key={info.id}/>)
        );

        return (
            <div>
                {projectList}        
            </div>
        );
    }
    
}

export default ProjectList;