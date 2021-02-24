import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import style from './Projects.module.css';
import DeleteProject from './DeleteProject/DeleteProject';
import Question from './Question/Question';
import QuestionIndex from './QuestionIndex/QuestionIndex';
import ImpressionWrapper from './Impression/ImpressionWrapper';

class Project extends Component {
    state = {
        projects: [],
        files: [],
        loginresult: false,
    }

    componentDidMount() {
        this.callAPI().then((res) => {
            this.setState({projects: res[0]});
            console.log(this.state.projects);
            var str = this.state.projects.body_images;
            var file = str.split(',');
            this.setState({files:file});
            console.log(this.state.files[0]);
        }).catch((error) => {
            console.log(error);
        });

        this.chkId().catch(
            error => { console.log(error);
        });
    }

    callAPI = async () => {
        const { id } = this.props.match.params;
        const res = await fetch('http://localhost:5000/api/project/' + id);
        const body = await res.json();
        return body;
    }

    chkId = async () => {
        const requestOptions = {
            method: 'get',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch("http://localhost:5000/chkserver", requestOptions)
        .then(res => {
            // console.log(res);
            return res.json();
        })
        .then(responseData => {
            console.log(responseData);
            this.setState({
                loginresult: responseData.loginresult,
            });
        }).catch(error => { console.log(error);
        });

    }

    addImage(){
        return <div className="image-form">
        { 
          this.state.files.map(imageURL => 
          (<img className={style.image} src={'/upload/' + imageURL}/>)) 
        }
        </div>
    }

/*
    addImageHandler = () => {
        
        let imgTag = null;

        if(this.state.files !== null){        
            console.log(this.state.files);
            
            for(let i =0; i < this.state.files.length; i++){
                imgTag = (
                    <img className={style.image} src={'/upload/' + this.state.files[i]}/>
                )
                
                console.log(this.state.files[i]);
                
            }
            return imgTag;
        }
    }

*/

    render() {
        return (
            <div className={style.main_wrapper}>
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
                        <div className={style.img}>
                            {
                                this.addImage()
                            }
                        </div>
                        <Question question={"👷🏻 어떤 프레임워크를 사용했나요?"} answer={this.state.projects.framework}/>
                        <Question question={"👀 프로젝트에 대해 간단하게 설명해 주세요!"} answer={this.state.projects.summary}/>
                        <Question question={"😇 개발하면서 가장 힘들었던 점은 무엇이었나요?"} answer={this.state.projects.body_text}/>
                        <ImpressionWrapper projectId={this.props.match.params.id}/>
                    </div>
                </div>
                <div> {
                    this.state.loginresult === "solux1004" ?
                    <div>
                        <Link to={{
                            pathname: `/update/${this.state.projects.id}`,
                        }}>
                        <button className={"btn " + style.modify_btn}>수정</button>
                        </Link>
                        <DeleteProject id={this.props.match.params.id}>삭제</DeleteProject>
                    </div>
                    : <></>
                } </div>
            </div>
        );
    }
}

export default Project;
