import React, {useState, useEffect} from "react";
import Prayer_content from "./Prayer_content";
import styled from 'styled-components';
import Bottom_menu from "./Bottom_menu";
import Share from "./Share";
import Modify_bar from "./Modify_bar";
import Background_bright from "./Background_bright";
const Background =  styled.div`
    height : 882px;
    width  : 430px; 
    background-color: #D0E8CB;
`

const Top_content = styled.div`
    display: flex;
    margin-left : 32px;
`;

const Today_prayer = styled.div`
    width : 65px;
    height : 17px;
    font-size: 12px;
    margin-top : 44px;
    margin-bottom: 13px;
    margin-right : 220px;
    color: #7BAB6E;
`;
const Btn_set = styled.div`
    display: flex;
    justify-content: center;
    align-items:center;
    width: 88px;
    height: 26px;
    margin-bottom: 8px;
    margin-top : 40px;
    background-color:#7BAB6E; 
    border : none;
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
    margin-right: 16px;
    margin-left: 16px;
    overflow: scroll;
`


function Prayer_list({prayer_content, prayer_more_content, Count_update, Complete_btn_click, 
    Modify_btn_click, Delete_btn_click, isChecked, click_id, Content_click, isModify,
    value_Change,change_Check}){
    const [day_toggle_top_day , setDay_toggle_top_day] = useState(true);
    const [day_toggle_top_prayer , setDay_toggle_top_prayer] = useState(false);
    const [day_toggle_bottom_day , setDay_toggle_bottom_day] = useState(true);
    const [day_toggle_bottom_prayer , setDay_toggle_bottom_prayer] = useState(false);
    const [color_first_top, setColor_first_top] = useState('#EBF6E8');
    const [color_second_top, setColor_second_top] = useState('#FFFFFF');
    const [color_first_bottom, setColor_first_bottom] = useState('#EBF6E8');
    const [color_second_bottom, setColor_second_bottom] = useState('#FFFFFF');
    const [isShare, setIsShare] = useState(false);
    const [Share_list, setShare_list] = useState([]);
    const [share_toggle, setshare_toggle] = useState(false);

    const day_fuc_top_day = (e) =>{
        if(!day_toggle_top_day){
            setDay_toggle_top_day(!day_toggle_top_day);
            setDay_toggle_top_prayer(!day_toggle_top_prayer);
            setColor_second_top('#FFFFFF');
            setColor_first_top('#EBF6E8');
        }
    }
    const day_fuc_top_prayer = () =>{
        if(!day_toggle_top_prayer){
            setDay_toggle_top_prayer(!day_toggle_top_prayer);
            setDay_toggle_top_day(!day_toggle_top_day);
            setColor_first_top('#FFFFFF');
            setColor_second_top('#EBF6E8');
        }
    }

    const day_fuc_bottom_day = () =>{
        if(!day_toggle_bottom_day){
            setDay_toggle_bottom_day(!day_toggle_bottom_day);
            setDay_toggle_bottom_prayer(!day_toggle_bottom_prayer);
            setColor_second_bottom('#FFFFFF');
            setColor_first_bottom('#EBF6E8');
        }
    }
    const day_fuc_bottom_prayer = () =>{
        if(!day_toggle_bottom_prayer){
            setDay_toggle_bottom_prayer(!day_toggle_bottom_prayer);
            setDay_toggle_bottom_day(!day_toggle_bottom_day);
            setColor_first_bottom('#FFFFFF');
            setColor_second_bottom('#EBF6E8');
        }
    }

    const onShare = () =>{
        if(Share_list.length === 0){
            for(let i=0;i<prayer_content.length;i++){
                prayer_content[i].checked = false;
            }
            for(let i=0;i<prayer_more_content.length;i++){
                prayer_more_content[i].checked = false;
            }
            console.log("여기 입장");
        }
        setIsShare(!isShare);
        if(isShare){
            setshare_toggle(!share_toggle);
            setIsShare(!isShare);
            console.log(Share_list);
            setShare_list([]);
        }
        else{
            console.log(Share_list);
        }
        console.log(prayer_content);
        console.log(prayer_more_content);
    }

    const onCheck = () =>{
        setIsShare(!isShare);
    }
    const onMove = () =>{
        setshare_toggle(!share_toggle);
    }

    const shareList = (id, check_box) =>{
        if(check_box){
            setShare_list([...Share_list,id]);
            if(id < 1000){
                prayer_content[Number(id)-1].checked = check_box;
            }
            else{
                prayer_more_content[Number(id)-1001].checked = check_box;
            }
        }
        else{
            setShare_list(Share_list.filter(list => (list !== id)));
            if(id < 1000){
                prayer_content[Number(id)-1].checked = check_box;
            }
            else{
                prayer_more_content[Number(id)-1001].checked = check_box;
            }
        }
        check_box = !check_box;
    }

    // console.log(prayer_more_content);

    return(
        <div>
            <Background>
                <Top_content>
                    <Today_prayer>기도할게요</Today_prayer>
                    <Btn_set>
                        <Btn_element_day onClick={day_fuc_top_day} style={{backgroundColor: color_first_top}}>날짜순</Btn_element_day>
                        <Btn_element_prayer onClick={day_fuc_top_prayer} style={{backgroundColor : color_second_top}} >기도순</Btn_element_prayer>
                    </Btn_set>
                </Top_content>
                <Prayer_content_style>
                    {prayer_content.map((content,index) =>(
                        <Prayer_content key={index} content = {content} day_toggle ={day_toggle_top_day} Count_update = {Count_update} Content_click = {Content_click} 
                        isShare={isShare} shareList={shareList} bottom={false}/>
                    ))}
                </Prayer_content_style>

                <Top_content>
                    <Today_prayer style={{marginTop:'46px'}}>기도했어요</Today_prayer>
                    <Btn_set>
                        <Btn_element_day onClick={day_fuc_bottom_day} style={{backgroundColor: color_first_bottom}}>날짜순</Btn_element_day>
                        <Btn_element_prayer onClick={day_fuc_bottom_prayer} style={{backgroundColor: color_second_bottom}}>기도순</Btn_element_prayer>
                    </Btn_set>
                </Top_content>
                <Prayer_content_style style={{marginTop:'0px', background:'#7BAB6E'}}> 
                        {prayer_more_content.map((content,index) =>(
                            <Prayer_content key={index} content = {content} day_toggle ={day_toggle_bottom_day} Count_update = {Count_update}
                            isShare = {isShare} shareList={shareList} bottom = {true} prayer_more_content={prayer_more_content}/>
                        ))}
                </Prayer_content_style>
                {!isModify && <Share onShare={onShare} onMove={onMove} share_toggle={share_toggle} onCheck={onCheck} isShare={isShare}></Share>}
                {isChecked && <Bottom_menu Complete_btn_click = {Complete_btn_click} Modify_btn_click = {Modify_btn_click} 
                Delete_btn_click = {Delete_btn_click} click_id = {click_id}></Bottom_menu>}
                {isChecked && <Background_bright style={{height:'779px', top:'30px'}} onClick={change_Check}></Background_bright>}
                {isModify  &&  <Modify_bar id ={click_id} value_Change = {value_Change}></Modify_bar>}
            </Background>
        </div>
    )
}


export default Prayer_list; 