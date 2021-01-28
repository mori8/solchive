import React, { Component, createRef } from 'react';
import axios,{ post } from 'axios';
import style from './UpdateProject.module.css';

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
            name2: "",
            name3: "",
            name4: "",
            name5: "",
            comment: [
                {index: 1 , userName: "", impression: ""},
                {index: 2 , userName: "", impression: ""},
                {index: 3 , userName: "", impression: ""},
                {index: 4 , userName: "", impression: ""},
                {index: 5 , userName: "", impression: ""},
            ],
            index: 1,
            loginresult: false,
        }
        console.log(this.state.comment[1].userName);
        //this.state.comment.push;
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleFormModifySubmit = this.handleFormModifySubmit.bind(this);
        this.fileInput = React.createRef();
        this.handleValueChange = this.handleValueChange.bind(this);
        this.updateProject = this.updateProject.bind(this);
    }

    componentDidMount(){
        this.callAPI().then(
            res => {
                console.log(res[0]);
                this.setState(res[0]);
            }
        ).catch(
            error => {console.log(error);}
        );

        this.callCommentAPI().then(
            res => {
                
                console.log(res[0]);
                if(res[0].name2 !== ""){
                    this.addCommentsHandler();
                }
                if(res[0].name3 !== ""){
                    this.addCommentsHandler();
                }
                if(res[0].name4 !== ""){
                    this.addCommentsHandler();
                }
                if(res[0].name5 !== ""){
                    this.addCommentsHandler();
                }
                
                this.setState({
                    //comment[0].userName: res[0].name1,

                });
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

    callCommentAPI = async () => {
        const { id } = this.props.match.params;
        const res = await fetch(`/api/comment/${id}`);
        const body = await res.json();
        return body;
    }

    chkId = async () => {
        const requestOptions = {
            method: 'get',
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
                loginresult: true,
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

    handleFileChange(e) {
        this.setState({
            body_images: e.target.files[0],
        });
    }

    handleFormModifySubmit(e){
        e.preventDefault();
        this.updateProject().then((res) => {
            console.log(res);
            //this.addComment();
        });
        alert("수정 완료되었습니다.");
        //window.location.href = '/';
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
        formData.append('name1', this.state.comment[0].userName);
        formData.append('comment1', this.state.comment[0].impression);
        formData.append('name2', this.state.comment[1].userName);
        formData.append('comment2', this.state.comment[1].impression);
        formData.append('name3', this.state.comment[2].userName);
        formData.append('comment3', this.state.comment[2].impression);
        formData.append('name4', this.state.comment[3].userName);
        formData.append('comment4', this.state.comment[3].impression);
        formData.append('name5', this.state.comment[4].userName);
        formData.append('comment5', this.state.comment[4].impression);
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
    /*
    addComment = async () => {
        await axios
            .post('http://localhost:5000/api/comment', {
                

                name1: this.comment[0].userName,    
                comment1: this.state.comment[0].impression,
                name2: this.comment[1].userName,    
                comment2: this.state.comment[1].impression,
                name3: this.comment[2].userName,    
                comment3: this.state.comment[2].impression,
                name4: this.comment[3].userName,    
                comment4: this.state.comment[3].impression,
                name5: this.comment[4].userName,    
                comment5: this.state.comment[4].impression,

                name1: this.state.name.name1,
                comment1: this.state.comment1,
                name2: this.state.name.name2,
                comment2: this.state.comment2,
                name3: this.state.name.name3,
                comment3: this.state.comment3,
                name4: this.state.name.name4,
                comment4: this.state.comment4,
                name5: this.state.name.name5,
                comment5: this.state.comment5,
                
                name[0]: this.state.name1,
                comment[0]: this.state.comment1,
                name[1]: this.state.name2,
                comment[1]: this.state.comment2,
                name[2]: this.state.name3,
                comment[2]: this.state.comment3,
                name[3]: this.state.name4,
                comment[3]: this.state.comment4,
                name[4]: this.state.name5,
                comment[4]: this.state.comment5,

            }).then((res) => {
                console.log(res);
            });
    }
    */
    addCommentsHandler = () => {
        let commentsWrapper = document.querySelector(".update--comments--wrapper");
        let comments = document.querySelector("." + style.comments).cloneNode(true);
        let nameInput = comments.childNodes[0].childNodes[1];
        let impressionInput = comments.childNodes[1].childNodes[1];
        this.setState((prevState) => {
            index: ++prevState.index
        })
        nameInput.setAttribute("name", "name" + this.state.index);
        //nameInput.setAttribute("value", this.state.comment[this.state.index].userName);
        nameInput.addEventListener("change", this.handleValueChange);
        //nameInput.value = "";
        impressionInput.setAttribute("name", "comment" + this.state.index);
        //impressionInput.setAttribute("value", this.state.comment[this.state.index].impression);
        impressionInput.addEventListener("change", this.handleValueChange);
        //impressionInput.value = "";
        console.log(comments);
        commentsWrapper.appendChild(comments);
    }

    subtractCommentHandler = () => {
        let comments = document.querySelector("." + style.comments);
        let nameInput = comments.childNodes[0].childNodes[1];
        let impressionInput = comments.childNodes[1].childNodes[1];
        this.setState((prevState) => {
            index: --prevState.index
        })

        nameInput.value = "";
        impressionInput.value = "";
        
        comments.remove();


    }


    render() {
        const nameRef=createRef();

        return (
            
            <div className={style.form_wrapper}>
                <h3>프로젝트 내용 수정하기</h3>
                <form className={style.inputform} onSubmit={this.handleFormModifySubmit} method="post"> 
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
                        <div className="form-group col-md-6 create--period">
                            <label>진행 년도</label>
                            <select name="period" className="form-control" onChange={this.handleValueChange}> 
                                <option value="2021">2021</option>
                                <option value="2020">2020</option>
                                <option value="2019">2019</option>
                            </select>
                        </div>
                        <div className="form-group col-md-6">
                        <label>대표 이미지</label>
                            <input type="file" name="body_images" id="body_images" file={this.state.body_images} className="form-control" onChange={this.handleFileChange} ref={this.fileInput}/>
                        </div>
                    </div>
                    <div className={"form-group " + style.form_textarea}>
                        <label>프로젝트에 대해 한 문장으로 간략하게 설명해 주세요.</label>
                        <textarea className="form-control" name="summary" value={this.state.summary} rows="1" onChange={this.handleValueChange}></textarea>
                    </div>
                    <div className={"form-group " + style.form_textarea}>
                        <label>프로젝트에 대해 자세하게 설명해 주세요.</label>
                        <textarea className="form-control" name="body_text" value={this.state.body_text} rows="20" onChange={this.handleValueChange}></textarea>
                    </div>
                    <div className={"form-group update--comments--wrapper " + style.form_textarea}>
                        <label>이 프로젝트에 참가한 팀원들의 소감을 들려주세요. 오른쪽의 + 버튼을 눌러 팀원을 추가할 수 있습니다. (최대 5명)</label>
                        <button type="button" onClick={this.addCommentsHandler} className={"btn " + style.comments_addbtn}>+</button>
                        <div className={style.comments} key="1">
                            <div className="form-group update--bodytext">
                                <label>이름</label>
                                <input type="text" name="name1" className="form-control" value={this.state.name1} placeholder="이름" onChange={this.handleValueChange}/>
                                <button onClick={this.subtractCommentHandler}>삭제</button>
                            </div>
                            <div className="form-group update--bodytext">
                                <label>소감</label>
                                <textarea className="form-control update--comment--impression" name="comment1" value={this.state.comment1}  onChange={this.handleValueChange}></textarea>
                            </div>
                        </div>
                    </div>
                    <div className={style.btn_wrapper}>
                        <button type="submit" className={"btn btn-primary" + style.btn_spacer}>수정 완료</button>
                        <button type="button" className="btn btn-secondary">취소</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default UpdateProject;
