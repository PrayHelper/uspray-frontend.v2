import React, {useState} from "react";
import styled from "styled-components";

const Day_btn_set = styled.div`
    display: flex;
    height: 42px;
    background-color: white;
    top: 112px;
    position: absolute;
    width: 100vw;
`
const Day_btn = styled.button`
    width : 48px;
    height : 25px;
    font-size: 10px;
    margin-right : 8px;
    border: 1px solid #75BD62;
    border-radius: 8px;
`
const Day_Button = ({day_info}) =>{
    const [color_three ,setColor_three] = useState('white');
    const [color_seven ,setColor_seven] = useState('white');
    const [color_thirty ,setColor_thirty] = useState('white');
    const [color_hundred ,setColor_hundred] = useState('white');
    const [font_three ,setFont_three] = useState('#75BD62');
    const [font_seven ,setFont_seven] = useState('#75BD62');
    const [font_thirty ,setFont_thirty] = useState('#75BD62');
    const [font_hundred ,setFont_hundred] = useState('#75BD62');
    const color_change = (e) =>{
        console.log(e.target.className);
        if(e.target.className === "sc-gjTGSA hcKcOW three"){ 
            setColor_three('#75BD62');
            setColor_seven('white');
            setColor_thirty('white');
            setColor_hundred('white');
            setFont_three('white');
            setFont_seven('#75BD62');
            setFont_thirty('#75BD62');
            setFont_hundred('#75BD62');
            day_info(3);
        }   
        else if(e.target.className === "sc-gjTGSA hcKcOW seven"){ 
            setColor_three('white');
            setColor_seven('#75BD62');
            setColor_thirty('white');
            setColor_hundred('white');
            setFont_three('#75BD62');
            setFont_seven('white');
            setFont_thirty('#75BD62');
            setFont_hundred('#75BD62');
            day_info(7);
        }   
        else if(e.target.className === "sc-gjTGSA hcKcOW thirty"){ 
            setColor_three('white');
            setColor_seven('white');
            setColor_thirty('#75BD62');
            setColor_hundred('white');
            setFont_seven('#75BD62');
            setFont_three('#75BD62');
            setFont_thirty('white');
            setFont_hundred('#75BD62');
            day_info(30);
        }   
        else if(e.target.className === "sc-gjTGSA hcKcOW hundred"){ 
            setColor_three('white');
            setColor_seven('white');
            setColor_thirty('white');
            setColor_hundred('#75BD62');
            setFont_seven('#75BD62');
            setFont_thirty('#75BD62');
            setFont_three('#75BD62');
            setFont_hundred('white');
            day_info(100);
        }   
    }
    return(
        <Day_btn_set>
            <Day_btn className="three" onClick={color_change} style={{backgroundColor: color_three, marginLeft:'24px', color: font_three}}>3일</Day_btn>
            <Day_btn className="seven" onClick={color_change} style={{backgroundColor: color_seven, color:  font_seven}}>7일</Day_btn>
            <Day_btn className="thirty" onClick={color_change} style={{backgroundColor: color_thirty, color: font_thirty}}>30일</Day_btn>
            <Day_btn className="hundred" onClick={color_change} style={{backgroundColor: color_hundred, color: font_hundred}}>100일</Day_btn>
        </Day_btn_set>
    )
}

export default Day_Button;