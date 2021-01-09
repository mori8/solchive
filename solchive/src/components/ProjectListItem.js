import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class ProjectListItem extends Component {
    render() {
        const { id, title, team, period, summary, body_images } = this.props.info;
        return (
            <div className="project--item">
                <Link to={`/projects/${id}`}>
                    <div className="project--contents">
                        <div className="project--textarea">
                            <div className="project--title--wrapper">
                                <h4 className="project--title">{title}</h4>
                            </div>
                        </div>
                        <div className="project--image--wrapper">
                            <img src={'/upload/'+ body_images}/>
                        </div>
                    </div>
                    { /* TODO: 마우스 오버 시 이벤트. 위에껄 div로 묶고 hover -> display: none */ }
                    <div className="project--item--hover">
                        <h4 className="project--title">{title}</h4>
                        <div className="project--details">
                            <span className="project--team">{team}</span>
                        </div>
                        <p className="project--description">{summary}</p>
                    </div>
                </Link>
            </div>
        );
    }
}

export default ProjectListItem;