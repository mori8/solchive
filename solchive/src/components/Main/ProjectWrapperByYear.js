import React, { Component } from 'react';
import ProjectListItem from './ProjectListItem';
import style from './MainStyle.module.css';

class ProjectWrapperByYear extends Component {
    render() {
        const projectList = this.props.data.map( info => {
            return (
                <ProjectListItem 
                    info={info} 
                    key={info.id}
                />
            )}
        );

        return (
            <div className={style.contents_wrapper}>
                <h1 className={style.year}>{this.props.year}</h1>
                <div className={style.project_wrapper_year}>
                    {projectList}
                </div>
                
            </div>
        );
    }
}

export default ProjectWrapperByYear;