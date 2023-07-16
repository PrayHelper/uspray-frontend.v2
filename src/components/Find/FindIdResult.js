import React, { useState } from "react";
import UserHeader from "../UserHeader";
import Button, { ButtonSize, ButtonTheme } from "../Button/Button";
import FindButton from "./FindButton/FindButton";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import serverapi from "../../api/serverapi";
import { set } from "date-fns";

const Box = styled.div`
    display: flex;
    justify-content: center;
    height: auto;
    margin: 0 16px; 
    margin-top : 22px;
    margin-bottom: 12px;
    border-bottom : 1px solid #D0E8CB;
    contents-align: center;
    `
  const BoxSetting = styled.div`
    color: #7BAB6E;
    text-align: center;
    margin-bottom: 16px;

    font-family: Noto Sans KR;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  `
  
const FindIdResult = () => {
  // const location = useLocation();
  // const userInfo = location.state.userInfo;
  const navigate = useNavigate();
  const result = useLocation();
  const [text, setText]= useState("");

  // const isAllValid = 
  //   !invalidUserInfo

  const showId = async () => {
    const api = "/user/find/id";
    const data = {
      name: result.state.userInfo.name,
      phone: result.state.userInfo.phoneNumber.replace(/-/g, "")
    };
    try {
      const res = await serverapi.post(api, data);
      if (res.status === 200) {
        setText(data.name+"님의 아이디는 "+res.data.message+"입니다.");
        console.log(res.data);
      }
    } catch (err) {
        setText("해당 정보와 일치하는 유저가 없습니다.");
      console.log(data);
      console.log(err);
    }
  }

  useEffect(() => {
    showId();
  }, []);
  

  return (
    <div>
      <UserHeader children={"아이디 찾기"}/>
        <Box>
          <BoxSetting>{text}</BoxSetting>
        </Box>
        
        <Link to="/findPW" style={{ textDecoration: "none" }}>
          <FindButton
            children={"비밀번호 찾기"}
            buttonSize={ButtonSize.LARGE}
            buttonTheme={ButtonTheme.RED}
          />
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button
            buttonSize={ButtonSize.LARGE}
            buttonTheme={ButtonTheme.GREEN}
          >
            메인화면으로 이동          
          </Button>
        </Link>
    </div>
  );
};

export default FindIdResult;