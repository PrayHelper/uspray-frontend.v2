import React from "react";
import { MdAddCircle } from "react-icons/md";
import {GiPlantSeed} from 'react-icons/gi'; 
import styled from "styled-components";
import { style } from "@mui/system";


const Main_Content = styled.div`
    display: flex;
    width: 350px;
    height: 30px;
    margin-left : 16px;
    margin-right : 16px;
    margin-top : 22px;
`

const Name_content = styled.div`
    width: 34px;
    height: 17px;
    margin-right : 17px;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 17px;
`;

const Text_content = styled.div`
    width: 246px;
    padding : 0px;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 17px;
`;

const Dday_content = styled.div`
    width : 20px;
    font-size : 10px;
    heigth : 20px;
    margin-right : 4px;
`

function Prayer_content({content}){
    const {dday,text,checked, name} = content;
    return(
        <Main_Content>
            <Name_content>{name}</Name_content>
            <Text_content>{text}</Text_content>
            <Dday_content>{"D-"+ dday}</Dday_content>
            <div className="image"><GiPlantSeed/></div>
        </Main_Content>
    )
}

export default Prayer_content;