import React from "react";
import ss from "./index.scss"

export default class Welcome extends React.Component {
    render() {
        return (
            <div>
                <h1 className={ss.welcomeText}>
                    Welcome, 这里是欢迎界面, 欢迎访问我的
                </h1>
            </div>
        )
    }
}