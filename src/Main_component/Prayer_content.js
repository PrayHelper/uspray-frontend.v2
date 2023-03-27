import React, { useEffect } from "react";
import styled from "styled-components";
import Rectangle_img from "../images/Rectangle_img.svg"
import Logo from "./Logo";
import Empty_Box from '../images/empty_box.svg';
import Check_Box from '../images/check_box.svg';
import Bar from "./Bar";



const Main_Content = styled.div`
    display: flex;
    width: 350px;
    height: 30px;
    margin-left : 16px;
    margin-right : 16px;
    margin-top : 22px; 
    border-bottom : solid;
    border-bottom-color: #CECECE;
`

const Name_content = styled.div`
    width: 34px;
    height: 17px;
    margin-right : 8px;
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
    width : 34px;
    font-size : 10px;
    heigth : 17px;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 17px;
    margin-right: 4px;
`;
const Click_img = styled(Logo)``;

function Prayer_content({content, day_toggle , Count_update, bottom, Content_click, isShare, shareList}){
    const {id, dday,text,checked, name, count} = content;
    const check_BoxClick = (id) =>{
        return shareList(id, !checked);
    }
    return(
        <Main_Content>
            {isShare && <Click_img src={checked ? Check_Box : Empty_Box}style={{marginRight: '20px'}} 
            onClick={() => check_BoxClick(id)}/> }
            <Name_content style={{marginLeft : isShare ? '30px' : '0px' , color : bottom ? '#FFFFFF' : '#7BAB6F'}}>{name}</Name_content>
            <Bar></Bar>
            <Text_content style={{color: bottom ? '#D0E8CB' : '#496143'}}onClick={() => Content_click(id)}>{text}</Text_content>
            {day_toggle ? <Dday_content style={{color : bottom ? '#FFFFFF' : '#A1B398'}}>{"D-"+ dday}</Dday_content> : <Dday_content>{count + "회"}</Dday_content>}
            {!isShare && !bottom && <div className="image" style={{marginBottom:'2px'}}><Click_img src={Rectangle_img} onClick={() => Count_update(id)}/></div>}
        </Main_Content>
    )
}

export default Prayer_content;


