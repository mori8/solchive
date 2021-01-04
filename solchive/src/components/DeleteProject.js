import React, { Component } from 'react';

class DeleteProject extends Component {

    deleteProject(id){
        console.log(id);
        const url = 'http://localhost:5000/api/project/'+ id;
        fetch(url, {
            method:'DELETE'
        });
        alert("글이 삭제되었습니다.");
        window.location.href = "/projects"
    }

    render() {

        const btnDelStyle = {
            margin: "5px",
            marginRight: "15px",
            float: "right",
        }
        return (
            <button style = {btnDelStyle} onClick={(e) => this.deleteProject(this.props.id)}>삭제</button>
            
        );
    }
}

export default DeleteProject;