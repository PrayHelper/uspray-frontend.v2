import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import Animation_check from '../../images/ic_animation_check.svg';

const AnimationStyle = styled.div`
    position : fixed;
    display: flex;
    text-align: center;
    padding: 16px 30px;
    border-radius: 16px;
    bottom: 10%;
    right: 0;
    left: 0;
    background-color: #78AB6E;
    z-index: 102;
    transition: all 0.3s ease-in-out;
`
const SubAnimation = styled.div`
    display: flex;
    just-content: space-between;
`
const AnimationText = styled.div`
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 23px;
    color: #FFFFFF;
`
const AnimationCheck = styled(Logo)`
    width: 24px;
    height: 24px;
    margin-right: 8px;
`
const AnimationModal = ({modalText, modalToggle}) => {
    return (
        <AnimationStyle style={{bottom: modalToggle ? "10%" : "0%" , opacity : modalToggle ? "1" : "0"}}>
            <SubAnimation>
                <AnimationCheck src={Animation_check}/>
                <AnimationText>{modalText}</AnimationText>
            </SubAnimation>
        </AnimationStyle>
    );
};

export default AnimationModal;