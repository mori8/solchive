import React, { Component } from 'react';
import MainHeader from './MainHeader';
import ProjectList from './ProjectList';
import "../../fonts/fonts.css";

class Main extends Component {
    render() {
        return (
            <div>
                <MainHeader/>
                <ProjectList/>
            </div>
        );
    }
}

export default Main;