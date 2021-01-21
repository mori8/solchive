import React, { Component } from 'react';
import style from './DeleteProject.module.css';

class DeleteProject extends Component {
    deleteProject(id){
        console.log(id);
        const url = 'http://localhost:5000/api/project/'+ id;
        fetch(url, {
            method:'DELETE'
        });
        alert("글이 삭제되었습니다.");
        window.location.href = "/"
    }

    render() {
        return (
            <button className={"btn " + style.delete_btn} onClick={(e) => this.deleteProject(this.props.id)}>삭제</button>        
        );
    }
}

export default DeleteProject;