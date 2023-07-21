import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import ShareCheckBox from "./ShareCheckBox";
import ShareBotCheckBox from "./ShareBotCheckBox";
import HeartImage from "../../images/ic_heart_image.svg";

const MainContent = styled.div`
    display: flex;
    align-items: center;
    margin: 16px 12px 0 16px;
    border-bottom : 1px solid #B3D1AB;
    padding: 0 4px 8px 0;
`

const NameContent = styled.div`
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    border-right: 1px solid #CECECE;
    padding-right: 8px;
    font-size: 12px;
    line-height: 17px;
`;

const TextContent = styled.div`
    padding : 0px;
    margin-left: 8px;
    flex-grow : 1;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 17px;
`;

const DdayContent = styled.div`
    font-size : 12px;
    text-align : right;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    line-height: 17px;
    margin-right: 4px;
`;
const ClickImg = styled(Logo)`
    width: 24px;
    height: 24px;
    transition: background-color 0.3s;
    &:active {
        filter: brightness(0.9)
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
        <MainContent style={{paddingBottom : (bottom || isShare) ? "16px" : "8px"}}>
            {isShare && (!bottom ?         
            <ShareCheckBox id = {id} checked={checked} handler = {clickHandler} /> : 
            <ShareBotCheckBox id={id} checked={checked} handler={clickHandler}/>)}
            <NameContent style={{color : bottom ? '#FFFFFF' : '#7BAB6F'}}>{name}</NameContent>
            <TextContent style={{color: bottom ? '#D0E8CB' : '#496143'}}onClick={() => contentClick(id, checked)}>{text}</TextContent>
            {dayToggle ? <DdayContent style={{color : bottom ? '#FFFFFF' : '#A1B398', fontSize: "12px"}}>{(dday !== 0) ? "D-"+ dday : "D-Day"}</DdayContent> : <DdayContent style={{color : bottom ? '#FFFFFF' : '#A1B398'}}>{count + "회"}</DdayContent>}
            {!isShare && !bottom && <div className="image" style={{}}><ClickImg src={HeartImage} onClick={() => countUpdate(id)}/></div>}
        </MainContent>
    )
}

export default PrayerContent;


