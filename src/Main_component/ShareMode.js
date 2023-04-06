import React, {useState} from "react";
import styled from "styled-components";
import share_cancel from "../images/share_cancel.svg";
import share_move from "../images/share_move.svg"
import MoveLogo from "./MoveLogo";

const BoxContainer = styled.div`
    margin-left : 24px;
    margin-top: 20px;
    width: 184px;
    height: 63px;
    display: flex;
    justify-content : center;
    align-items : center;
    border : 1px solid #7BAB6E;
    border-radius: 16px;
`;

const ShareClickLogo = styled(MoveLogo)``;


const ShareMode = ({onMove, onShare, onCheck ,isShare}) =>{
    const [cancel_toggle, setCancle_toggle] = useState(true);

    const onCancle = () =>{
        setCancle_toggle(!cancel_toggle);
        onMove();
        if(isShare){
           onCheck();
        }
    } 

    return(
        cancel_toggle && <div style={{display: "flex", width:"430px", height:"153px", border:"none", position: "absolute" 
        , bottom: '-168px', backgroundColor:"white", borderRadius:"24px 24px 0px 0px"}}>
            <BoxContainer onClick={() => onCancle()}>취소하기<ShareClickLogo style={{marginLeft: '20px'}} src={share_cancel}/></BoxContainer>
            <BoxContainer onClick={() => onShare()}>공유하기<ShareClickLogo style={{marginLeft: '20px'}}src={share_move}/></BoxContainer>
        </div>
    )
}

export default ShareMode;