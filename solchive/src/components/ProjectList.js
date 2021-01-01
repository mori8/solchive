import React, { Component } from 'react';
import ProjectListItem from './ProjectListItem';
class ProjectList extends Component {
    state = {
        projects: []
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
        const res = await fetch('/api/projects');
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