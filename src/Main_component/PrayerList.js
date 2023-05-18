import React, {useState} from "react";
import PrayerContent from "./PrayerContent";
import styled from 'styled-components';
import BottomMenu from "./BottomMenu";
import Share from "./Share";
import ModifyBar from "./ModifyBar";
import BackgroundBright from "./BackgroundBright";
import EmptySpace from "./EmptySpace";
import serverapi from "../api/serverapi";
import DeleteBar from "./DeleteBar";

const Background =  styled.div`
    width  : 100%;
    background-color: #D0E8CB;
    height:auto;
    min-height: 812px;
    min-width: 430px;
`

const TopContent = styled.div`
    display: flex;
    width: 100%;
    margin-left : 32px;
`;

const TodayPrayer = styled.div`
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 17px;
    margin-top : 44px;
    margin-bottom: 13px;
    margin-right : 220px;
    color: #7BAB6E;
`;
const BtnSet = styled.div`
    display: flex;
    justify-content: center;
    align-items:center;
    width: 20.465%;
    height: 2.82vh;
    margin-bottom: 8px;
    margin-top : 40px;
    background-color:#7BAB6E; 
    border : none;
`;

const BtnElementDay = styled.button`
    width: 43.182%;
    height: 1.95vh;
    font-size: 10px;
    padding: 0px;
    border: none;
`;

const BtnElementPrayer = styled.button`
    width: 43.182%;
    height: 1.95vh;
    font-size: 10px;
    padding: 0px;
    border: none;
`;

const PrayerContentStyle = styled.div`
    width: 88.84;
    background-color: #FFFFFF;
    margin-right : 24px;
    margin-left : 24px;
    margin-bottom: 8px;
    border-radius: 16px;
    border: 1px solid #7BAB6F;
    min-height: 244px;
`;


function PrayerList({prayerContent, setPrayerContent, prayerMoreContent, setPrayerMoreContent, countUpdate, completeBtnClick, bottom_delete_click, 
    modifyBtnClick, deleteBtnClick, isChecked, clickId, contentClick, isModify, onModify, isDeleted, onDeleted,
    valueChange,changeCheck, ddayCaculate}){
    const [dayToggleTopDay , setDayToggleTopDay] = useState(true);
    const [dayToggleTopPrayer , setDayToggleTopPrayer] = useState(false);
    const [dayToggleBottomDay , setDayToggleBottomDay] = useState(true);
    const [dayToggleBottomPrayer , setDayToggleBottomPrayer] = useState(false);
    const [colorFirstTop, setColorFirstTop] = useState('#EBF6E8');
    const [colorSecondTop, setColorSecondTop] = useState('#7BAB6E');
    const [colorFirstBottom, setColorFirstBottom] = useState('#EBF6E8');
    const [colorSecondBottom, setColorSecondBottom] = useState('#7BAB6E');
    const [isShare, setIsShare] = useState(false);
    const [Sharelist, setShareList] = useState([]);
    const [shareToggle, setshareToggle] = useState(false);
    const padding = (isChecked || isModify) ? "0px" : "24px";
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkzYWExZjhkLWI1NDEtNGZiNS1iODE3LTg2MDczYzQwODJiZCIsImFjY2Vzc190b2tlbl9leHAiOiIyMDIzLTA1LTE5VDExOjU4OjU0LjkxNjkzNCJ9.0tMdoq74Db065CbRK5QOWBO5pq6SihdMuwj4PMmOOdE";
    const getPrayList = async (query, complete) => {
        const api = "/pray?sort_by=" + query;
        try {
          const res= await serverapi.get(api,{ headers: {
            'Authorization': `${accessToken}`}});
          if (res.status === 200) {
            var prayer_content_ = [];
            var prayer_more_content_ = [];
            for(var i = 0;i<Object.keys(res.data.uncompleted).length;i++){
                var result = ddayCaculate(res.data.uncompleted[i].deadline);
                prayer_content_[i] = {
                  id : res.data.uncompleted[i].id,
                  name: '김정묵',
                  dday: result,
                  text: res.data.uncompleted[i].title,
                  checked : true,
                  count : res.data.uncompleted[i].pray_cnt
                };
              }
            for(var i = 0;i<Object.keys(res.data.completed).length;i++){
            var result = ddayCaculate(res.data.completed[i].deadline);
            prayer_more_content_[i] = {
                id : res.data.completed[i].id,
                name: '김정묵',
                dday: result,
                text: res.data.completed[i].title,
                checked : true,
                count : res.data.completed[i].pray_cnt
            };
            }
            if(!complete){
                setPrayerContent(prayer_content_);
            }
            else{
                setPrayerMoreContent(prayer_more_content_);
            }
            }
          } catch (e){
          alert("error occured");
          console.log(e);
        }
    }

    const dayFucTopDay = (e) =>{
        if(!dayToggleTopDay){
            getPrayList("date",false);
            setDayToggleTopDay(!dayToggleTopDay);
            setDayToggleTopPrayer(!dayToggleTopPrayer);
            setColorSecondTop('#7BAB6E');
            setColorFirstTop('#EBF6E8');
        }
    }
    const dayFucTopPrayer = () =>{
        if(!dayToggleTopPrayer){
            getPrayList("cnt", false);
            setDayToggleTopPrayer(!dayToggleTopPrayer);
            setDayToggleTopDay(!dayToggleTopDay);
            setColorFirstTop('#7BAB6E');
            setColorSecondTop('#EBF6E8');
        }
    }

    const dayFucBottomDay = () =>{
        if(!dayToggleBottomDay){
            getPrayList("date", true);
            setDayToggleBottomDay(!dayToggleBottomDay);
            setDayToggleBottomPrayer(!dayToggleBottomPrayer);
            setColorSecondBottom('#7BAB6E');
            setColorFirstBottom('#EBF6E8');
        }
    }
    const dayFucBottomPrayer = () =>{
        if(!dayToggleBottomPrayer){
            getPrayList("cnt", true);
            setDayToggleBottomPrayer(!dayToggleBottomPrayer);
            setDayToggleBottomDay(!dayToggleBottomDay);
            setColorFirstBottom('#7BAB6E');
            setColorSecondBottom('#EBF6E8');
        }
    }

    const onShare = () =>{
        if(Sharelist.length === 0){
            for(let i=0;i<prayerContent.length;i++){
                prayerContent[i].checked = false;
            }
            for(let i=0;i<prayerMoreContent.length;i++){
                prayerMoreContent[i].checked = false;
            }
            console.log("여기 입장");
        }
        setIsShare(!isShare);
        if(isShare){
            setshareToggle(!shareToggle);
            setIsShare(!isShare);
            console.log(Sharelist);
            setShareList([]);
        }
        else{
            console.log(Sharelist);
        }
        console.log(prayerContent);
        console.log(prayerMoreContent);
    }

    const onCheck = () =>{
        setIsShare(!isShare);
    }
    const onMove = () =>{
        setshareToggle(!shareToggle);
    }

    const shareList = (id, check_box) =>{
        if(check_box){
            setShareList([...Sharelist,id]);
            if(id < 1000){
                prayerContent[Number(id)-1].checked = check_box;
            }
            else{
                prayerMoreContent[Number(id)-1001].checked = check_box;
            }
        }
        else{
            setShareList(Sharelist.filter(list => (list !== id)));
            if(id < 1000){
                prayerContent[Number(id)-1].checked = check_box;
            }
            else{
                prayerMoreContent[Number(id)-1001].checked = check_box;
            }
        }
        check_box = !check_box;
    }
    return(
        <div> 
            <Background style={{paddingBottom: padding}}>
                <TopContent>
                    <TodayPrayer>
                        기도할게요
                    </TodayPrayer>
                    <BtnSet>
                        <BtnElementDay onClick={dayFucTopDay} style={{backgroundColor: colorFirstTop, color : colorSecondTop}}>날짜순</BtnElementDay>
                        <BtnElementPrayer onClick={dayFucTopPrayer} style={{backgroundColor : colorSecondTop , color : colorFirstTop}} >기도순</BtnElementPrayer>
                    </BtnSet>
                </TopContent>
                <PrayerContentStyle>
                    {(prayerContent.length === 0) ? <EmptySpace color={true}/> : 
                    prayerContent.map((content,index) =>(
                        <PrayerContent key={index} content = {content} day_toggle ={dayToggleTopDay} countUpdate = {countUpdate} contentClick = {contentClick} 
                        isShare={isShare} shareList={shareList} bottom={false}/>
                    ))}
                </PrayerContentStyle>

                <TopContent>
                    <TodayPrayer style={{marginTop:'46px'}}>기도했어요</TodayPrayer>
                    <BtnSet>
                        <BtnElementDay onClick={dayFucBottomDay} style={{backgroundColor: colorFirstBottom, color: colorSecondBottom}}>날짜순</BtnElementDay>
                        <BtnElementPrayer onClick={dayFucBottomPrayer} style={{backgroundColor: colorSecondBottom, color: colorFirstBottom}}>기도순</BtnElementPrayer>
                    </BtnSet>
                </TopContent>
                <PrayerContentStyle style={{marginTop:'0px', background:'#7BAB6E'}}> 
                        {(prayerMoreContent.length === 0) ? <EmptySpace color={false}/> : prayerMoreContent.map((content,index) =>(
                            <PrayerContent key={index} content = {content} day_toggle ={dayToggleBottomDay} countUpdate = {countUpdate} contentClick = {contentClick}
                            isShare = {isShare} shareList={shareList} bottom = {true}/>
                        ))}
                </PrayerContentStyle>
                {!isModify && !isChecked && <Share onShare={onShare} onMove={onMove} shareToggle={shareToggle} onCheck={onCheck} isShare={isShare}></Share>}
                {isChecked && <BottomMenu completeBtnClick = {completeBtnClick} modifyBtnClick = {modifyBtnClick} 
                bottom_delete_click = {bottom_delete_click} clickId = {clickId}></BottomMenu>}
                {isChecked && <BackgroundBright style={{top:'0px', bottom:'153px'}} onClick={changeCheck}></BackgroundBright>}
                {isModify && <BackgroundBright style={{top:'0px', bottom:'282px'}}onClick={onModify}></BackgroundBright>}
                {isModify  &&  <ModifyBar id ={clickId} valueChange = {valueChange}/>}
                {isDeleted && <BackgroundBright style={{top:'0px'}} onClick={onDeleted}></BackgroundBright>}
                {isDeleted && <DeleteBar deleteBtnClick = {deleteBtnClick} onDeleted={onDeleted} id ={clickId}/>}
            </Background>
        </div>
    )
}


export default PrayerList; 