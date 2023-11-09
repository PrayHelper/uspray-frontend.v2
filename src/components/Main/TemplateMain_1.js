import React,{ useEffect, useState} from "react";
import styled from "styled-components";
import DayButton from "./DayButton";
import BackgroundBright from "./BackgroundBright";
import { useGetInfo } from "../../hooks/useGetInfo";
import { ToastTheme } from "../Toast/Toast";
import useToast from "../../hooks/useToast";

const BackgroundInput = styled.div`
    display : flex;
    position : relative;
    padding: 24px 16px 22px 0px;
    box-sizing: border-box;
    align-items : center;
    z-index: 103;
    transition: all 0.5s ease-in-out;
`;

const StyleInput = styled.input`
    border : none;
    width : 100%;
    font-size: 16px;    
    padding : 16px 0px 12px 16px;
    border-radius : 12px;           
    color: #A0A0A0; 
    outline: none;
    border-bottom: 1px solid #EBF7E8;
    ::placeholder {
        color: #B7CEB0; // 원하는 색상으로 변경
    }
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`

const TemplateMain_1 = ({ children, onInsert, shareToggle, setshareToggle, isShare, setIsShare}) =>{
    const {data: userInfo, refetch: refetch_userInfo} = useGetInfo();
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [value , setValue] = useState("");
    const [day , setDay] = useState(7);
    const [Toggle, setToggle] = useState(true);
    const [updateDate, setUpdateDate] = useState(null);
    const [dayToggle, setDayToggle] = useState(false);
    const [modalText, setmodalText] = useState("");
    const [modalToggle, setmodalToggle] = useState(false);
    const { showToast } = useToast({});

    const widthChange = () =>{
        setVisible(!visible);
        if(shareToggle){
            setshareToggle(!shareToggle)
            setIsShare(!isShare)
        }
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
        if(e.target.value.length < 75){        
            setValue(e.target.value);
        }else{
            setmodalText("75자까지 입력이 가능합니다.")
            setmodalToggle(!modalToggle);
        }
    }
    const onName = (e) =>{
        if(e.target.value.length < 5){
        setName(e.target.value);
        }
    }
    const submit = () =>{
        setVisible(!visible);
        setValue("");
        onInsert(name, day, value);
        setDay(7);
        setDayToggle(false);
        setUpdateDate(null);
    }
    const changeCheckTop = () =>{
        setVisible(!visible);
        if(Toggle == false){
            setToggle(!Toggle);
        }
    }

    useEffect(()=>{
        if(!userInfo){
            refetch_userInfo();
            return;
        }
        setName(userInfo.data.name)
    },[userInfo])
    
    useEffect(() => {
        if (modalText) {
          const timer = setTimeout(() => {
            setmodalToggle(false);
            setmodalText("");
          }, 5000);
          return () => clearTimeout(timer);
        }
      }, [modalText]);
    
      useEffect(() => {
        if (modalToggle){
          showToast({ theme: ToastTheme.SUCCESS, message: modalText });
        }
      }, [modalToggle]);
    
    return(
        <div style={{width:"100%", backgroundColor: "#7BAB6E"}}>
            <div style={{position:"relative", padding : "40px 0px 0px 16px", fontFamily: "Noto Sans KR",
            fontStyle: "normal", fontWeight: "700", lineHeight: "normal"}}>
                <div style={{display: "flex", fontSize: "24px"}}>
                <div style={{color : "#7BD962"}}>{name}</div>
                <div style={{color : "#FFF"}}>님이</div>
                </div>
                <div style={{display : "flex"}}> 
                <div style={{color: "#7BD962"}}>시립대학교 모임</div>
                <div style={{color : "#FFF"}}>에 참여했습니다</div>    
                </div>
                <BackgroundInput>
                    <StyleInput placeholder="기도제목을 입력해주세요" type="text" value = {value} onChange={onChange}
                    onClick={(!visible) ? ()=> widthChange() : onSubmit()}></StyleInput>
                </BackgroundInput>
                <DayButton dayInfo = {dayInfo} visible={visible} dayToggle = {dayToggle} setDayToggle = {setDayToggle}
                updateDate = {updateDate} setUpdateDate = {setUpdateDate}/>
            </div>
            <BackgroundBright onClick={changeCheckTop} style={{opacity : visible ? "1" : "0", pointerEvents: visible ? "auto" : "none"}}/>
            {children}
        </div>
    )
}

export default TemplateMain_1;

