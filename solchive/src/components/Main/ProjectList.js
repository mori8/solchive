import React, { Component } from 'react';
import ProjectListItem from './ProjectListItem';
import style from './MainStyle.module.css';

class ProjectList extends Component {
    state = {
        projects: [],
        onUpdate: () => console.warn('onUpdate not defined'),
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
        const res = await fetch('/api/project');
        const body = await res.json();
        return body;
    }

    render() {
        const{ onUpdate } = this.props;

        const projectList = this.state.projects.map(
            info => (
                <ProjectListItem 
                    info={info} 
                    key={info.id}
                    onUpdate={onUpdate}
                />)
        );

        return (
            <div className={style.project_wrapper}>
                {projectList}
            </div>
        );
    }    
}

export default ProjectList;