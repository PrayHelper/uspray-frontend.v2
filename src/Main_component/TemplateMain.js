import React,{useRef, useState} from "react";
import styled from "styled-components";
import click_search from '../images/click_search.svg';
import Logo from "./Logo";
import DayButton from "./DayButton";
import BackgroundBright from "./BackgroundBright";
const BackGround = styled.div`
    width: 100%;
    min-height: 822px;
    background-color: 'white';
`;

const BackgroundInput = styled.div`
    display : flex;
    width: 100%;
    height: 120px;
    margin-left : auto;
    margin-right : auto;
    box-shadow: 0px -2px rgba(0, 0, 0, 0.25);
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


const BarHeight = styled.div`
    width: 67px;
    height: 1px;
    background: #EBF7E8;
    borderRadius: 4px;
`

const TemplateMain = ({ children, onInsert}) =>{
    const text = "김정묵"
    const input_handle = useRef(null);
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
            <BackgroundInput ref={input_handle}>
                <div style={{width: '67px', height:'23px', marginLeft:'24px',marginTop:'72px', padding:'0px'}}>
                    <div style={{display:"grid", placeItems:"center", width: '67px', height: '23px', fontSize:'16px',
                    fontFamily:'Noto Sans KR',fontWeight:'400',color:"#75BD62"}}>{text}
                    <BarHeight/></div>
                </div>
                <div>
                <input style={{marginLeft:"16px",width:"256px", height:"23px" , marginTop:'70px', padding:'0px', marginRight:'12px',borderRadius:'4px', border:'none', color:'#A0A0A0'}}
                placeholder="기도제목을 입력해주세요" type="text" value = {value} onChange={onChange}
                onClick={(!visible) ? ()=> widthChange() : onSubmit}></input>
                <BarHeight style={{width: '256px', marginLeft:'3px'}}></BarHeight>
                </div>
                <div style={{width:'31px', height:'31px', marginTop:'65px'}}>
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