import React, { Component } from 'react';
import style from './MainStyle.module.css';
import ProjectWrapperByYear from './ProjectWrapperByYear';

class ProjectList extends Component {
    state = {
        projects: [],
        sortedProjects: {},
        onUpdate: () => console.warn('onUpdate not defined'),
    }

    async componentDidMount() {
        // async await 아직도 이해 못함 ...
        await this.callAPI().then(
            res => {
                this.setState({projects: res});
            }).catch(
                error => { console.log(error);
            }
        );
        // 초기화
        const arr = [];
        this.state.projects.forEach((info) => {
            if (!arr.includes(info.period))
                arr.push(info.period);
        });

        arr.forEach((year) => {
            this.state.sortedProjects[year] = [];
            const nextState = JSON.parse(JSON.stringify(this.state.sortedProjects));
            this.setState({ sortedProjects: nextState });
        })

        this.state.projects.forEach((info) => {
            this.state.sortedProjects[info.period] = [
                ...this.state.sortedProjects[info.period],
                info,
            ];
            const nextState = JSON.parse(JSON.stringify(this.state.sortedProjects));
            this.setState({ sortedProjects: nextState });
        })
    }

    callAPI = async () => {
        const res = await fetch('http://localhost:5000/api/project');
        const body = await res.json();
        return body;
    }

    render() {
        const{ onUpdate } = this.props;

        return (
            <div className={style.project_wrapper}>
                {Object.keys(this.state.sortedProjects).map((year, key) => {
                    return (
                        <ProjectWrapperByYear
                        year={year}
                        data={this.state.sortedProjects[year]}
                        key={key}
                        />
                    );
                })}
            </div>
        );
    }    
}

export default ProjectList;