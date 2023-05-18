import React, {useState} from "react";
import styled from "styled-components";
import Logo from "./Logo";
import Day_Calender from '../images/day_calender.svg';
// import DatePicker from "react-datepicker";
const DayBtnSet = styled.div`
    display: flex;
    height: 42px;
    background-color: white;
    top: 105px;
    position: absolute;
    width: 100%;
`
const DayBtn = styled.button`
    width : 48px;
    height : 25px;
    font-size: 10px;
    margin-right : 8px;
    border: 1px solid #75BD62;
    border-radius: 8px;
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
    const colorChange = (e) =>{
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
        }   
    }
    const datePickerComponent = () =>{
        console.log("날짜 입력하는데로 슝")
    }
    return(
        <DayBtnSet>
            <DayBtn className="three" onClick={colorChange} style={{backgroundColor: colorThree, marginLeft:'24px', color: fontThree}}>3일</DayBtn>
            <DayBtn className="seven" onClick={colorChange} style={{backgroundColor: colorSeven, color:  fontSeven}}>7일</DayBtn>
            <DayBtn className="thirty" onClick={colorChange} style={{backgroundColor: colorThirty, color: fontThirty}}>30일</DayBtn>
            <DayBtn className="hundred" onClick={colorChange} style={{backgroundColor: colorHundred, color: fontHundred}}>100일</DayBtn>
            <DayCalender src={Day_Calender} onClick={() => datePickerComponent()}></DayCalender> 
        </DayBtnSet>
    )
}

export default Day_Button;