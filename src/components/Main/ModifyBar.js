import React, { useState } from "react";
import styled from "styled-components";
import Logo from "./Logo";
import X_image from "../../images/ic_modify_cancel.svg";
import Day_Calender from '../../images/day_calender.svg';
import Day_Calender_hover from "../../images/DayCalender_hover.svg";
import DatePickerComponent from "./DatePickerComponent";
import { getMonth, getYear, getDate } from "date-fns"


const ModifyStyle = styled.div`
    position: fixed;
    top: 1;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    background-color: #FFFFFF;
    border: 0px solid #FFFFFF;
    z-index: 104;
`;
const ModifyBtn = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    background: #7BAB6E;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 23px;
    text-align: center;
    color: #FFFFFF;
    margin-top: 16px;
    box-sizing: border-box;
    padding: 20px 0px;
`;
const TopContainer = styled.div`
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
    borderBottom: 1px solid #EEEEEE;
    padding: 12px 16px 12px 0px;
    box-sizing: border-box;
`
const X_Image = styled(Logo)`
    width: 24px;
    height: 24px;
`;

const DayCalender = styled(Logo)`
`;

const DateSet = styled.div`
    display:flex;
    padding-right: 16px;
    margin-top: 16px;
    flex-direction: row-reverse
`
const StyleName = styled.input`
    width: 60px;
    height: 23px;
    font-size: 16px;
    margin-right: 31px;
    margin-top: 15px;
    font-family: Noto Sans KR;
    font-weight: 400;
    color: #75BD62;
    outline: none;
    border: none;
    border-bottom: 1px solid #EEEEEE;
`

const ModifyBar = ({id, valueChange, onModify, clickText, isModify}) =>{
    const [value , setValue] = useState(clickText);
    const [Toggle, setToggle] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [dayText, setDayText] = useState("");
    const [dayToggle, setDayToggle] = useState(false);
    const [name, setName] = useState("김정묵");
    const onChangeValue = (e) =>{
        setValue(e.target.value);
    }
    const onToggle = () =>{
        setToggle(!Toggle);
    }
    const dateClick = (date) =>{
        setStartDate(date);
        setToggle(!Toggle);
        var year = getYear(date);
        var month = ((getMonth(date)+1) < 10) ? "0" + (getMonth(date) + 1) : getMonth(date);
        var date = (getDate(date) < 10) ? "0" + getDate(date) : getDate(date);
        let res_data = year + "/" +  month + "/" + date;
        setDayText(res_data);
        setDayToggle(!dayToggle);
      }

    const onName = (e) =>{
        setName(e.target.value)
    }
    return(
        <ModifyStyle>
        {Toggle ? <div><DatePickerComponent startDate = {startDate} setStartDate ={setStartDate} dateClick={dateClick}/></div> : ""}
        <TopContainer>
            <X_Image src={X_image} onClick={onModify}></X_Image>
        </TopContainer>
        <div style={{width: '100%', display: 'flex', paddingLeft: "27px", paddingRight:"31px",boxSizing:"border-box"}}>
        <StyleName placeholder = {name} type="text" value = {name} onChange={onName}></StyleName>
            <textarea style={{display:"flex",flexGrow:"1", minHeight:'92px', marginTop:'15px',border:'none',borderBottom: '1px solid #EEEEEE', outline: 'none',
            fontFamily: 'Noto Sans KR', fontStyle: "normal", fontWeight:'400', fontSize:'16px',lineHeight:'23px', color:'#808080'}} value={value}
            onChange={onChangeValue}></textarea>
        </div>
        <DateSet>
        {dayToggle ?<div style={{marginLeft:"4px", fontFamily: "Noto Sans KR", fontStyle: "normal", fontWeight:"400", 
        fontSize:"16px", lineHeight:"23px", color:" #75BD62"}}>{"~"+ dayText}</div> : ""}
        <div><DayCalender src={dayToggle ? Day_Calender_hover : Day_Calender} onClick={onToggle}/></div>
        </DateSet>
        <ModifyBtn onClick={() => valueChange(id, value, name)}>수정 완료하기</ModifyBtn>
        </ModifyStyle>
    )
}

export default ModifyBar;