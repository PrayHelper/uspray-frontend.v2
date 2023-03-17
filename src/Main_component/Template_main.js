import React from "react";
import './Template_main.css';
import { MdAddCircle } from "react-icons/md";

const Template_main = ({children}) =>{
    return(
        <div>
            <h1 className="Template">
                <input placeholder="입력" type="text"></input>
                <button className="btn_send"><MdAddCircle/></button>
            </h1>
            <div> {children}</div>
        </div>
    )
}

export default Template_main;
