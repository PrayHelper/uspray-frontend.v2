import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import check_img from '../../images/check_img.svg';
import delete_img from '../../images/delete_img.svg';
import modify_img from '../../images/modify_img.svg';


const BoxContainer = styled.div`
    width: 82.14%;
    height: 9vh;
    border : 1px;
    border-radius: 16px;
    background-color: #F8F8F8;
    margin-left : 18px;
    margin-bottom: 4px;
    padding: 0px;
`;

const ImgContainer = styled(Logo)`
`;

const FrameContainer = styled.div`
    width: 32.56%;
    height : 9vh;
    margin-top: 41px;
` 

const BottomMenu = ({completeBtnClick, modifyBtnClick, bottom_delete_click, clickId }) =>{
    return(
        <div style={{display:'flex',width:'100%', height:'200px',
         backgroundColor:'white', borderRadius:"24px 24px 0px 0px"}}>
            <FrameContainer onClick = {() => completeBtnClick(clickId)}><BoxContainer style={{color: '#27CD2F', marginLeft:'24px'}}><ImgContainer src ={check_img} style={{marginLeft: '46px', marginTop:'12px'}}/><div style={{marginTop: '10px', marginLeft: '30px'}}> 완료하기</div></BoxContainer></FrameContainer>
            <FrameContainer onClick = {() => modifyBtnClick(clickId)}><BoxContainer style={{color: '#408CFF'}}><ImgContainer src={modify_img} style={{marginLeft: '46px', marginTop:'12px'}}/><div style={{marginTop: '10px' , marginLeft: '30px'}}>수정하기</div></BoxContainer></FrameContainer>
            <FrameContainer onClick = {() => bottom_delete_click()}><BoxContainer style={{color: '#FF4F4F'}}><ImgContainer src={delete_img} style={{marginLeft: '46px', marginTop:'12px'}}/><div style={{marginTop: '10px', marginLeft: '30px'}}>삭제하기</div></BoxContainer></FrameContainer>
        </div>
    )
}

export default BottomMenu;

