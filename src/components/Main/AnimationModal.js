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
    top: 1;
    bottom: 0;
    right: 0;
    left: 0;
    width: 88.837%;
    height: 28px;
    background-color: #78AB6E;
    margin-bottom : 65px;
    z-index: 100000;
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
const AnimationModal = ({modalText}) => {
    console.log(modalText);
    return (
        <AnimationStyle>
            <SubAnimation>
                <AnimationCheck src={Animation_check}/>
                <AnimationText>{modalText}</AnimationText>
            </SubAnimation>
        </AnimationStyle>
    );
};

export default AnimationModal;