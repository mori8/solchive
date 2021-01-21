import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import style from './Projects.module.css';
import DeleteProject from './DeleteProject/DeleteProject';

class Project extends Component {
    state = {
        projects: [],
        loginresult: false,
    }

    componentDidMount() {
        this.callAPI().then(
            res => {
                this.setState({projects: res[0]});
        }).catch(
            error => { console.log(error);
        });

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
        }).catch(
            error => { console.log(error);
        });

    }

    render() {
        return (
            <div className={style.wrapper}>
                <div className="description--section">
                    <div className={style.title}>
                        <h1>{this.state.projects.title}</h1>
                    </div>
                    <div className={style.subinfo}>
                        <span className={style.team}>{this.state.projects.team}</span>
                        <div className={style.spacer}></div>
                        <span className={style.period}>{this.state.projects.period}</span>
                    </div>
                    <div>
                        <img className={style.image} src={'/upload/' + this.state.projects.body_images}/>
                    </div>
                    <div className="body--framework">
                        <p className={style.small_title}>👷🏻 사용 프레임워크</p>
                        <p className={style.contents}>{this.state.projects.framework}</p>
                    </div>
                    <div className="body--short">
                        <p className={style.small_title}>👀 프로젝트 한줄소개</p>
                        <p className={style.contents}>{this.state.projects.summary}</p>
                    </div>
                    <div className="body--content">
                        <p className={style.small_title}>👩🏻 💻 개발 스토리</p>
                        <p className={style.contents}>{this.state.projects.body_text}</p>
                    </div>
                    <div className="body--comments">

                    </div>
                </div>
                <div className="image--section">
                </div>
                <div>{ 
                    this.state.loginresult === true ?
                    <div>
                        <Link to={{
                            pathname: `/update/${this.state.projects.id}`,
                        }}>
                        <button className={"btn " + style.modify_btn}>수정</button>
                    </Link>
                    <DeleteProject id = {this.props.match.params.id}>삭제</DeleteProject>
                    </div>
                : 
                <></>
                }
                </div>
            </div>
        );
    }
}

export default Project;