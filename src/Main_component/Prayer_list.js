import React, {useState} from "react";
import Prayer_content from "./Prayer_content";
import styled from 'styled-components';
import Share from "./Share";
const Background =  styled.div`
    margin-top : 24px;
    height : 773px;
    width  : 430px; 
    background-color: #D0E8CB;
`

const Top_content = styled.div`
    display: flex;
    margin-left : 32px;
    padding-top : 44px;
`;

const Today_prayer = styled.div`
    width : 65px;
    height : 17px;
    font-size: 12px;
    margin-right : 222px;
    color: #7BAB6E;
`;
const Btn_set = styled.div`
    display: flex;
    justify-content: center;
    align-items:center;
    width: 88px;
    height: 26px;
    margin-bottom: 8px;
    background-color:#7BAB6E;
`;

const Btn_element_day = styled.button`
    width: 38px;
    height: 18px;
    font-size: 10px;
    padding: 0px;
    border: none;
`;

const Btn_element_prayer = styled.button`
    width: 38px;
    height: 18px;
    font-size: 10px;
    padding: 0px;
    border: none;
`;

const Prayer_content_style = styled.div`
    width: 382px;
    height : 257px;
    background-color: #FFFFFF;
    margin-right : 24px;
    margin-left : 24px;
    border-radius: 16px;
    border: 1px solid #7BAB6F;
    overflow : auto;
`

function Prayer_list({prayer_content_, prayer_more_content_}){
    const [day_toggle_top_day , setDay_toggle_top_day] = useState(true);
    const [day_toggle_top_prayer , setDay_toggle_top_prayer] = useState(false);
    const [day_toggle_bottom_day , setDay_toggle_bottom_day] = useState(true);
    const [day_toggle_bottom_prayer , setDay_toggle_bottom_prayer] = useState(false);
    const [color_first, setColor_first] = useState('#EBF6E8');
    const [color_second, setColor_second] = useState('#FFFFFF');


    const day_fuc_top_day = (e) =>{
        if(!day_toggle_top_day){
            setDay_toggle_top_day(!day_toggle_top_day);
            setDay_toggle_top_prayer(!day_toggle_top_prayer);
            setColor_second('#EBF6E8');
            setColor_first('#FFFFFF');
        }
    }
    const day_fuc_top_prayer = () =>{
        if(!day_toggle_top_prayer){
            setDay_toggle_top_prayer(!day_toggle_top_prayer);
            setDay_toggle_top_day(!day_toggle_top_day);
            setColor_first('#EBF6E8');
            setColor_second('#FFFFFF');
        }
    }

    const day_fuc_bottom_day = () =>{
        if(!day_toggle_bottom_day){
            setDay_toggle_bottom_day(!day_toggle_bottom_day);
            setDay_toggle_bottom_prayer(!day_toggle_bottom_prayer);
        }
    }
    const day_fuc_bottom_prayer = () =>{
        if(!day_toggle_bottom_prayer){
            setDay_toggle_bottom_prayer(!day_toggle_bottom_prayer);
            setDay_toggle_bottom_day(!day_toggle_bottom_day);
        }
    }
    return(
        <div>
            <Background>
                <Top_content>
                    <Today_prayer>기도할게요</Today_prayer>
                    <Btn_set>
                        <Btn_element_day onClick={day_fuc_top_day} style={{backgroundColor: color_first}}>날짜순</Btn_element_day>
                        <Btn_element_prayer onClick={day_fuc_top_prayer} style={{backgroundColor : color_second}} >기도순</Btn_element_prayer>
                    </Btn_set>
                </Top_content>
                <Prayer_content_style>
                    {prayer_content_.map(content =>(
                        <Prayer_content content = {content} day_toggle ={day_toggle_top_day}/>
                    ))}
                </Prayer_content_style>

                <Top_content>
                    <Today_prayer>기도했어요</Today_prayer>
                    <Btn_set>
                        <Btn_element_day onClick={day_fuc_bottom_day}>날짜순</Btn_element_day>
                        <Btn_element_prayer onClick={day_fuc_bottom_prayer}>기도순</Btn_element_prayer>
                    </Btn_set>
                </Top_content>
                <Prayer_content_style> 
                        {prayer_more_content_.map(content =>(
                            <Prayer_content content = {content} day_toggle ={day_toggle_bottom_day}/>
                        ))}
                </Prayer_content_style>
                <Share></Share>
            </Background>
        </div>
    )
}


export default Prayer_list; 