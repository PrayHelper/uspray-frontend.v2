import React, {useState} from "react";
import styled from "styled-components";
import Logo from "./Logo";
import Day_Calender from '../../images/day_calender.svg';
import Day_Calender_hover from "../../images/DayCalender_hover.svg";
import DatePickerComponent from "./DatePickerComponent";
import { getMonth, getYear, getDate } from "date-fns"
const DayBtnSet = styled.div`
    display: flex;
    position: absolute;
    background-color: white;
    width: 100%;
    z-index: 102;
    border-bottom: 1px solid white;
    padding-bottom: 26px;
`
const DayBtn = styled.button`
    font-size: 10px;
    margin-right : 8px;
    border: 1px solid #75BD62;
    border-radius: 8px;
    padding: 4px 15px;
`

const DayCalender = styled(Logo)`
`;

const Day_Button = ({dayInfo}) =>{
    const [colorThree ,setColorThree] = useState('white');
    const [colorSeven ,setColorSeven] = useState('#75BD62');
    const [colorThirty ,setColorThirty] = useState('white');
    const [colorHundred ,setColorHundred] = useState('white');
    const [fontThree ,setFontThree] = useState('#75BD62');
    const [fontSeven ,setFontSeven] = useState('white');
    const [fontThirty ,setFontThirty] = useState('#75BD62');
    const [fontHundred ,setFontHundred] = useState('#75BD62');
    const [Toggle, setToggle] = useState(true);
    const [startDate, setStartDate] = useState(new Date());
    const [dayToggle, setDayToggle] = useState(false);
    const [dayText, setDayText] = useState("");
    const dateClick = (date) =>{
        setStartDate(date);
        colorChange(date);
        setToggle(!Toggle);
        setColorThree('white');
        setColorSeven('white');
        setColorThirty('white');
        setColorHundred('white');
        setFontThree('#75BD62');
        setFontSeven('#75BD62');
        setFontThirty('#75BD62');
        setFontHundred('#75BD62');
        var year = getYear(date);
        var month = ((getMonth(date)+1) < 10) ? "0" + (getMonth(date) + 1) : (getMonth(date)+1);
        var date = (getDate(date) < 10) ? "0" + getDate(date) : getDate(date);
        let res_data = year + "/" +  month + "/" + date;
        setDayText(res_data);
        setDayToggle(true);
      }
    const colorChange = (e) =>{
        if(e.target == undefined){
            let res_data = getYear(e) + "-" + (getMonth(e)+1) + "-" + getDate(e);
            console.log(res_data)
            var today = new Date();
            var dday = new Date(res_data);
            var result = Math.ceil((dday - today)/(1000*60*60*24));
            dayInfo(result);
        }
        else{
            var sliceStringFive = e.target.className.slice(-5);
            var sliceStringSix = e.target.className.slice(-6);
            var sliceStringSeven = e.target.className.slice(-7);
            if(sliceStringFive === "three"){ 
                setColorThree('#75BD62');
                setColorSeven('white');
                setColorThirty('white');
                setColorHundred('white');
                setFontThree('white');
                setFontSeven('#75BD62');
                setFontThirty('#75BD62');
                setFontHundred('#75BD62');
                dayInfo(3);
                if(dayToggle){
                    setDayToggle(!dayToggle);
                }
            }   
            else if(sliceStringFive === "seven"){ 
                setColorThree('white');
                setColorSeven('#75BD62');
                setColorThirty('white');
                setColorHundred('white');
                setFontThree('#75BD62');
                setFontSeven('white');
                setFontThirty('#75BD62');
                setFontHundred('#75BD62');
                dayInfo(7);
                if(dayToggle){
                    setDayToggle(!dayToggle);
                }
            }   
            else if(sliceStringSix === "thirty"){ 
                setColorThree('white');
                setColorSeven('white');
                setColorThirty('#75BD62');
                setColorHundred('white');
                setFontSeven('#75BD62');
                setFontThree('#75BD62');
                setFontThirty('white');
                setFontHundred('#75BD62');
                dayInfo(30);
                if(dayToggle){
                setDayToggle(!dayToggle);
                }
            }   
            else if(sliceStringSeven === "hundred"){ 
                setColorThree('white');
                setColorSeven('white');
                setColorThirty('white');
                setColorHundred('#75BD62');
                setFontSeven('#75BD62');
                setFontThirty('#75BD62');
                setFontThree('#75BD62');
                setFontHundred('white');
                dayInfo(100);
                if(dayToggle){
                    setDayToggle(!dayToggle);
                }
            }   
        }
    }
    const onToggle = () =>{
        // setVisible(!visible);
        setToggle(!Toggle);
    }
    return(
        Toggle ? <DayBtnSet>
            <DayBtn className="three" onClick={colorChange} style={{backgroundColor: colorThree, marginLeft:'24px', color: fontThree}}>3일</DayBtn>
            <DayBtn className="seven" onClick={colorChange} style={{backgroundColor: colorSeven, color:  fontSeven}}>7일</DayBtn>
            <DayBtn className="thirty" onClick={colorChange} style={{backgroundColor: colorThirty, color: fontThirty}}>30일</DayBtn>
            <DayBtn className="hundred" onClick={colorChange} style={{backgroundColor: colorHundred, color: fontHundred}}>100일</DayBtn>
            <DayCalender src ={!dayToggle ? Day_Calender : Day_Calender_hover} onClick={onToggle}></DayCalender>
            {dayToggle ? <div style={{marginLeft: "4px",color: "#75BD62", fontSize:'12px', paddingTop:'4px'}}>{"~" + dayText}</div> : ""}
        </DayBtnSet>: 
        <DayBtnSet>
        <DatePickerComponent startDate = {startDate} setStartDate ={setStartDate} dateClick={dateClick}/> 
        </DayBtnSet> 


    )
}

export default Day_Button;