import React, {useState} from "react";
import PrayerContent from "./PrayerContent";
import styled from 'styled-components';
import BottomMenu from "./BottomMenu";
import Share from "./Share";
import ModifyBar from "./ModifyBar";
import BackgroundBright from "./BackgroundBright";
import EmptySpace from "./EmptySpace";
import serverapi from "../../api/serverapi";
import DeleteBar from "./DeleteBar";

const Background = styled.div`
  width: 100%;
  background-color: #d0e8cb;
  height: auto;
  min-height: 812px;
//   margin-top: 24px;
`;

const TopContent = styled.div`
    display: flex;
    width: 100%;
    height: 74px;
    justify-content: space-between;
    // margin-left : 32px;
`;

const TodayPrayer = styled.div`
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 17px;
    margin-left : 32px;
    margin-top : 44px;
    margin-bottom: 13px;
    color: #7BAB6E;
    width: 56px;
`;
const BtnSet = styled.div`
    display: flex;
    justify-content: center;
    align-items:center;
    width: 88px;
    height: 26px;
    margin-bottom: 8px;
    margin-top : 40px;
    margin-right: 32px;
    background-color:#7BAB6E; 
    border : none;
`;

const BtnElementDay = styled.button`
    width: 40px;
    height: 18px;
    font-size: 10px;
    padding: 0px;
    border: none;
`;

const BtnElementPrayer = styled.button`
    width: 40px;
    height: 18px;
    font-size: 10px;
    padding: 0px;
    border: none;
`;

const PrayerContentStyle = styled.div`
    width: 88.837%;
    background-color: #FFFFFF;
    margin-right : 24px;
    margin-left : 24px;
    // margin-bottom: 8px;
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
    // const [isShareChecked, setShareIsChecked] = useState(false);
    const padding = (isChecked || isModify) ? "0px" : "24px";
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE2OTgzN2E5LThiNjMtNDEyYS05NzE2LWFjNjMxMTM0MzY2NCIsImFjY2Vzc190b2tlbl9leHAiOiIyMDIzLTA1LTMxVDA5OjUzOjA3LjgwNjAyOCJ9.PZXwT-NJOFFdkzEDxngM8jrFS8e7uBKIAt9elOWK38g";
    const getPrayList = async (query, complete) => {
        const api = "/pray?sort_by=" + query;
        try {
          const res= await serverapi.get(api,{ headers: {
            'Authorization': `${accessToken}`}});
          if (res.status === 200) {
            var prayer_content_ = [];
            var prayer_more_content_ = [];
            for(let i = 0;i<Object.keys(res.data.uncompleted).length;i++){
                var result = ddayCaculate(res.data.uncompleted[i].deadline);
                prayer_content_[i] = {
                  id : res.data.uncompleted[i].id,
                  name: '김정묵',
                  dday: result,
                  text: res.data.uncompleted[i].title,
                  checked : false,
                  count : res.data.uncompleted[i].pray_cnt
                };
              }
            for(let i = 0;i<Object.keys(res.data.completed).length;i++){
            var result = ddayCaculate(res.data.completed[i].deadline);
            prayer_more_content_[i] = {
                id : res.data.completed[i].id,
                name: '김정묵',
                dday: result,
                text: res.data.completed[i].title,
                checked : false,
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

    const onShare = async() =>{
        if(Sharelist.length === 0){
            console.log(prayerContent)
            console.log("여기 입장");
        }
        setIsShare(!isShare);
        if(isShare){
            const api = "/share";
            setshareToggle(!shareToggle);
            setIsShare(!isShare);
            console.log(Sharelist);
            try {
                var data = {
                    "pray_id_list": Sharelist
                }
                const res= await serverapi.post(api,data, { headers: {
                  'Authorization': `${accessToken}`}});
                if (res.status === 200) {

                } 
            }catch (e){
                alert("Share error ");
                console.log(e);
              }

            setShareList([]);
            setPrayerContent(prayerContent => prayerContent.map(
              prayerContent => ({...prayerContent, checked:false})
            ))
            setPrayerMoreContent(prayerMoreContent => prayerMoreContent.map(
                prayerMoreContent => ({...prayerMoreContent, checked:false})
              ))
        }
        else{
            console.log(Sharelist);
        }
    }
    const onCheck = () =>{
        setIsShare(!isShare);
        setShareList([]);
        setPrayerContent(prayerContent => prayerContent.map(
            prayerContent => ({...prayerContent, checked:false})
          ))
        setPrayerMoreContent(prayerMoreContent => prayerMoreContent.map(
            prayerMoreContent => ({...prayerMoreContent, checked:false})
          ))
    }
    const onMove = () =>{
        setshareToggle(!shareToggle);
    }

    const clickOff = (id) =>{
        setPrayerContent(prayerContent => prayerContent.map(PrayerContent => 
            (Number(PrayerContent.id) === Number(id) ? {...PrayerContent, checked:false}: PrayerContent)));
        setPrayerMoreContent(prayerMoreContent => prayerMoreContent.map(PrayerMoreContent => 
            (Number(PrayerMoreContent.id) === Number(id) ? {...PrayerMoreContent, checked:false}: PrayerMoreContent)));
    }

    const shareList = (id, check_box) =>{
        if(check_box){
            setShareList([...Sharelist,id]);
            console.log(Sharelist);
            console.log(id);
            setPrayerContent(prayerContent => prayerContent.map(PrayerContent => 
                (Number(PrayerContent.id) === Number(id) ? {...PrayerContent, checked:check_box}: PrayerContent)));
            setPrayerMoreContent(prayerMoreContent => prayerMoreContent.map(PrayerMoreContent => 
                (Number(PrayerMoreContent.id) === Number(id) ? {...PrayerMoreContent, checked:check_box}: PrayerMoreContent)));
        }
        else{
            setShareList(Sharelist.filter(list => (list !== id)));
            var share_id = prayerContent.findIndex(e => e.id == id);
            prayerContent[share_id].check_box = check_box;
        }
        // console.log(check_box);
        
    }
    return(
        <div> 
            {isModify && <BackgroundBright onClick={onModify}></BackgroundBright>}
            {isDeleted && <BackgroundBright onClick={onDeleted}></BackgroundBright>}
            {isChecked && <BackgroundBright onClick={changeCheck}></BackgroundBright>}
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
                        <PrayerContent key={index} content = {content} dayToggle ={dayToggleTopDay} countUpdate = {countUpdate} contentClick = {contentClick} 
                        isShare={isShare} shareList={shareList} clickOff = {clickOff} bottom={false}/>
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
                            <PrayerContent key={index} content = {content} dayToggle ={dayToggleBottomDay} countUpdate = {countUpdate} contentClick = {contentClick}
                            isShare = {isShare} shareList={shareList} clickOff = {clickOff} bottom = {true}/>
                        ))}
                </PrayerContentStyle>
                {!isModify && !isChecked && <Share onShare={onShare} onMove={onMove} shareToggle={shareToggle} onCheck={onCheck} isShare={isShare}
               ></Share>}
                {isChecked && <BottomMenu completeBtnClick = {completeBtnClick} modifyBtnClick = {modifyBtnClick} 
                bottom_delete_click = {bottom_delete_click} clickId = {clickId}></BottomMenu>}
                {isModify  &&  <ModifyBar id ={clickId} valueChange = {valueChange} onModify={onModify}/>}
                {isDeleted && <DeleteBar deleteBtnClick = {deleteBtnClick} onDeleted={onDeleted} id ={clickId}/>}
            </Background>
        </div>
    )
}


export default PrayerList; 


