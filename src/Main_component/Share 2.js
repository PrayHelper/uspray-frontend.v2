import { height } from "@mui/system";
import React, {useState} from "react";
import {GiPlantSeed} from 'react-icons/gi'; 
import styled from "styled-components";
import Share_Logo from "./Share_Logo";
import share_img from "../images/share_img.svg";
import Share_mode from "./Share_mode";

const Share_img = styled(Share_Logo)``;

function Share(){
    const [share_toggle, setshare_toggle] = useState(false);
    const onMove = () =>{
        setshare_toggle(!share_toggle);
    }
    return(
        <div>
            <div className="share_img" style={{height:"48px", width:"48px", marginLeft:"350px",
            marginTop:"35px", borderRadius:"50%", border:"none", backgroundColor:"white"}}
            onClick={() => onMove()}><Share_img src={share_img}/></div>
            {share_toggle && <Share_mode onMove={onMove}/>}
        </div>
    )
}

export default Share;