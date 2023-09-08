import React from "react";
import styled from "styled-components";
import Share_Logo from "./ShareLogo";
import share_img from "../../images/share_img.svg";
import ShareMode from "./ShareMode";

const ShareImg = styled(Share_Logo)`
    position: fixed;
    right: 24px;
    bottom: 72px;
    border-radius: 50%;
    box-shadow: 0px 4px 8px #00000080;
    z-index : 4;
`;
const Container = styled.div`
    display : flex;
    flex-direction: row-reverse;
    width: 100%;
    height: 128px;
    // position: relative;
    margin-top: 38px;
    // margin-top : 98px;
    margin-bottom: 40px;
    z-index: 6;
`
function Share({onShare, onMove , shareToggle, onCheck, isShare, shareLength, setshareToggle}){
    return(
        <Container style={{zIndex : shareToggle ? "10000" : "4"}}>
            {!shareToggle && <ShareImg  onClick={onMove} src={share_img}/>}
            <ShareMode onMove={onMove} onShare={onShare} onCheck={onCheck} isShare={isShare} 
            shareLength = {shareLength} shareToggle ={shareToggle} setshareToggle ={setshareToggle}/>
        </Container>
    )
}

export default Share;

