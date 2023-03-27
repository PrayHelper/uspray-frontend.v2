import React from "react";
import styled from "styled-components";
import Share_Logo from "./Share_Logo";
import share_img from "../images/share_img.svg";
import Share_mode from "./Share_mode";
import Background_bright from "./Background_bright";

const Share_img = styled(Share_Logo)``;

function Share({onShare, onMove , share_toggle, onCheck, isShare}){
    return(
        <div>
            <div className="share_img" style={{height:"56px", width:"56px", marginLeft:"350px",
            marginTop:"35px",marginBottom:"72px", borderRadius:"50%", border:"none", backgroundColor:"white"}}
            onClick={() => onMove()}><Share_img src={share_img}/></div>
            {share_toggle && <Share_mode onMove={onMove} onShare={onShare} onCheck={onCheck} isShare={isShare}/>}
        </div>
    )
}

export default Share;