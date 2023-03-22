import React, {useState} from "react";
import styled from "styled-components";
import share_cancel from "../images/share_cancel.svg";
import share_move from "../images/share_move.svg"
import MoveLogo from "./MoveLogo";

const Box_container = styled.div`
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

const Share_click_logo = styled(MoveLogo)``;


const Share_mode = ({onMove}) =>{
    const [cancel_toggle, setCancle_toggle] = useState(true);

    const onCancle = () =>{
        setCancle_toggle(!cancel_toggle);
        onMove();
    } 

    const onShare = () =>{
        
    }
    return(
        cancel_toggle && <div style={{display: "flex", width:"430px", height:"90px", border:"none", position: "absolute" 
        , bottom: '-60px', backgroundColor:"white", borderRadius:"24px 24px 0px 0px"}}>
            <Box_container onClick={() => onCancle()}>취소하기<Share_click_logo style={{marginLeft: '20px'}} src={share_move}/></Box_container>
            <Box_container onClick={() => onShare()}>공유하기<Share_click_logo style={{marginLeft: '20px'}}src={share_cancel}/></Box_container>
        </div>
    )
}

export default Share_mode;