import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import check_img from '../../images/check_img.svg';
import delete_img from '../../images/delete_img.svg';
import modify_img from '../../images/modify_img.svg';

const Container = styled.div`
    display: flex;
    position: fixed;
    justify-content: space-around;
    top: 1;
    bottom: 0;
    right: 0;
    left: 0;  
    width: 100%; 
    height: 153px;
    z-index: 1000;
    background-color:white;
    border-radius: 24px 24px 0px 0px;
`

const BoxContainer = styled.div`
    width: 115px;
    height: 75px;
    border : 1px;
    border-radius: 16px;
    background-color: #F8F8F8;
    // margin-left : 18px;
    margin-bottom: 4px;
    padding: 0px;
`;

const ImgContainer = styled(Logo)`
`;

const FrameContainer = styled.div`
    margin-top: 41px;
    display: flex;
` 

const BottomMenu = ({completeBtnClick, modifyBtnClick, bottom_delete_click, clickId }) =>{
    return(
        <Container>
            <FrameContainer onClick = {() => completeBtnClick(clickId)}><BoxContainer style={{color: '#27CD2F', marginLeft: "5px"}}><ImgContainer src ={check_img} style={{marginLeft: '46px', marginTop:'12px'}}/><div style={{display:"flex", marginTop: '10px', justifyContent:"center", textAlign:"center"}}> 완료하기</div></BoxContainer></FrameContainer>
            <FrameContainer onClick = {() => modifyBtnClick(clickId)}><BoxContainer style={{color: '#408CFF'}}><ImgContainer src={modify_img} style={{marginLeft: '46px', marginTop:'12px'}}/><div style={{display: "flex",marginTop: '10px' , justifyContent:"center", textAlign:"center" }}>수정하기</div></BoxContainer></FrameContainer>
            <FrameContainer onClick = {() => bottom_delete_click()}><BoxContainer style={{color: '#FF4F4F', marginRight:"4px"}}><ImgContainer src={delete_img} style={{marginLeft: '46px', marginTop:'12px'}}/><div style={{display: "flex", marginTop: '10px', justifyContent:"center", textAlign:"center"}}>삭제하기</div></BoxContainer></FrameContainer>
        </Container>
    )
}

export default BottomMenu;

