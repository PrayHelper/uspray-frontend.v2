import React,{ useState} from "react";
import styled from "styled-components";
import click_search from '../../images/click_search.svg';
import Logo from "./Logo";
import DayButton from "./DayButton";
import BackgroundBright from "./BackgroundBright";
const BackGround = styled.div`
    width: 100%;
`;

const BackgroundInput = styled.div`
    display : flex;
    position : relative;
    justify-content: space-evenly;
    width: 100%;
    padding-left: 10px;
    // margin-bottom: 15px;
    background: white;
    height: 120px;
    z-index: 1000;  
    border-bottom: 1px solid white;
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
    transform: scaleX(-1);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyleInput = styled.input`
    margin-top: 64px;
    width: 90.14%;
    height:27px;
    margin-left: 5px;
    border-radius:4px;
    border : none;
    font-size: 16px;                 
    color: #A0A0A0; 
    outline: none;
    border-bottom: 1px solid #EBF7E8;
    ::placeholder {
        color: #B7CEB0; // 원하는 색상으로 변경
    }
`
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
        console.log(day);
        onInsert(day, value);
        setDay(7);
    }
    const changeCheckTop = () =>{
        setVisible(false);
        setDay(7);
        setValue("");
    }
    return(
        <div style={{width:"100%", height:"923px"}}>
            <BackgroundInput>
                <div style={{width: '45px', height:'23px',marginTop:'70px', padding:'0px'}}>
                    <div style={{width: '100%', height: '23px', fontSize:'14px',
                    fontFamily:'Noto Sans KR',fontWeight:'400',color:"#75BD62", borderBottom:"1px solid #EBF7E8"}}>{text}
                    </div>
                </div>

                <div style={{width: '264px'}}>
                <StyleInput placeholder="기도제목을 입력해주세요" type="text" value = {value} onChange={onChange}
                onClick={(!visible) ? ()=> widthChange() : onSubmit}></StyleInput>
                </div>
                <div style={{width:'31px', height:'31px', marginTop:'65px',marginRight:"10px",minHeight:'31px', minWidth:'31px'}}>
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

