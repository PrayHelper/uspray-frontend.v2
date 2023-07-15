import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import ShareCheckBox from "./ShareCheckBox";
import ShareBotCheckBox from "./ShareBotCheckBox";
import HeartImage from "../../images/ic_heart_image.svg";

const MainContent = styled.div`
    display: flex;
    justify-content: space-between;
    height: 25px;
    margin-top: 16px;
    margin-left: 12px; 
    margin-right: 12px;
    border-bottom : 1px solid #B3D1AB;
    padding-right: 4px;
    padding-bottom : 8px;
`

const NameContent = styled.div`
    // width: 42px;
    // display: ;
    width: 15%;
    height: 17px;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    border-right: 1px solid #CECECE;
    font-size: 12px;
    line-height: 17px;

`;

const TextContent = styled.div`
    // width: 263px;
    width: 70.571%;
    height: 17px;
    padding : 0px;
    margin-left: 6px;
    // margin-right: 8px;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 17px;
`;

const DdayContent = styled.div`
    width : 45px;
    font-size : 12px;
    heigth : 17px;
    text-align : center;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    line-height: 17px;
    // margin-left: 4px;
    margin-top : 2px;
`;
const ClickImg = styled(Logo)`
    width: 24px;
    height: 24px;
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
            <NameContent style={{color : bottom ? '#FFFFFF' : '#7BAB6F'}}>{name}</NameContent>
            <TextContent style={{color: bottom ? '#D0E8CB' : '#496143'}}onClick={() => contentClick(id)}>{text}</TextContent>
            {dayToggle ? <DdayContent style={{color : bottom ? '#FFFFFF' : '#A1B398', fontSize: "12px"}}>{(dday !== 0) ? "D-"+ dday : "D-Day"}</DdayContent> : <DdayContent style={{color : bottom ? '#FFFFFF' : '#A1B398'}}>{count + "회"}</DdayContent>}
            {!isShare && !bottom && <div className="image" style={{}}><ClickImg src={HeartImage} onClick={() => countUpdate(id)} style={{width:'24px', height:'24px'}}/></div>}
        </MainContent>
    )
}

export default PrayerContent;


