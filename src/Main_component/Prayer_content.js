import React from "react";
import { MdAddCircle } from "react-icons/md";
import './Prayer_content.css';
import {GiPlantSeed} from 'react-icons/gi'; 
function Prayer_content({content}){
    const {dday,text,checked} = content;
    return(
        <div className="content">
            <div className="text">{text}</div>
            <div className="dday">{"D-"+ dday}</div>
            <div className="image"><GiPlantSeed/></div>
        </div>
    )
}

export default Prayer_content;