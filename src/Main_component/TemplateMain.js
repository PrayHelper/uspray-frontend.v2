import React,{useRef, useState} from "react";
import styled from "styled-components";
import click_search from '../images/click_search.svg';
import Logo from "./Logo";
import DayButton from "./DayButton";
import BackgroundBright from "./BackgroundBright";
const BackGround = styled.div`
    min-width: 430px;
    width: 100%;
    background-color: 'white';
`;

const BackgroundInput = styled.div`
    display : flex;
    min-width: 430px;
    width: 100%;
    height: 12.88vh;
`;
const BtnSend = styled.button`
    marginTop: 65px;
    width: 31px;
    height : 31px;
    font-size: 1px;
    border: 1px solid #EBF7E8;
    border-radius: 6.26087px;
    transform: matrix(-1, 0, 0, 1, 0, 0);
`;

const SendImg = styled(Logo)`
    width: 16.21px;
    height: 16.94px;
    display: flex;
    justify-content: center;
    align-items: center;
`;



const TemplateMain = ({ children, onInsert}) =>{
    const text = "김정묵"
    const [visible, setVisible] = useState(false);
    const [value , setValue] = useState("");
    const [day , setDay] = useState(7);
    const widthChange = () =>{
        setVisible(!visible);
    }
    const dayInfo = (e) =>{
        setDay(e);
    }

    const onSubmit = () =>{
        if(day === 0){
            setVisible(!visible);
        }
        
    }
    const onChange = (e) =>{
        setValue(e.target.value);
    }
    const submit = () =>{
        setVisible(!visible);
        setValue("");
        onInsert(day, value);
        setDay(7);
    }
    const changeCheckTop = () =>{
        setVisible(false);
        setDay(7);
        setValue("");
    }
    return(
        <div>
            <BackgroundInput>
                <div style={{width: '10.47%', height:'2.49vh', marginLeft:'35px',marginTop:'70px', padding:'0px', minHeight:'23px', minWidth:'45px'}}>
                    <div style={{width: '100%', height: '2.49vh', fontSize:'15px',
                    fontFamily:'Noto Sans KR',fontWeight:'400',color:"#75BD62", borderBottom:"1px solid #EBF7E8"}}>{text}
                    </div>
                </div>

                <div style={{width: '66.05%'}}>
                <input style={{marginLeft:'31px',marginTop:'70px',marginRight:'12px',width:"90.14%",height:"2.49vh" , padding:'0px',borderRadius:'4px', border:'none',
                 color:'#A0A0A0', borderBottom: '1px solid #EBF7E8'}}
                placeholder="기도제목을 입력해주세요" type="text" value = {value} onChange={onChange}
                onClick={(!visible) ? ()=> widthChange() : onSubmit}></input>
                </div>
                <div style={{width:'7.21%', height:'3.36vh', marginTop:'61px', marginLeft:'12px', minHeight:'31px', minWidth:'31px'}}>
                    <BtnSend style={{backgroundColor:'white'}} onClick={() => submit()}><SendImg src={click_search}/></BtnSend>
                </div>
            </BackgroundInput>
            {visible && <DayButton dayInfo = {dayInfo}/>}
            {visible && <BackgroundBright onClick={changeCheckTop}/>}
            <BackGround>{children}</BackGround>
        </div>
    )
}

export default TemplateMain;