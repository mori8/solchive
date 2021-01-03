import React, { Component } from 'react';

class UpdateProject extends Component {

    constructor(props){
        super(props);
        this.state ={
            title: "",
            framework: "",
            team: "",
            git_url: "",
            period: "",
            body_images: "",
            summary: "",
            body_text: "",
            id: "",
        }
        this.handleFormModifySubmit = this.handleFormModifySubmit.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.updateProject = this.updateProject.bind(this);

    }

    //처음에 this.props.state.title을 했다가 https://gongbu-ing.tistory.com/45을 참고하여 location 추가함.
    componentDidMount(){
        this.setState({
            title: this.props.location.state.title,
            framework: this.props.location.state.framework,
            team: this.props.location.state.team,
            git_url: this.props.location.state.git_url,
            period: this.props.location.state.period,
            body_images: this.props.location.state.body_images,
            summary: this.props.location.state.summary,
            body_text: this.props.location.state.body_text,
            id: this.props.location.state.id,
        })
    }

    handleFormModifySubmit(e){
        e.preventDefault();
        this.updateProject();
        alert("수정 완료되었습니다.");
        //window.location.href = '/projects/${id}';
    }

    handleValueChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    updateProject = async () => {

        const url = 'http://localhost:5000/api/update';

        let formData = {
            title: this.state.title,
            framework: this.state.framework,
            team: this.state.team,
            git_url: this.state.git_url,
            period: this.state.period,
            body_images: this.state.body_images,
            summary: this.state.summary,
            body_text: this.state.body_text,
            id: this.props.match.params.id,
        };

        let res = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        }).then((res) => {
            if (res.ok) return res.json();
            throw new Error('error');
        }).then((data) => {
            return data;
        }).catch((error) => {
            return console.log(error.message);
        });
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
                            <input type="text" name="body_images" value={this.state.body_images} className="form-control" onChange={this.handleValueChange}/>
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
                        <button type="submit" className="btn btn-primary" style={btnStyle}>수정 완료</button>
                        <button type="button" className="btn btn-secondary">취소</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default UpdateProject;