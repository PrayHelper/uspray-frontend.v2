import React from "react";
import styled from "styled-components";
import Share_Logo from "./ShareLogo";
import share_img from "../../images/share_img.svg";
import ShareMode from "./ShareMode";

const ShareImg = styled(Share_Logo)``;

function Share({onShare, onMove , shareToggle, onCheck, isShare}){
    return(
        <div style={{display:"flex", justifyContent:'flex-end', marginTop:"38px", marginBottom:"24px", marginRight:"24px"}}>
            {!shareToggle && <ShareImg src={share_img}/>}
            {shareToggle && <ShareMode onMove={onMove} onShare={onShare} onCheck={onCheck} isShare={isShare}/>}
        </div>
    )
}

export default Share;

