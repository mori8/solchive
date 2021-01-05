import React, { Component } from 'react';

class Footer extends Component {
    render() {
        const style = {
            width: "100%",
            textAlign: "center",
            padding: "70px",
            marginTop: "7rem"
        }

        return (
            <div style={style}>
                <span>2020(c)Copyright SOLUX All right reserved.</span>
            </div>
        );
    }
}

export default Footer;