import React from "react";
import styled from "styled-components";
import Share_Logo from "./ShareLogo";
import share_img from "../images/share_img.svg";
import ShareMode from "./ShareMode";

const ShareImg = styled(Share_Logo)``;

function Share({onShare, onMove , share_toggle, onCheck, isShare}){
    return(
        <div>
            {!share_toggle && <div className="share_img" style={{height:"56px", width:"56px", marginLeft:"350px",
            marginTop:"38px",marginBottom:"72px", borderRadius:"50%", border:"none", backgroundColor:"white"}}
            onClick={() => onMove()}><ShareImg src={share_img}/></div>}
            {share_toggle && <ShareMode onMove={onMove} onShare={onShare} onCheck={onCheck} isShare={isShare}/>}
        </div>
    )
}

export default Share;