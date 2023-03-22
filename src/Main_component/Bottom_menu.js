import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import check_img from '../images/check_img.svg';
import delete_img from '../images/delete_img.svg';
import modify_img from '../images/modify_img.svg';



const Box_container = styled.div`
    margin-left : 28px;
    margin-top : 20px;
    margin-bottom: 37px;
    width: 115px;
    height: 75px;
    border : 1px solid gray;
    border-radius: 16px;
    backgroundColor : 'F8F8F8';

`;

const Img_container = styled(Logo)`
`;

const Bottom_menu = ({Complete_btn_click, Modify_btn_click,Delete_btn_click, click_id}) =>{
    return(
        <div style={{display:'flex',  bottom:'-80px',width:"430px", height:"100px", position:'absolute',
         backgroundColor:'white', borderRadius:"24px 24px 0px 0px"}}>
            <div style={{width:"140px", height:"75px"}} onClick = {() => Complete_btn_click(click_id)}><Box_container style={{color: '#27CD2F'}}><Img_container src ={check_img} style={{marginLeft: '50px'}}/><div style={{marginTop: '10px', marginLeft: '30px'}}> 완료하기</div></Box_container></div>
            <div style={{width:"140px", height:"75px"}} onClick = {() => Modify_btn_click(click_id)}><Box_container style={{color: '#408CFF'}}><Img_container src={modify_img} style={{marginLeft: '50px'}}/><div style={{marginTop: '10px' , marginLeft: '30px'}}>수정하기</div></Box_container></div>
            <div style={{width:"140px", height:"75px"}} onClick = {() => Delete_btn_click(click_id)}><Box_container style={{color: '#FF4F4F'}}><Img_container src={delete_img} style={{marginLeft: '50px'}}/><div style={{marginTop: '10px', marginLeft: '30px'}}>삭제하기</div></Box_container></div>

        </div>
    )
}

export default Bottom_menu;

