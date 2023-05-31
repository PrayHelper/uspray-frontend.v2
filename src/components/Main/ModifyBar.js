import React, { useState } from "react";
import styled from "styled-components";
import Logo from "./Logo";
import X_image from "../../images/ic_modify_cancel.svg";
const ModifyStyle = styled.div`
    position: fixed;
    top:1;
    bottom: 0;
    right: 0;
    left: 0;
    width: 430px;
    height : 280px;
    background-color: #FFFFFF;
    border: solid #FFFFFF;
    z-index: 1000;
`;
const ModifyBtn = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 20px 144px;
    gap: 10px;
    height: 30px;
    background: #7BAB6E;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 23px;
    text-align: center;
    color: #FFFFFF;
    margin-top: 61px;
`;
const X_Image = styled(Logo)`
    width: 11.9px;
    height: 11.9px;
`;

const ModifyBar = ({id, valueChange, onModify}) =>{
    const [value , setValue] = useState("");
    const onChangeValue = (e) =>{
        setValue(e.target.value);
    }
    return(
        <ModifyStyle>
        <div style={{width: '430px', height:'48px', borderBottom:"solid #EEEEEE"}}>
            <X_Image src={X_image} style={{width:'24px', height:'24px', marginLeft:'390px', marginTop:'12px'}} onClick={onModify}></X_Image>
        </div>
        <div style={{width: '430px', height:'100px', display: 'flex'}}>
            <div style={{width:'45px', height: '23px', marginTop:'15px', marginLeft:'27px', marginRight:'31px', borderBottom: 'solid #EEEEEE',
        fontFamily: 'Noto Sans KR', fontStyle: "normal", fontWeight:'400', fontSize:'16px', lineHeight:'23px', color:'#75BD62'}}>김정묵</div>
            <input style={{width: '298px', height:'92px', marginTop:'15px',border:'none',borderBottom: '1px solid #EEEEEE',wordWrap: 'break-word', outline: 'none',
            fontFamily: 'Noto Sans KR', fontStyle: "normal", fontWeight:'400', fontSize:'16px',lineHeight:'23px', color:'#808080'}} value={value}
            onChange={onChangeValue}></input>
        </div>
        <ModifyBtn onClick={() => valueChange(id, value)}>수정완료하기</ModifyBtn>
        </ModifyStyle>
    )
}

export default ModifyBar;