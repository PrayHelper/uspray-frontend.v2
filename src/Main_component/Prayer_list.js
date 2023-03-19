import React from "react";
import Prayer_content from "./Prayer_content";
import styled from 'styled-components';
import Share from "./Share";
const Background =  styled.div`
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
    background-color:#EBF6E8;
`;

const Btn_element_prayer = styled.button`
    width: 38px;
    height: 18px;
    font-size: 10px;
    padding: 0px;
    border: none;
    background-color:#FFFFFF;
`;

const Prayer_content_style = styled.div`
    width: 382px;
    height : 257px;
    background-color: #FFFFFF;
    margin-right : 24px;
    margin-left : 24px;
    border-radius: 16px;
    border: 1px solid #7BAB6F;
`

function Prayer_list({prayer_content_, prayer_more_content_}){
    return(
        <div>
            <Background>
                <Top_content>
                    <Today_prayer>기도할게요</Today_prayer>
                    <Btn_set>
                        <Btn_element_day>날짜순</Btn_element_day>
                        <Btn_element_prayer>기도순</Btn_element_prayer>
                    </Btn_set>
                </Top_content>
                <Prayer_content_style>
                    {prayer_content_.map(content =>(
                        <Prayer_content content = {content}/>
                    ))}
                </Prayer_content_style>

                <Top_content>
                    <Today_prayer>기도했어요</Today_prayer>
                    <Btn_set>
                        <Btn_element_day>날짜순</Btn_element_day>
                        <Btn_element_prayer>기도순</Btn_element_prayer>
                    </Btn_set>
                </Top_content>
                <Prayer_content_style> 
                        {prayer_more_content_.map(content =>(
                            <Prayer_content content = {content}/>
                        ))}
                </Prayer_content_style>
                <Share></Share>
            </Background>
        </div>
    )
}


export default Prayer_list; 