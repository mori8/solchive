import React, { PureComponent } from 'react';
import axios, { post } from 'axios';
import styles from './CreateProject.module.css';

class CreateProject extends PureComponent {
    state = {
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
        index: 2,
        loginresult: "",
    };

    componentDidMount() {
        this.chkId().catch(
            error => { console.log(error);
        });
    }

    chkId = async () => {
        const requestOptions = {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
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

            console.log(responseData.loginresult);
            if(this.state.loginresult === false){
                alert("로그인 후 이용해 주시길 바랍니다. 감사합니다.");
                window.location.href = '/login';
            }
        }).catch(
            error => { console.log(error);
        });
    }

    handleFileChange = (e) => {
        this.setState({
            body_images: e.target.files,
            file_name: e.target.value
        });
        console.log(e.target.files[0]);
        console.log(e.target.value);
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.addProject().then((res) => {
            window.location.href = '/';
        });
    }

    handleValueChange = (e) => {
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
        if(this.state.body_images !== null){
            for(let i =0; i< this.state.body_images.length; i++){
                formData.append("body_images", this.state.body_images[i]);
            }
        }
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

        console.log(formData.body_images);
        console.log(this.state.body_images);

        const config = {
            'content-type': 'multipart/form-data'
        }
        console.log(formData);
        return post(url, formData, config);
    }


    addCommentsHandler = () => {
        let commentsWrapper = document.querySelector(".create--comments--wrapper");
        let comments = document.querySelector("." + styles.comments).cloneNode(true);
        let nameInput = comments.childNodes[0].childNodes[1];
        let impressionInput = comments.childNodes[1].childNodes[1];
        this.setState((prevState) => {
            index: ++prevState.index
        })
        nameInput.setAttribute("name", "name" + this.state.index);
        nameInput.addEventListener("change", this.handleValueChange);
        nameInput.value = "";
        impressionInput.setAttribute("name", "comment" + this.state.index);
        impressionInput.addEventListener("change", this.handleValueChange);
        impressionInput.value = "";

        commentsWrapper.appendChild(comments);
    }

    render() {
        return (
            <div className={styles.form_wrapper}>
                <h3>프로젝트 생성하기</h3>
                <form className={styles.inputform} onSubmit={this.handleFormSubmit} method="post">
                <div className="form-group col-md-6 create--title">
                    <label>프로젝트 제목</label>
                    <input type="text" name="title" className="form-control" placeholder="제목" value={this.state.title} onChange={this.handleValueChange}/>
                </div>
                <div className="form-group col-md-6 create--framework">
                    <label>사용 프레임워크</label>
                    <input type="text" name="framework" value={this.state.framework} className="form-control" placeholder="쉼표(,)로 구분하여 입력해 주세요." onChange={this.handleValueChange}/>
                </div>
                <div className="form-group col-md-6 create--team">
                    <label>팀명</label>
                    <input type="text" name="team" className="form-control" placeholder="팀명" value={this.state.team} onChange={this.handleValueChange}/>
                </div>
                <div className="form-group col-md-6 create--github">
                    <label>프로젝트 Github URL</label>
                    <input type="text" name="git_url" value={this.state.git_url} className="form-control" placeholder="Github URL" onChange={this.handleValueChange}/>
                </div>
                <div className="form-group col-md-6 create--period">
                    <label>진행 년도</label>
                    <select name="period" className="form-control" onChange={this.handleValueChange}>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                        <option value="2019">2019</option>
                    </select>
                </div>
                <div className="form-group col-md-6 create--bodyimages">
                    <label>대표 이미지</label>
                    <input type="file" name="body_images" id="body_images" file={this.state.body_images} value={this.state.file_name} className="form-control" onChange={this.handleFileChange} multiple />
                </div>
                <div className={"form-group create--summary " + styles.form_textarea}>
                    <label>프로젝트에 대해 한 문장으로 간략하게 설명해 주세요.</label>
                    <textarea className="form-control" name="summary" value={this.state.summary} rows="2" onChange={this.handleValueChange}></textarea>
                </div>
                    <div className="form-row">

                    </div>

                    <div className={"form-group create--bodytext " + styles.form_textarea}>
                        <label>프로젝트를 진행하면서 가장 힘들었던 점은 무엇이었나요?</label>
                        <textarea className="form-control" name="body_text" value={this.state.body_text} rows="2" onChange={this.handleValueChange}></textarea>
                    </div>
                    <div className={"form-group create--comments--wrapper " + styles.form_textarea}>
                        <label>이 프로젝트에 참가한 팀원들의 소감을 들려주세요. 오른쪽의 + 버튼을 눌러 팀원을 추가할 수 있습니다. (최대 5명)</label>
                        <button type="button" onClick={this.addCommentsHandler} className={"btn " + styles.comments_addbtn}>+</button>
                        <div className={styles.comments} key="1">
                            <div className="form-group create--bodytext">
                                <label>이름</label>
                                <input type="text" name="name1" className="form-control" placeholder="이름" onChange={this.handleValueChange}/>
                            </div>
                            <div className="form-group create--bodytext">
                                <label>소감</label>
                                <textarea className="form-control create--comment--impression" name="comment1"  onChange={this.handleValueChange}></textarea>
                            </div>
                        </div>
                    </div>
                    <div className={styles.btn_wrapper}>
                        <button type="submit" className={"btn btn-primary " + styles.btn_spacer}>작성하기!</button>
                        <button type="button" className="btn btn-secondary">취소</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateProject;
