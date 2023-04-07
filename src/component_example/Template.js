import React from "react";
import './Template.css';
const Template = ({children , todoLength}) =>{
    return(
        <h1 className="Template">
            <div className="title"> 오늘의 할일 ({todoLength})</div>
            <div> {children}</div>
        </h1>
    )
}


export default Template;