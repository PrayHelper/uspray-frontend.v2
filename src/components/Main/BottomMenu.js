import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import check_img from '../../images/check_img.svg';
import delete_img from '../../images/delete_img.svg';
import modify_img from '../../images/modify_img.svg';

const MainContainer = styled.div`
    display: flex;
    flex-direction : column;
    position: fixed;
    // justify-content: space-between;
    padding-left: 24px;
    padding-right: 24px;
    // padding-top: 12px;
    box-sizing: border-box;
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
    display: flex;
    flex-direction: column;
    width: 30.67%;
    height: 75px;
    border : 1px;
    border-radius: 16px;
    background-color: #F8F8F8;
    margin-bottom: 4px;
    padding-top: 12px;
    box-sizing : border-box;
    justify-content: center; /* 이미지를 가로 방향 가운데 정렬 */
    align-items: center; 
`;

const SubContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width : 100%;
    heigth: 112px;
    border: none;
`;

const ImgContainer = styled(Logo)`
    display: flex;
    justify-content: center; /* 이미지를 가로 방향 가운데 정렬 */
    align-items: center; 
`;

const BottomMenu = ({completeBtnClick, modifyBtnClick, bottom_delete_click, clickId, changeCheck}) =>{
    return(
        <MainContainer>
            <div style={{display:"flex", justifyContent:"center"}}><div style={{display: "flex",width:"52px", height:'4px', paddingTop:"12px",marginBottom:"25px",borderBottom: "4px solid #F0F0F0"}} 
            onClick={changeCheck}></div></div>
            <SubContainer>
                <BoxContainer style={{color: '#27CD2F'}} onClick = {() => completeBtnClick(clickId)}><ImgContainer src ={check_img}/><div style={{display:"flex", marginTop: '4px', justifyContent:"center", textAlign:"center"}}> 완료하기</div></BoxContainer>
                <BoxContainer style={{color: '#408CFF'}} onClick = {() => modifyBtnClick(clickId)}><ImgContainer src={modify_img}/><div style={{display: "flex",marginTop: '4px' , justifyContent:"center", textAlign:"center" }}>수정하기</div></BoxContainer>
                <BoxContainer style={{color: '#FF4F4F'}} onClick = {() => bottom_delete_click()}><ImgContainer src={delete_img}/><div style={{display: "flex", marginTop: '4px', justifyContent:"center", textAlign:"center"}}>삭제하기</div></BoxContainer>
            </SubContainer>
        </MainContainer>
    )
}

export default BottomMenu;

