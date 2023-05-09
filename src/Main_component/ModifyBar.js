import React, { useState } from "react";
import styled from "styled-components";

const ModifyStyle = styled.div`
    width: 430px;
    height : 200px;
    position: absolute;
    bottom: -55px;
    background-color: #FFFFFF;
    border: solid;
`;

const ModifyBar = ({id, ValueChange}) =>{
    const [value , setValue] = useState("");
    const onChangeValue = (e) =>{
        setValue(e.target.value);
    }
    return(
        <ModifyStyle><div style={{width: '430px', height:'38px', borderBottom: 'solid #EEEEEE'}}></div>
        <div style={{width: '430px', height:'122px', display: 'flex'}}>
            <div style={{width:'45px', height: '23px', marginTop:'15px', marginLeft:'27px', marginRight:'31px', borderBottom: 'solid #EEEEEE'}}>김정묵</div>
            <input style={{width: '298px', height:'52px', marginTop:'15px',borderBottom: 'solid #EEEEEE'}} value={value}
            onChange={onChangeValue}></input>
        </div>
        <div style={{width:'430px', height:'30px', textAlign:'center', backgroundColor:'#7BAB6E',paddingTop:'10px'}} 
        onClick = {() => ValueChange(id, value)}>수정완료하기</div>
            </ModifyStyle>
    )
}

export default ModifyBar;