import React,{useRef, useState} from "react";
import styled from "styled-components";
import click_search from '../images/click_search.svg';
import Logo from "./Logo";
import Day_Button from "./Day_Button";
import Background_bright from "./Background_bright";


const BackGround = styled.div`
    width: 100ww;
    height : 822px;
    background-color: 'white';
`;

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


const Template_main = ({ children, onInsert}) =>{
    const text = "김정묵"
    const input_handle = useRef(null);
    // const Back_handle = useRef(null);
    const [visible, setVisible] = useState(false);
    const [value , setValue] = useState("");
    const [day , setDay] = useState(0);
    const Width_change = () =>{
        setVisible(!visible);
    }
    const day_info = (e) =>{
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
    const change_Check_top = () =>{
        setVisible(!visible);
    }
    return(
        <div>
            <Background_input ref={input_handle}>
                <div style={{width: '67px', height:'23px', marginLeft:'24px',marginTop:'72px', padding:'0px'}}>
                    <div style={{display:"grid", placeItems:"center", width: '67px', height: '23px', fontSize:'16px',fontFamily:'Noto Sans KR',fontWeight:'400',color:"#75BD62"}}>{text}</div>
                </div>
                <input style={{marginLeft:"16px",width:"256px", height:"23px" , marginTop:'72px', padding:'0px', marginRight:'12px',borderRadius:'4px', border:'none', color:'#B7CEB0'}}
                placeholder="기도제목을 입력해주세요" type="text" value = {value} onChange={onChange}
                onClick={(day == 0) ? ()=> Width_change() : onSubmit}></input>
                <div style={{width:'31px', height:'31px', marginTop:'72.03px'}}>
                    <Btn_send style={{backgroundColor:'white', border:'none'}} onClick={() => Submit()}><Send_img src={click_search}/></Btn_send>
                </div>
            </Background_input>
            {visible && <Day_Button day_info = {day_info}/>}
            {visible && <Background_bright onClick={change_Check_top}/>}
            <BackGround>{children}</BackGround>
        </div>
    )
}

export default Template_main;