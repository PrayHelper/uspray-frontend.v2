import React, { useState } from "react";
import styled from "styled-components";
import GreenCheckbox from "../components/GreenCheckbox";


const BackGroundBox = styled.div`

    display: flex;
    position: relative;
    height: 75px;
    margin: ${props => props.isChecked ? '-2px' : '0px'};
    margin-bottom: 10px;
    padding: 0px 16px;
    background: #FFFFFF;
    box-shadow: 0px 2px 8px rgba(49, 65, 44, 0.25);
    border-radius: 24px;
    border: ${props => props.isChecked ? '2px solid #7BAB6E': '0px'};
`

const NameTag = styled.div`
    margin-left: 16px;
    margin-top: 16px;
    margin-bottom: 36px;

    font-weight: 700;

    color: #1C1C1C;
`
const PrayerTag = styled.div`

    position: absolute;
    margin-top: 39px;
    margin-left: 56px;

    font-size: 14px;
    line-height: 20px;
    text-align: center;
`
const DdayTag = styled.div`
    position: absolute;
    margin-top: 42px;
    right: 16px;

    font-size: 12px;
    color: #A0A0A0;
`

const PrayChecker = ({name, title, dday}) => {
    const [isChecked, setIsChecked] = useState(false);
    function clickHandler(event){
        setIsChecked(event.target.checked);
    }
    return (
        <BackGroundBox isChecked={isChecked}>
            <GreenCheckbox checked={isChecked} handler = {clickHandler}/>
            <NameTag>{name}</NameTag>
            <PrayerTag>{title}</PrayerTag>
            <DdayTag>{dday}</DdayTag>
        </BackGroundBox>
    );
};

export default PrayChecker;