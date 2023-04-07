import React, { useState } from "react";
import styled from "styled-components";
import ImageSwitcher from "./L_ImageSwitcher";

const BackGroundBox = styled.div`

    display: flex;
    position: relative;
    width: 382px;
    height: 75px;

    background: #FFFFFF;
    box-shadow: 0px 2px 8px rgba(49, 65, 44, 0.25);
    border-radius: 24px;
`
const NameTag = styled.div`
    margin-left: 16px;
    margin-top: 16px;
    margin-bottom: 36px;

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;

    color: #1C1C1C;
`
const PrayerTag = styled.div`

    position: absolute;
    margin-top: 39px;
    margin-left: 56px;

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
`
const DdayTag = styled.div`
    
    margin: 16px;
    
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;

    color: #A0A0A0;
`
const Checkbox = styled.div`
    margin-left: 16px;
    margin-top: 25px;
`
const imageUrls = [
    '/images/Locker_NullBox.svg',
    '/images/Locker_FullBox.svg',
  ];

const PrayChecker = ({id, checked, name, prayer, dday}) => {
    return (
        <BackGroundBox>
            <Checkbox>
                <ImageSwitcher images={imageUrls}/>
            </Checkbox> 
            <NameTag>{name}</NameTag>
            <PrayerTag>{prayer}</PrayerTag>
            <DdayTag>{dday}</DdayTag>
        </BackGroundBox>
    );
};

export default PrayChecker;