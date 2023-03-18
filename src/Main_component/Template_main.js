import React from "react";
import { MdAddCircle } from "react-icons/md";
import styled from "styled-components";
import { fontFamily, fontSize, style, width } from "@mui/system";
import click_search from '../images/click_search.svg';
import Logo from "./Logo";
const Background_input = styled.div`
    display : flex;
    width: 430px;
    height: 120px;
    margin-left : auto;
    margin-right : auto;
`;
const Btn_send = styled.button`
    marginTop:'65px';
    width:"31px";
    font-size:"1px";
`;

const Send_img = styled(Logo)``;


const Template_main = ({children}) =>{
    const text = "김정묵"
    return(
        <div>
            <Background_input>
                <div style={{width: '67px', height:'23px', marginLeft:'24px',marginTop:'72px', padding:'0px'}}>
                    <div style={{display:"grid", placeItems:"center", width: '67px', height: '23px', fontSize:'16px',fontFamily:'Noto Sans KR',fontWeight:'400',color:"#75BD62"}}>{text}</div>
                </div>
                <input style={{marginLeft:"16px",width:"256px", height:"23px" , marginTop:'72px', padding:'0px', marginRight:'12px',borderRadius:'4px', border:'none'}}placeholder="입력" type="text"></input>
                <div style={{width:'31px', height:'31px', marginTop:'72.03px', }}>
                    <Btn_send style={{backgroundColor:'white', border:'none'}}><Send_img src={click_search}/></Btn_send>
                </div>
            </Background_input>
            <div> {children}</div>
        </div>
    )
}

export default Template_main;
