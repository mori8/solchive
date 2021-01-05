import React, { Component } from 'react';

class MainHeader extends Component {
    render() {
        const mainHeaderWrapperStyle = {
            height: "27rem",
            width: "100%",
            fontFamily: "Carmen Sans",
            backgroundColor: "white",
            padding: "6.6rem",
            color: "#333"
        };

        return (
            <div style={mainHeaderWrapperStyle}>
                <h1 style={{fontWeight:"900", marginBottom:"2rem"}}>솔카이브<br/>
                <span style={{backgroundColor:"#F7CAC9"}}>Solchive</span></h1>
                <p style={{lineHeight:"1.4"}}>숙명여자대학교 중앙 프로그래밍 동아리인 SOLUX에서 진행한<br/>
                모든 프로젝트를 기록하고 보관합니다.</p>
            </div>
        );
    }
}

export default MainHeader;