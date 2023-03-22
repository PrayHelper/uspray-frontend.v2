import React, {useRef, useState} from "react";
import styled from "styled-components";

const Day_btn_set = styled.div`
    display: flex;
    margin-bottom : 30px;
    margin-left : 39px;
`

const Day_btn = styled.button`
    width : 48px;
    height : 25px;
    font-size: 10px;
    margin-right : 8px;
`
const Day_Button = ({day_info}) =>{
    const [color_three ,setColor_three] = useState('white');
    const [color_seven ,setColor_seven] = useState('white');
    const [color_thirty ,setColor_thirty] = useState('white');
    const [color_hundred ,setColor_hundred] = useState('white');
    const color_change = (e) =>{
        console.log(e.target.className);
        if(e.target.className == "sc-gjTGSA jaOyYQ three"){ 
        setColor_three('#75BD62');
            setColor_seven('white');
            setColor_thirty('white');
            setColor_hundred('white');
            day_info(3);
        }   
        else if(e.target.className == "sc-gjTGSA jaOyYQ seven"){ 
            setColor_three('white');
            setColor_seven('#75BD62');
            setColor_thirty('white');
            setColor_hundred('white');
            day_info(7);
        }   
        else if(e.target.className == "sc-gjTGSA jaOyYQ thirty"){ 
            setColor_three('white');
            setColor_seven('white');
            setColor_thirty('#75BD62');
            setColor_hundred('white');
            day_info(30);
        }   
        else if(e.target.className == "sc-gjTGSA jaOyYQ hundred"){ 
            setColor_three('white');
            setColor_seven('white');
            setColor_thirty('white');
            setColor_hundred('#75BD62');
            day_info(100);
        }   
    }
    return(
        <Day_btn_set>
            <Day_btn className="three" onClick={color_change} style={{backgroundColor: color_three}}>3일</Day_btn>
            <Day_btn className="seven" onClick={color_change} style={{backgroundColor: color_seven}}>7일</Day_btn>
            <Day_btn className="thirty" onClick={color_change} style={{backgroundColor: color_thirty}}>30일</Day_btn>
            <Day_btn className="hundred" onClick={color_change} style={{backgroundColor: color_hundred}}>100일</Day_btn>
        </Day_btn_set>
    )
}

export default Day_Button;