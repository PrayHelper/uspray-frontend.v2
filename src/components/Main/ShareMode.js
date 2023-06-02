import React, {useState} from "react";
import styled from "styled-components";
import share_cancel from "../../images/ic_share_cancel.svg";
import share_move from "../../images/ic_share_move.svg"
import MoveLogo from "./MoveLogo";

const BoxContainer = styled.div`
    margin-top: 20px;
    width: 47%;
    height: 63px;
    display: flex;
    justify-content : center;
    align-items : center;
    margin-bottom: 12px;
    border : 1px solid #7BAB6E;
    border-radius: 16px;
    color: ##7BAB6E;
`;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    width : 100%;
    position: fixed; 
    top:1;
    bottom: 0;
    right: 0;
    left: 0;
    heigth: 128px;
    border: none;
    background-color : white;
    border-radius: 24px 24px 0px 0px;
    z-index : 1001;
    padding-right: 24px;
    padding-left: 24px;
    box-sizing : border-box;
`
const ShareClickLogo = styled(MoveLogo)``;


const ShareMode = ({onMove, onShare, onCheck ,isShare}) =>{
    const [cancelToggle, setCancleToggle] = useState(true);

    const onCancle = () =>{
        setCancleToggle(!cancelToggle);
        onMove();
        if(isShare){
            console.log("onCheck");
            onCheck();
        }
    } 
    return(
        cancelToggle && <Container>
            <BoxContainer onClick={() => onCancle()}>취소하기<ShareClickLogo style={{height:'14px', width:'14px',marginLeft: '20px'}} src={share_cancel}/></BoxContainer>
            <BoxContainer style={{background:'#7BAB6E', color:'#FFFFFF'}}onClick={() => onShare()}>공유하기<ShareClickLogo style={{marginLeft: '20px', backgroundColor:'#FFFFF'}}src={share_move}/></BoxContainer>
        </Container>
    )
}

export default ShareMode;