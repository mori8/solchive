import React, { Component } from 'react';
import { post } from 'axios';

class CreateProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            team: "",
            period: "",
            framework: "",
            body_text: "",
            body_images: null,
            file_name: "",
            summary: "",
            git_url: ""
        };
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.addProject = this.addProject.bind(this);
    }

    handleFileChange(e) {
        this.setState({
            body_images: e.target.files[0],
            file_name: e.target.value
        })
    }

    handleFormSubmit(e) {
        e.preventDefault();
        this.addProject().then((res) => {
            console.log(res.data);
        });
        window.location.href = '/projects';
    }

    handleValueChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
        console.log(this.state.title);
    }

    addProject = async () => {
        const url = 'http://localhost:5000/api/project';
        const formData = new URLSearchParams();
        formData.append('title', this.state.title);
        formData.append('team', this.state.team);
        formData.append('period', this.state.period);
        formData.append('framework', this.state.framework);
        formData.append('body_text', this.state.body_text);
        formData.append('body_images', this.state.body_images);
        formData.append('summary', this.state.summary);
        formData.append('git_url', this.state.git_url);

        const config = {
            'content-type': 'multipart/form-data'
        }

        return post(url, formData, config);
    }

    render() {
        const formStyle = {
            width: "82rem",
            margin: "15px auto",
            padding: "20px"
        }

        const wrapperStyle = {
            width: "90rem",
            margin: "0 auto",
        }

        const textAreaStyle = {
            display: "block",
            margin: "15px",
        }

        const btnDivStyle = {
            margin: "5px",
            marginRight: "15px",
            float: "right",
        }

        const btnStyle = {
            margin: "5px",
        }

        return (
            <div style={wrapperStyle}>
                <h3>프로젝트 생성하기</h3>
                <form style={formStyle} onSubmit={this.handleFormSubmit}> 
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>프로젝트 제목</label>
                            <input type="text" name="title" className="form-control" placeholder="제목" value={this.state.title} onChange={this.handleValueChange}/>
                        </div>
                        <div className="form-group col-md-6">
                            <label>사용 프레임워크</label>
                            <input type="text" name="framework" value={this.state.framework} className="form-control" placeholder="쉼표(,)로 구분하여 입력해 주세요." onChange={this.handleValueChange}/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>팀명</label>
                            <input type="text" name="team" className="form-control" placeholder="팀명" value={this.state.team} onChange={this.handleValueChange}/>
                        </div>
                        <div className="form-group col-md-6">
                            <label>프로젝트 Github URL</label>
                            <input type="text" name="git_url" value={this.state.git_url} className="form-control" placeholder="Github URL" onChange={this.handleValueChange}/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>진행 기간</label>
                            <input type="text" name="period" className="form-control" placeholder="제목" value={this.state.period} onChange={this.handleValueChange}/>
                        </div>
                        <div className="form-group col-md-6">
                            <label>대표 이미지</label>
                            <input type="file" name="body_images" file={this.state.body_images} value={this.state.file_name} className="form-control" onChange={this.handleFileChange}/>
                        </div>
                    </div>
                    <div className="form-group" style={textAreaStyle}>
                        <label>프로젝트에 대해 한 문장으로 간략하게 설명해 주세요.</label>
                        <textarea className="form-control" name="summary" value={this.state.summary} rows="1" onChange={this.handleValueChange}></textarea>
                    </div>
                    <div className="form-group" style={textAreaStyle}>
                        <label>프로젝트에 대해 자세하게 설명해 주세요.</label>
                        <textarea className="form-control" name="body_text" value={this.state.body_text} rows="20" onChange={this.handleValueChange}></textarea>
                    </div>
                    <div style={btnDivStyle}>
                        <button type="submit" className="btn btn-primary" style={btnStyle}>작성하기!</button>
                        <button type="button" className="btn btn-secondary">취소</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateProject;