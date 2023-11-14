import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DayButton from "./DayButton";
import BackgroundBright from "./BackgroundBright";
import { useGetInfo } from "../../hooks/useGetInfo";
import { ToastTheme } from "../Toast/Toast";
import useToast from "../../hooks/useToast";

const BackgroundInput = styled.div`
    display : flex;
    position : relative;
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

const LogoTitle = styled.div`
    color: #fff;
    font-size: 24px;
    font-weight: bold;
`;

const MainComponent = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 16px 16px 24px 16px;
    gap: 16px;
`;


const TemplateMain = ({ children, onInsert, shareToggle, setshareToggle, isShare, setIsShare }) => {
    const { data: userInfo, refetch: refetch_userInfo } = useGetInfo();
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState("");
    const [day, setDay] = useState(7);
    const [Toggle, setToggle] = useState(true);
    const [updateDate, setUpdateDate] = useState(null);
    const [dayToggle, setDayToggle] = useState(false);
    const [modalText, setmodalText] = useState("");
    const [modalToggle, setmodalToggle] = useState(false);
    const { showToast } = useToast({});

    const widthChange = () => {
        setVisible(!visible);
        if (shareToggle) {
            setshareToggle(!shareToggle)
            setIsShare(!isShare)
        }
    }
    const dayInfo = (e) => {
        setDay(e);
    }

    const onSubmit = () => {
        if (day === 0) {
            setVisible(!visible);
        }

    }
    const onChange = (e) => {
        if (e.target.value.length < 75) {
            setValue(e.target.value);
        } else {
            setmodalText("75자까지 입력이 가능합니다.")
            setmodalToggle(!modalToggle);
        }
    }
    const onName = (e) => {
        if (e.target.value.length < 5) {
            setName(e.target.value);
        }
    }
    const submit = () => {
        setVisible(!visible);
        setValue("");
        onInsert(name, day, value);
        setDay(7);
        setDayToggle(false);
        setUpdateDate(null);
    }
    const changeCheckTop = () => {
        setVisible(!visible);
        if (Toggle == false) {
            setToggle(!Toggle);
        }
    }

    useEffect(() => {
        if (!userInfo) {
            refetch_userInfo();
            return;
        }
        setName(userInfo.data.name)
    }, [userInfo])

    // useEffect(() => {이부분 또한 토스트 메세지가 어떻게 될지 몰라 임시로 주석처리
    //     if (modalText) {
    //       const timer = setTimeout(() => {
    //         setmodalToggle(false);
    //         setmodalText("");
    //       }, 5000);
    //       return () => clearTimeout(timer);
    //     }
    //   }, [modalText]);

    // useEffect(() => {
    //     if (modalToggle) {
    //         showToast({theme: ToastTheme.SUCCESS, message: modalText });
    //     }
    // }, [modalToggle]);

    return (
        <div style={{ width: "100%", backgroundColor: "#7BAB6E" }}>
            <MainComponent>
                {/* <div style={{ display: "flex", fontSize: "24px" }}>
                    <div style={{ color: "#7BD962" }}>{name}</div>
                    <div style={{ color: "#FFF" }}>님이</div>
                </div>
                <div style={{ display: "flex" }}>
                    <div style={{ color: "#7BD962" }}>시립대학교 모임</div>
                    <div style={{ color: "#FFF" }}>에 참여했습니다</div>
                </div> */}
                <LogoTitle>
                    Uspray
                </LogoTitle>
                <BackgroundInput>
                    <StyleInput placeholder="기도제목을 입력해주세요" type="text" value={value} onChange={onChange}
                        onClick={(!visible) ? () => widthChange() : onSubmit()}></StyleInput>
                </BackgroundInput>
            </MainComponent>
            <BackgroundBright onClick={changeCheckTop} style={{ opacity: visible ? "1" : "0", pointerEvents: visible ? "auto" : "none" }} />
            {children}
        </div>
    )
}

export default TemplateMain;

