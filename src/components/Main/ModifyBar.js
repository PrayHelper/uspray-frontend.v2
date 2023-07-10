import React, { useState } from "react";
import styled from "styled-components";
import Logo from "./Logo";
import X_image from "../../images/ic_modify_cancel.svg";
import Day_Calender from '../../images/day_calender.svg';
import DatePickerComponent from "./DatePickerComponent";
import { getMonth, getYear, getDate } from "date-fns"


const ModifyStyle = styled.div`
    position: fixed;
    top: 1;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    height : 280px;
    background-color: #FFFFFF;
    border: 0px solid #FFFFFF;
    z-index: 1000;
    box-sizing: border-box;
`;
const ModifyBtn = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 63px;
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
`;
const X_Image = styled(Logo)`
    width: 11.9px;
    height: 11.9px;
`;

const DayCalender = styled(Logo)`
`;

const DateSet = styled.div`
    display:flex;
    padding-right: 16px;
    margin-top: 20px;
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

const ModifyBar = ({id, valueChange, onModify, clickText}) =>{
    const [value , setValue] = useState(clickText);
    const [Toggle, setToggle] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [dayText, setDayText] = useState("");
    const [dayToggle, setDayToggle] = useState(false);
    const [name, setName] = useState("김정묵");
    console.log()
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
        <div style={{display: "flex",flexDirection: "row-reverse" ,width: '100%', height:'48px', borderBottom:"solid #EEEEEE"}}>
            <X_Image src={X_image} style={{width:'24px', height:'24px', marginTop:'12px', marginRight:"22px"}} onClick={onModify}></X_Image>
        </div>
        <div style={{width: '100%', display: 'flex', paddingLeft: "27px", paddingRight:"29px",boxSizing:"border-box"}}>
        <StyleName placeholder = {name} type="text" value = {name} onChange={onName}></StyleName>
            <textarea style={{display:"flex",width: '298px', height:'92px', marginTop:'15px',border:'none',borderBottom: '1px solid #EEEEEE', outline: 'none',
            fontFamily: 'Noto Sans KR', fontStyle: "normal", fontWeight:'400', fontSize:'16px',lineHeight:'23px', color:'#808080'}} value={value}
            onChange={onChangeValue}></textarea>
        </div>
        <DateSet>
        {dayToggle ?<div style={{marginLeft:"4px", fontFamily: "Noto Sans KR", fontStyle: "normal", fontWeight:"400", 
        fontSize:"16px", lineHeight:"23px", color:" #75BD62"}}>{"~"+ dayText}</div> : ""}
        <div><DayCalender src={Day_Calender} onClick={onToggle}/></div>
        </DateSet>
        <ModifyBtn onClick={() => valueChange(id, value, name)}>수정완료하기</ModifyBtn>
        </ModifyStyle>
    )
}

export default ModifyBar;