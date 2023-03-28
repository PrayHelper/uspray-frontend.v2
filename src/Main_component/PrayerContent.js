import React from "react";
import styled from "styled-components";
import Rectangle_img from "../images/Rectangle_img.svg"
import Logo from "./Logo";
import Empty_Box from '../images/empty_box.svg';
import Check_Box from '../images/check_box.svg';
import Bar from "./Bar";



const MainContent = styled.div`
    display: flex;
    width: 350px;
    height: 30px;
    margin-left : 16px;
    margin-right : 16px;
    margin-top : 22px; 
    border-bottom : solid;
    border-bottom-color: #CECECE;
`

const NameContent = styled.div`
    width: 34px;
    height: 17px;
    margin-right : 8px;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 17px;
`;

const TextContent = styled.div`
    width: 246px;
    padding : 0px;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 17px;
`;

const DdayContent = styled.div`
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
const ClickImg = styled(Logo)``;

function PrayerContent({content, day_toggle , CountUpdate, bottom, ContentClick, isShare, ShareList}){
    const {id, dday,text,checked, name, count} = content;
    const checkBoxClick = (id) =>{
        return ShareList(id, !checked);
    }
    return(
        <MainContent>
            {isShare && <ClickImg src={checked ? Check_Box : Empty_Box}style={{marginRight: '20px'}} 
            onClick={() => checkBoxClick(id)}/> }
            <NameContent style={{marginLeft : isShare ? '30px' : '0px' , color : bottom ? '#FFFFFF' : '#7BAB6F'}}>{name}</NameContent>
            <Bar></Bar>
            <TextContent style={{color: bottom ? '#D0E8CB' : '#496143'}}onClick={() => ContentClick(id)}>{text}</TextContent>
            {day_toggle ? <DdayContent style={{color : bottom ? '#FFFFFF' : '#A1B398'}}>{"D-"+ dday}</DdayContent> : <DdayContent>{count + "회"}</DdayContent>}
            {!isShare && !bottom && <div className="image" style={{marginBottom:'2px'}}><ClickImg src={Rectangle_img} onClick={() => CountUpdate(id)}/></div>}
        </MainContent>
    )
}

export default PrayerContent;


