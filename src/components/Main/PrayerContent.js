import React from "react";
import styled from "styled-components";
import ShareCheckBox from "./ShareCheckBox";
import ShareBotCheckBox from "./ShareBotCheckBox";
import {ReactComponent as HeartImage} from "../../images/ic_full_heart_image.svg";

const MainContent = styled.div`
    display: flex;
    align-items: center;
    margin: 16px 12px 0 16px;
    border-bottom : 1px solid #B3D1AB;
    transition: all 0.3s ease-in-out;
    padding-bottom: 8px;
`

const NameContent = styled.div`
    flex-shrink: 0;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 17px;
    padding-right: 8px;
    border-right: 1px solid #CECECE;
`;

const TextContent = styled.div`
    margin: 0px 8px;
    flex-grow : 1;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 17px;
`;

const DdayContent = styled.div`
    flex-shrink: 0;
    font-size : 12px;
    text-align : right;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    line-height: 17px;
    margin-right: 8px;
`;
const ClickImg = styled(HeartImage)`
    width: 24px;
    height: 24px;
    transition: all 0.3s;
    path{
        fill: none;
        stroke: #FF8989;
        stroke-width: 1;
    }
    &:active {
        filter: brightness(0.9);
        transform: scale(0.9);
        path{
            fill : #FF8989;
            stroke : none;
        }
    }
`;



function PrayerContent({content, dayToggle , countUpdate, bottom, contentClick, isShare, shareList, clickOff}){
    const {id, dday,text,checked, name, count} = content;
    const clickHandler = (event) =>{
        if(!checked){
        return shareList(event.target.id, !checked);
        }
        else{
            clickOff(id);
        }
    }
    return(
        <MainContent>
            {isShare && (!bottom ?         
            <ShareCheckBox id = {id} checked={checked} handler = {clickHandler} /> : 
            <ShareBotCheckBox id={id} checked={checked} handler={clickHandler}/>)}
            <NameContent style={{color : bottom ? '#FFFFFF' : '#7BAB6F'}} onClick={() =>contentClick(id, checked)}>{name}</NameContent>
            <TextContent style={{color: bottom ? '#D0E8CB' : '#496143'}}onClick={() => contentClick(id, checked)}>{text}</TextContent>
            {dayToggle ? <DdayContent style={{color : bottom ? '#FFFFFF' : '#A1B398', fontSize: "12px"}}>{(dday !== 0) ? "D-"+ dday : "D-Day"}</DdayContent> : <DdayContent style={{color : bottom ? '#FFFFFF' : '#A1B398'}}>{count + "회"}</DdayContent>}
            {(!isShare && !bottom) ? <div className="image"><ClickImg src={HeartImage} onClick={() => countUpdate(id)}/></div>
            :<div style={{height:"24px"}}></div>}
        </MainContent>
    )
}

export default PrayerContent;


