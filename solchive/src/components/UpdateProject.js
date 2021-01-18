import React, { Component, createRef } from 'react';

import { post } from 'axios';

class UpdateProject extends Component {
    constructor(props){
        super(props);
        this.state ={
            id: "",
            title: "",
            framework: "",
            team: "",
            git_url: "",
            period: "",
            body_images: [],
            summary: "",
            body_text: "",
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
            index: 1,
            loginresult: false,
        }
        console.log(this.state);
        
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleFormModifySubmit = this.handleFormModifySubmit.bind(this);
        this.fileInput = React.createRef();
        this.handleValueChange = this.handleValueChange.bind(this);
        this.updateProject = this.updateProject.bind(this);
    }

    componentDidMount(){

        this.callAPI().then(
            res => {
                this.setState(res[0]);
                console.log(res[0]);
            }
        ).catch(
            error => {console.log(error);}
        );

        this.chkId().catch(
            error => { console.log(error);
        });

    }

    callAPI = async () => {
        const { id } = this.props.match.params;
        const res = await fetch(`/api/project/${id}`);
        const body = await res.json();
        return body;
    }

    chkId = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch("http://localhost:5000/chkserver", requestOptions)
        .then(res => {
            console.log(res);
            return res.json();
        })
        .then(responseData => {
            console.log(responseData);
            this.setState({
                loginresult: responseData.loginresult,
            });
            if(this.state.loginresult === false){
                alert("로그인 후 이용해 주시길 바랍니다. 감사합니다.");
                window.location.href = '/login';
            }
        }).catch(
            error => { console.log(error);
        });
        console.log(this.state.loginresult);
    }

    /*
    componentDidMount(){

        this.setState({
            id: this.props.location.state.id,
            title: this.props.location.state.title,
            framework: this.props.location.state.framework,
            team: this.props.location.state.team,
            git_url: this.props.location.state.git_url,
            period: this.props.location.state.period,
            body_images: this.props.location.state.body_images,
            summary: this.props.location.state.summary,
            body_text: this.props.location.state.body_text,
            name1: this.props.location.name1,
            comment1: this.props.location.state.comment1,
            name2: this.props.location.name2,
            comment2: this.props.location.state.comment2,
            name3: this.props.location.name3,
            comment3: this.props.location.state.comment3,
            name4: this.props.location.name4,
            comment4: this.props.location.state.comment4,
            name5: this.props.location.name5,
            comment5: this.props.location.state.comment5,
            loginresult: this.props.location.state.loginresult,
        })
    }
    */

    handleFileChange(e) {
        this.setState({
            body_images: e.target.files[0],
        });
    }

    handleFormModifySubmit(e){
        e.preventDefault();
        this.updateProject();
        alert("수정 완료되었습니다.");
        window.location.href = '/';
    }

    handleValueChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
        console.log(this.state);
    }

    
    updateProject = async () => {

        const url = 'http://localhost:5000/api/update';

        const formData = new FormData();
        formData.append('id', this.state.id);
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
        console.log(this.state.body_images);
        
        const config = {
            'content-type': 'multipart/form-data'
        }

        return post(url, formData, config).then(res => {
            alert('성공')
          }).catch(err => {
            console.log(err.message);
        });
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
        const nameRef=createRef();

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

        function checkLogin(){
            if(this.state.loginresult === false){
                window.location.href = '/';
            }
        }

        return (
            
            <div style={wrapperStyle}>
                <h3>프로젝트 내용 수정하기</h3>
                <form style={formStyle} onSubmit={this.handleFormModifySubmit} method="post"> 
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
                            <input type="file" name="body_images" id="body_images" file={this.state.body_images} className="form-control" onChange={this.handleFileChange} ref={this.fileInput}/>
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
                        <button type="submit" className="btn btn-primary" style={btnStyle}>수정 완료</button>
                        <button type="button" className="btn btn-secondary">취소</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default UpdateProject;