import React, { Component } from 'react';
import ProjectListItem from './ProjectListItem';
import UpdateProject from './UpdateProject';

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
        const{onUpdate} = this.props;

        const projectList = this.state.projects.map(
            info => (
                <ProjectListItem 
                    info={info} 
                    key={info.id}
                    onUpdate={onUpdate}
                />)
        );

        const projectWrapperStyle = {
            margin: "2.4rem auto 0",
            display: "flex",
            flexWrap: "wrap",
            width: "90vw",
            justifyContent: "space-around",
        };

        return (
            <div style={projectWrapperStyle}>
                {projectList}
            </div>
        );
    }
    
}

export default ProjectList;