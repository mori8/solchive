import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class ProjectListItem extends Component {
    render() {
        const { id, title, team, period, body_text, body_images } = this.props.info;
        return (
            <div className="project--item">
                <Link to={`/projects/${id}`}>
                    <div className="project--textarea">
                        <div className="project--title--wrapper">
                            <h4 className="project--title">{title}</h4>
                        </div>
                    </div>
                    <div className="project--image--wrapper">
                        <div className="project--image">
                            <div className="centered">
                                <img src="background.jpg"/>
                            </div>
                        </div>
                    </div>
                    { /* TODO: 마우스 오버 시 이벤트. 위에껄 div로 묶고 hover -> display: none */ }
                    <div className="project--details--hover">
                        <h4 className="project--title">{title}</h4>
                        <div className="project--details">
                            <span className="project--team">{team}</span>
                            <span className="project--period">{period}</span>
                        </div>
                        <p className="project--description">{body_text}</p>
                    </div>
                </Link>
            </div>
        );
    }
}

export default ProjectListItem;