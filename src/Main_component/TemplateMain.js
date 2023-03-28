import React,{useRef, useState} from "react";
import styled from "styled-components";
import click_search from '../images/click_search.svg';
import Logo from "./Logo";
import DayButton from "./DayButton";
import BackgroundBright from "./BackgroundBright";


const BackGround = styled.div`
    width: 100ww;
    height : 822px;
    background-color: 'white';
`;

const BackgroundInput = styled.div`
    display : flex;
    width: 430px;
    height: 120px;
    margin-left : auto;
    margin-right : auto;
`;
const BtnSend = styled.button`
    marginTop: 65px;
    width: 31px;
    height : 31px;
    font-size: 1px;
    border: 1px solid #EBF7E8;
`;

const SendImg = styled(Logo)`
    width: 16.21px;
    height: 16.94px;
`;


const TemplateMain = ({ children, onInsert}) =>{
    const text = "김정묵"
    const input_handle = useRef(null);
    const [visible, setVisible] = useState(false);
    const [value , setValue] = useState("");
    const [day , setDay] = useState(0);
    const WidthChange = () =>{
        setVisible(!visible);
    }
    const DayInfo = (e) =>{
        setDay(e);
    }

    const onSubmit = () =>{
        console.log("hi");
    }
    const onChange = (e) =>{
        setValue(e.target.value);
    }
    const Submit = () =>{
        setVisible(!visible);
        setValue("");
        onInsert(day, value);
        setDay(0);
    }
    const changeCheckTop = () =>{
        setVisible(!visible);
    }
    return(
        <div>
            <BackgroundInput ref={input_handle}>
                <div style={{width: '67px', height:'23px', marginLeft:'24px',marginTop:'72px', padding:'0px'}}>
                    <div style={{display:"grid", placeItems:"center", width: '67px', height: '23px', fontSize:'16px',fontFamily:'Noto Sans KR',fontWeight:'400',color:"#75BD62"}}>{text}</div>
                </div>
                <input style={{marginLeft:"16px",width:"256px", height:"23px" , marginTop:'72px', padding:'0px', marginRight:'12px',borderRadius:'4px', border:'none', color:'#B7CEB0'}}
                placeholder="기도제목을 입력해주세요" type="text" value = {value} onChange={onChange}
                onClick={(day === 0) ? ()=> WidthChange() : onSubmit}></input>
                <div style={{width:'31px', height:'31px', marginTop:'72.03px'}}>
                    <BtnSend style={{backgroundColor:'white'}} onClick={() => Submit()}><SendImg src={click_search}/></BtnSend>
                </div>
            </BackgroundInput>
            {visible && <DayButton DayInfo = {DayInfo}/>}
            {visible && <BackgroundBright onClick={changeCheckTop}/>}
            <BackGround>{children}</BackGround>
        </div>
    )
}

export default TemplateMain;