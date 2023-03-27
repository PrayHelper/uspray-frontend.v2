import React, {useState} from "react";
import PrayerContent from "./PrayerContent";
import styled from 'styled-components';
import BottomMenu from "./BottomMenu";
import Share from "./Share";
import ModifyBar from "./ModifyBar";
import BackgroundBright from "./BackgroundBright";

const Background =  styled.div`
    height : 882px;
    width  : 430px; 
    background-color: #D0E8CB;
`

const TopContent = styled.div`
    display: flex;
    margin-left : 32px;
`;

const TodayPrayer = styled.div`
    width : 65px;
    height : 17px;
    font-size: 12px;
    margin-top : 44px;
    margin-bottom: 13px;
    margin-right : 220px;
    color: #7BAB6E;
`;
const BtnSet = styled.div`
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

const BtnElementDay = styled.button`
    width: 38px;
    height: 18px;
    font-size: 10px;
    padding: 0px;
    border: none;
`;

const BtnElementPrayer = styled.button`
    width: 38px;
    height: 18px;
    font-size: 10px;
    padding: 0px;
    border: none;
`;

const PrayerContentStyle = styled.div`
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


function PrayerList({prayer_content, prayer_more_content, CountUpdate, CompleteBtnClick, 
    ModifyBtnClick, DeleteBtnClick, isChecked, click_id, ContentClick, isModify,
    ValueChange,ChangeCheck}){
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

    const DayFucTopDay = (e) =>{
        if(!day_toggle_top_day){
            setDay_toggle_top_day(!day_toggle_top_day);
            setDay_toggle_top_prayer(!day_toggle_top_prayer);
            setColor_second_top('#FFFFFF');
            setColor_first_top('#EBF6E8');
        }
    }
    const DayFucTopPrayer = () =>{
        if(!day_toggle_top_prayer){
            setDay_toggle_top_prayer(!day_toggle_top_prayer);
            setDay_toggle_top_day(!day_toggle_top_day);
            setColor_first_top('#FFFFFF');
            setColor_second_top('#EBF6E8');
        }
    }

    const DayFucBottomDay = () =>{
        if(!day_toggle_bottom_day){
            setDay_toggle_bottom_day(!day_toggle_bottom_day);
            setDay_toggle_bottom_prayer(!day_toggle_bottom_prayer);
            setColor_second_bottom('#FFFFFF');
            setColor_first_bottom('#EBF6E8');
        }
    }
    const DayFucBottomPrayer = () =>{
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

    const ShareList = (id, check_box) =>{
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
                <TopContent>
                    <TodayPrayer>기도할게요</TodayPrayer>
                    <BtnSet>
                        <BtnElementDay onClick={DayFucTopDay} style={{backgroundColor: color_first_top}}>날짜순</BtnElementDay>
                        <BtnElementPrayer onClick={DayFucTopPrayer} style={{backgroundColor : color_second_top}} >기도순</BtnElementPrayer>
                    </BtnSet>
                </TopContent>
                <PrayerContentStyle>
                    {prayer_content.map((content,index) =>(
                        <PrayerContent key={index} content = {content} day_toggle ={day_toggle_top_day} CountUpdate = {CountUpdate} ContentClick = {ContentClick} 
                        isShare={isShare} ShareList={ShareList} bottom={false}/>
                    ))}
                </PrayerContentStyle>

                <TopContent>
                    <TodayPrayer style={{marginTop:'46px'}}>기도했어요</TodayPrayer>
                    <BtnSet>
                        <BtnElementDay onClick={DayFucBottomDay} style={{backgroundColor: color_first_bottom}}>날짜순</BtnElementDay>
                        <BtnElementPrayer onClick={DayFucBottomPrayer} style={{backgroundColor: color_second_bottom}}>기도순</BtnElementPrayer>
                    </BtnSet>
                </TopContent>
                <PrayerContentStyle style={{marginTop:'0px', background:'#7BAB6E'}}> 
                        {prayer_more_content.map((content,index) =>(
                            <PrayerContent key={index} content = {content} day_toggle ={day_toggle_bottom_day} CountUpdate = {CountUpdate}
                            isShare = {isShare} ShareList={ShareList} bottom = {true} prayer_more_content={prayer_more_content}/>
                        ))}
                </PrayerContentStyle>
                {!isModify && <Share onShare={onShare} onMove={onMove} share_toggle={share_toggle} onCheck={onCheck} isShare={isShare}></Share>}
                {isChecked && <BottomMenu CompleteBtnClick = {CompleteBtnClick} ModifyBtnClick = {ModifyBtnClick} 
                DeleteBtnClick = {DeleteBtnClick} click_id = {click_id}></BottomMenu>}
                {isChecked && <BackgroundBright style={{height:'779px', top:'30px'}} onClick={ChangeCheck}></BackgroundBright>}
                {isModify  &&  <ModifyBar id ={click_id} ValueChange = {ValueChange}></ModifyBar>}
            </Background>
        </div>
    )
}


export default PrayerList; 