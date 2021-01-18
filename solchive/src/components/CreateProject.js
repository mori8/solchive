import React, { Component } from 'react';
import { post } from 'axios';
import './projects.css';

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
            git_url: "",
            name1: "",
            comment1: "",
            name2: "",
            comment2: "",
            name3: "",
            comment3: "",
            name4: "",
            comment4: "",
            name5: "",
            comment5: "",
            index: 1
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
        });
    }

    handleFormSubmit(e) {
        e.preventDefault();
        this.addProject().then((res) => {
            console.log(res.data);
        });
        window.location.href = '/';
    }

    handleValueChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        console.log(nextState);
        this.setState(nextState);
    }

    addProject = async () => {
        const url = 'http://localhost:5000/api/project';
        const formData = new FormData();
        formData.append('title', this.state.title);
        formData.append('team', this.state.team);
        formData.append('period', this.state.period);
        formData.append('framework', this.state.framework);
        formData.append('body_text', this.state.body_text);
        formData.append('body_images', this.state.body_images);
        formData.append('summary', this.state.summary);
        formData.append('git_url', this.state.git_url);
        formData.append('name1', this.state.name1);
        formData.append('comment1', this.state.comment1);
        formData.append('name2', this.state.name2);
        formData.append('comment2', this.state.comment2);
        formData.append('name3', this.state.name3);
        formData.append('comment3', this.state.comment3);
        formData.append('name4', this.state.name4);
        formData.append('comment4', this.state.comment4);
        formData.append('name5', this.state.name5);
        formData.append('comment5', this.state.comment5);

        const config = {
            'content-type': 'multipart/form-data'
        }

        return post(url, formData, config);
    }

    addCommentsHandler = () => {
        let commentsWrapper = document.querySelector(".create--comments--wrapper");
        let comments = document.querySelector(".create--comments").cloneNode(true);
        let nameInput = comments.childNodes[0].childNodes[1];
        let impressionInput = comments.childNodes[1].childNodes[1];

        nameInput.setAttribute("name", "name" + ++this.state.index);
        nameInput.addEventListener("change", this.handleValueChange);
        nameInput.value = "";
        impressionInput.setAttribute("name", "comment" + this.state.index);
        impressionInput.addEventListener("change", this.handleValueChange);
        impressionInput.value = "";

        commentsWrapper.appendChild(comments);
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
                <form style={formStyle} onSubmit={this.handleFormSubmit} method="post"> 
                    <div className="form-row">
                        <div className="form-group col-md-6 create--title">
                            <label>프로젝트 제목</label>
                            <input type="text" name="title" className="form-control" placeholder="제목" value={this.state.title} onChange={this.handleValueChange}/>
                        </div>
                        <div className="form-group col-md-6 create--framework">
                            <label>사용 프레임워크</label>
                            <input type="text" name="framework" value={this.state.framework} className="form-control" placeholder="쉼표(,)로 구분하여 입력해 주세요." onChange={this.handleValueChange}/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6 create--team">
                            <label>팀명</label>
                            <input type="text" name="team" className="form-control" placeholder="팀명" value={this.state.team} onChange={this.handleValueChange}/>
                        </div>
                        <div className="form-group col-md-6 create--github">
                            <label>프로젝트 Github URL</label>
                            <input type="text" name="git_url" value={this.state.git_url} className="form-control" placeholder="Github URL" onChange={this.handleValueChange}/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6 create--period">
                            <label>진행 기간</label>
                            <input type="text" name="period" className="form-control" placeholder="제목" value={this.state.period} onChange={this.handleValueChange}/>
                        </div>
                        <div className="form-group col-md-6 create--bodyimages">
                            <label>대표 이미지</label>
                            <input type="file" name="body_images" id="body_images" file={this.state.body_images} value={this.state.file_name} className="form-control" onChange={this.handleFileChange}/>
                        </div>
                    </div>
                    <div className="form-group create--summary" style={textAreaStyle}>
                        <label>프로젝트에 대해 한 문장으로 간략하게 설명해 주세요.</label>
                        <textarea className="form-control" name="summary" value={this.state.summary} rows="1" onChange={this.handleValueChange}></textarea>
                    </div>
                    <div className="form-group create--bodytext" style={textAreaStyle}>
                        <label>프로젝트에 대해 자세하게 설명해 주세요.</label>
                        <textarea className="form-control" name="body_text" value={this.state.body_text} rows="20" onChange={this.handleValueChange}></textarea>
                    </div>
                    <div className="form-group create--comments--wrapper" style={textAreaStyle}>
                        <label>이 프로젝트에 참가한 팀원들의 소감을 들려주세요. 오른쪽의 + 버튼을 눌러 팀원을 추가할 수 있습니다. (최대 5명)</label>
                        <button type="button" onClick={this.addCommentsHandler} className="btn create--comments--addbtn">+</button>
                        <div className="create--comments" key="1">
                            <div className="form-group create--bodytext">
                                <label>이름</label>
                                <input type="text" name="name1" className="form-control create--comment--name" placeholder="이름" onChange={this.handleValueChange}/>
                            </div>
                            <div className="form-group create--bodytext">
                                <label>소감</label>
                                <textarea className="form-control create--comment--impression" name="comment1"  onChange={this.handleValueChange}></textarea>
                            </div>
                        </div>
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
