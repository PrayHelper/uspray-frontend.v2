import { height } from "@mui/system";
import React from "react";
import {GiPlantSeed} from 'react-icons/gi'; 
import styled from "styled-components";
import Share_Logo from "./Share_Logo";
import share_img from "../images/share_img.svg";


const Share_img = styled(Share_Logo)``;

function Share(){
    return(
        <div className="share_img" style={{height:"48px", width:"48px", marginLeft:"350px",
         marginTop:"35px", borderRadius:"50%", border:"solid", backgroundColor:"white"}}><Share_img src={share_img}/></div>
    )
}

export default Share;