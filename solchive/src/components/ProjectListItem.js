import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class ProjectListItem extends Component {
    render() {
        const { id, title, team, period, body_text, body_images } = this.props.info;
        return (
            <div className="project--item">
                <Link to="#">
                    <div className="project--image--wrapper">
                        <div className="project--image">
                            <div className="centered">
                                <img src="background.jpg"/>
                            </div>
                        </div>
                    </div>
                    <div className="project-textarea">
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