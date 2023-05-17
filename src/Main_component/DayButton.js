import React, {useState} from "react";
import styled from "styled-components";
import Logo from "./Logo";
import Day_Calender from '../images/day_calender.svg';


const DayBtnSet = styled.div`
    display: flex;
    height: 42px;
    background-color: white;
    top: 112px;
    position: absolute;
    width: 100vw;
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

const Day_Button = ({DayInfo}) =>{
    const [color_three ,setColor_three] = useState('white');
    const [color_seven ,setColor_seven] = useState('white');
    const [color_thirty ,setColor_thirty] = useState('white');
    const [color_hundred ,setColor_hundred] = useState('white');
    const [font_three ,setFont_three] = useState('#75BD62');
    const [font_seven ,setFont_seven] = useState('#75BD62');
    const [font_thirty ,setFont_thirty] = useState('#75BD62');
    const [font_hundred ,setFont_hundred] = useState('#75BD62');
    const colorChange = (e) =>{
        console.log(e.target.className);
        if(e.target.className === "sc-kMrHXl gchicm three"){ 
            setColor_three('#75BD62');
            setColor_seven('white');
            setColor_thirty('white');
            setColor_hundred('white');
            setFont_three('white');
            setFont_seven('#75BD62');
            setFont_thirty('#75BD62');
            setFont_hundred('#75BD62');
            DayInfo(3);
        }   
        else if(e.target.className === "sc-kMrHXl gchicm seven"){ 
            setColor_three('white');
            setColor_seven('#75BD62');
            setColor_thirty('white');
            setColor_hundred('white');
            setFont_three('#75BD62');
            setFont_seven('white');
            setFont_thirty('#75BD62');
            setFont_hundred('#75BD62');
            DayInfo(7);
        }   
        else if(e.target.className === "sc-kMrHXl gchicm thirty"){ 
            setColor_three('white');
            setColor_seven('white');
            setColor_thirty('#75BD62');
            setColor_hundred('white');
            setFont_seven('#75BD62');
            setFont_three('#75BD62');
            setFont_thirty('white');
            setFont_hundred('#75BD62');
            DayInfo(30);
        }   
        else if(e.target.className === "sc-kMrHXl gchicm hundred"){ 
            setColor_three('white');
            setColor_seven('white');
            setColor_thirty('white');
            setColor_hundred('#75BD62');
            setFont_seven('#75BD62');
            setFont_thirty('#75BD62');
            setFont_three('#75BD62');
            setFont_hundred('white');
            DayInfo(100);
        }   
    }

    return(
        <DayBtnSet>
            <DayBtn className="three" onClick={colorChange} style={{backgroundColor: color_three, marginLeft:'24px', color: font_three}}>3일</DayBtn>
            <DayBtn className="seven" onClick={colorChange} style={{backgroundColor: color_seven, color:  font_seven}}>7일</DayBtn>
            <DayBtn className="thirty" onClick={colorChange} style={{backgroundColor: color_thirty, color: font_thirty}}>30일</DayBtn>
            <DayBtn className="hundred" onClick={colorChange} style={{backgroundColor: color_hundred, color: font_hundred}}>100일</DayBtn>
            <DayCalender src={Day_Calender}></DayCalender> 
        </DayBtnSet>
    )
}

export default Day_Button;