import React, {useState} from "react";
import styled from "styled-components";
import share_cancel from "../../images/ic_share_cancel.svg";
import share_move from "../../images/ic_share_move.svg"
import MoveLogo from "./MoveLogo";

const BoxContainer = styled.div`
    margin-top: 8px;
    width: 47%;
    height: 63px;
    display: flex;
    justify-content : center;
    align-items : center;
    margin-bottom: 12px;
    border : 1px solid #7BAB6E;
    border-radius: 16px;
    color: #7BAB6E;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 23px;
`;

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    // justify-content: space-between;
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

const SubContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width : 100%;
    heigth: 75px;
    border: none;
`
const NumberContainer = styled.div`
    width: 43px;
    height: 17px;
    display : flex;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 17px;
    color: #7BAB6E;
`
const ShareClickLogo = styled(MoveLogo)``;


const ShareMode = ({onMove, onShare, onCheck ,isShare, shareLength}) =>{
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
        cancelToggle && <MainContainer>
            <div style={{display:"flex", justifyContent:"center"}}><div style={{display: "flex",width:"52px", height:'4px', paddingTop:"12px",borderBottom: "1px solid #F0F0F0"}} 
            onClick={() => onCancle()}></div></div>
            <div style={{display:"flex", flexDirection:"row-reverse"}}>
            {(shareLength == undefined) ? "" : <NumberContainer>{shareLength + "개 선택"}</NumberContainer>}</div>
            <SubContainer>
                <BoxContainer onClick={() => onCancle()}>취소하기<ShareClickLogo style={{height:'14px', width:'14px',marginLeft: '20px'}} src={share_cancel}/></BoxContainer>
                {(shareLength === 0) ? <BoxContainer style={{backgroundColor:"#D0E8CB", color:"#FFFFFF", border:"1px solid #FFFFFF"}}>공유하기<ShareClickLogo style={{marginLeft: "20px"}} src = {share_move}/></BoxContainer> 
                :<BoxContainer style={{background:'#7BAB6E', color:'#FFFFFF'}}onClick={() => onShare()}>공유하기<ShareClickLogo style={{marginLeft: '20px'}}src={share_move}/></BoxContainer>}
            </SubContainer>
        </MainContainer>
    )
}

export default ShareMode;