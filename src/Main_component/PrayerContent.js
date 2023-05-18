import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import Empty_Box_top from '../images/empty_box.svg';
import Bar from "./Bar";
import Download_img from "../images/Click_img.svg";
import Empty_Box_btm from "../images/empty_box_bt.svg";
import Check_Box_btm from "../images/check_box_bt.svg";
import Check_Box_top from "../images/check_box_top.svg";


const MainContent = styled.div`
    display: flex;
    width: 91.62%;
    height: auto;
    margin-left : 16px;
    margin-right : 16px;
    margin-top : 22px;
    margin-bottom: 16px;
    border-bottom : solid;
    border-bottom-color: #CECECE;
`

const NameContent = styled.div`
    width: 9.71%;
    height: 1.84vh;
    margin-right : 8px;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 17px;
`;

const TextContent = styled.div`
    width: 66.75%;
    padding : 0px;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 17px;
`;

const DdayContent = styled.div`
    width : 8.5%;
    font-size : 10px;
    heigth : 1.84vh;
    text-align : center;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 17px;
    margin-left: 4px;
    margin-right: 4px;
    margin-top : 4px;
`;
const ClickImg = styled(Logo)`
    width: 4.19%;
    height: 1.73vh;
`;

function PrayerContent({content, dayToggle , countUpdate, bottom, contentClick, isShare, shareList}){
    const {id, dday,text,checked, name, count} = content;
    const checkBoxClick = (id) =>{
        return shareList(id, !checked);
    }
    return(
        <MainContent>
            {isShare && <ClickImg src={bottom ? (checked ? Check_Box_btm : Empty_Box_btm) : (checked ? Check_Box_top : Empty_Box_top)} style={{marginRight: '20px'}} 
            onClick={() => checkBoxClick(id)}/> }
            <NameContent style={{marginLeft : isShare ? '30px' : '0px' , color : bottom ? '#FFFFFF' : '#7BAB6F'}}>{name}</NameContent>
            <Bar></Bar>
            <TextContent style={{color: bottom ? '#D0E8CB' : '#496143'}}onClick={() => contentClick(id)}>{text}</TextContent>
            {dayToggle ? <DdayContent style={{color : bottom ? '#FFFFFF' : '#A1B398'}}>{(dday != 0) ? "D-"+ dday : "D-Day"}</DdayContent> : <DdayContent style={{color : bottom ? '#FFFFFF' : '#A1B398'}}>{count + "회"}</DdayContent>}
            {!isShare && !bottom && <div className="image" style={{marginBottom:'2px'}}><ClickImg src={Download_img} onClick={() => countUpdate(id)} style={{width:'24px', height:'24px'}}/></div>}
        </MainContent>
    )
}

export default PrayerContent;


