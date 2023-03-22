import React, { useState } from "react";
import styled from "styled-components";

const Modify_style = styled.div`
    width: 430px;
    height : 200px;
    position: absolute;
    bottom: -55px;
    background-color: #FFFFFF;
    border: solid;
`;

const Modify_bar = ({id, value_Change}) =>{
    const [value , setValue] = useState("");
    const onChange_value = (e) =>{
        setValue(e.target.value);
    }
    return(
        <Modify_style><div style={{width: '430px', height:'38px', borderBottom: 'solid #EEEEEE'}}></div>
        <div style={{width: '430px', height:'122px', display: 'flex'}}>
            <div style={{width:'45px', height: '23px', marginTop:'15px', marginLeft:'27px', marginRight:'31px', borderBottom: 'solid #EEEEEE'}}>김정묵</div>
            <input style={{width: '298px', height:'52px', marginTop:'15px',borderBottom: 'solid #EEEEEE'}} value={value}
            onChange={onChange_value}></input>
        </div>
        <div style={{width:'430px', height:'30px', textAlign:'center', backgroundColor:'#7BAB6E',paddingTop:'10px'}} 
        onClick = {() => value_Change(id, value)}>수정완료하기</div>
            </Modify_style>
    )
}

export default Modify_bar;