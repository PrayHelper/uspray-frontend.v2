import React, {useState} from "react";
import PrayerContent from "./PrayerContent";
import styled from 'styled-components';
import BottomMenu from "./BottomMenu";
import Share from "./Share";
import ModifyBar from "./ModifyBar";
import BackgroundBright from "./BackgroundBright";
import EmptySpace from "./EmptySpace";
import DeleteBar from "./DeleteBar";
import AnimationModal from "./AnimationModal";
import { usePrayList } from "../../hooks/usePrayList";
import { useShare } from "../../hooks/useShare";

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
    margin-left : 34px;
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
    border-radius : 4px;
`;

const BtnElementDay = styled.button`
    width: 40px;
    height: 18px;
    font-size: 10px;
    padding: 0px;
    border: none;
    border-radius: 2px;
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
    modifyBtnClick, deleteBtnClick, isChecked, clickId,clickText, contentClick, isModify, onModify, isDeleted, onDeleted,
    valueChange,changeCheck, dDayCalculate, modalToggle, modalText, doubleToggle}){
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
    const [shareLength, setShareLength] = useState(0);
    const padding = (isChecked || isModify) ? "0px" : "24px";
    const {data: prayList, refetch: refetchdatePrayList} = usePrayList('date');
    const {data: praycntList, refetch: refetchcntPrayList} = usePrayList('cnt');
    const {mutate: mutateSharePrayItem} = useShare();
    const getPrayList = (result, bool) =>{
        if(bool){
            let completedList = [];
            result.data.completed.map((completedItem) => {
                let dDay = dDayCalculate(completedItem.deadline);
                completedList.push({
                  id : completedItem.id,
                  name:completedItem.target,
                  dday: dDay,
                  text: completedItem.title,
                  checked : false,
                  count : completedItem.pray_cnt
                })
              });
              setPrayerMoreContent(completedList);
        }
        else{
            let uncompletedList = [];
    result.data.uncompleted.map((uncompletedItem) => {
      let dDay = dDayCalculate(uncompletedItem.deadline);
      uncompletedList.push({
        id : uncompletedItem.id,
        name:uncompletedItem.target,
        dday: dDay,
        text: uncompletedItem.title,
        checked : false,
        count : uncompletedItem.pray_cnt
      })
    });
    setPrayerContent(uncompletedList);
    console.log("이거 실행");
        }
    }
    const dayFucTopDay = (e) =>{
        if(!dayToggleTopDay){
            refetchcntPrayList();   
            getPrayList(praycntList, false);
            console.log("왼쪽 버튼 클릭");
            setDayToggleTopDay(!dayToggleTopDay);
            setDayToggleTopPrayer(!dayToggleTopPrayer);
            setColorSecondTop('#7BAB6E');
            setColorFirstTop('#EBF6E8');
        }
    }
    const dayFucTopPrayer = () =>{
        if(!dayToggleTopPrayer){
            refetchdatePrayList();
            getPrayList(prayList, false);
            console.log("오른쪽 버튼 클릭");
            setDayToggleTopPrayer(!dayToggleTopPrayer);
            setDayToggleTopDay(!dayToggleTopDay);
            setColorFirstTop('#7BAB6E');
            setColorSecondTop('#EBF6E8');
        }
    }

    const dayFucBottomDay = () =>{
        if(!dayToggleBottomDay){
            refetchcntPrayList();
            getPrayList(prayList, true);
            setDayToggleBottomDay(!dayToggleBottomDay);
            setDayToggleBottomPrayer(!dayToggleBottomPrayer);
            setColorSecondBottom('#7BAB6E');
            setColorFirstBottom('#EBF6E8');
        }
    }
    const dayFucBottomPrayer = () =>{
        if(!dayToggleBottomPrayer){
            refetchdatePrayList();
            getPrayList(praycntList, true);
            setDayToggleBottomPrayer(!dayToggleBottomPrayer);
            setDayToggleBottomDay(!dayToggleBottomDay);
            setColorFirstBottom('#7BAB6E');
            setColorSecondBottom('#EBF6E8');
        }
    }

    const onShare = async() =>{
        setIsShare(!isShare);
        if(isShare){
            setshareToggle(!shareToggle);
            setIsShare(!isShare);
            mutateSharePrayItem({
                pray_id_list : Sharelist
              },{
                onSuccess: () => {
                  console.log("sendShareList");
                  refetchdatePrayList();
                },
              });
            setShareList([]);
            setPrayerContent(prayerContent => prayerContent.map(
              prayerContent => ({...prayerContent, checked:false})
            ))
            setPrayerMoreContent(prayerMoreContent => prayerMoreContent.map(
                prayerMoreContent => ({...prayerMoreContent, checked:false})
              ))
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
        setIsShare(!isShare);
        setShareLength(0);
    }

    const clickOff = (id) =>{
        setShareLength(shareLength-1);
        setPrayerContent(prayerContent => prayerContent.map(PrayerContent => 
            (Number(PrayerContent.id) === Number(id) ? {...PrayerContent, checked:false}: PrayerContent)));
        setPrayerMoreContent(prayerMoreContent => prayerMoreContent.map(PrayerMoreContent => 
            (Number(PrayerMoreContent.id) === Number(id) ? {...PrayerMoreContent, checked:false}: PrayerMoreContent)));
    }

    const shareList = (id, check_box) =>{
        if(check_box){
            setShareList([...Sharelist,id]);
            setShareLength(shareLength+1);
            setPrayerContent(prayerContent => prayerContent.map(PrayerContent => 
                (Number(PrayerContent.id) === Number(id) ? {...PrayerContent, checked:check_box}: PrayerContent)));
            setPrayerMoreContent(prayerMoreContent => prayerMoreContent.map(PrayerMoreContent => 
                (Number(PrayerMoreContent.id) === Number(id) ? {...PrayerMoreContent, checked:check_box}: PrayerMoreContent)));
        }
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
                        isShare={isShare} shareList={shareList} clickOff = {clickOff} bottom={false} doubleToggle = {doubleToggle}/>
                    ))}
                </PrayerContentStyle>

                <TopContent>
                    <TodayPrayer style={{marginTop:'46px'}}>기도했어요</TodayPrayer>
                    <BtnSet>
                        <BtnElementDay onClick={dayFucBottomDay} style={{backgroundColor: colorFirstBottom, color: colorSecondBottom}}>날짜순</BtnElementDay>
                        <BtnElementPrayer onClick={dayFucBottomPrayer} style={{backgroundColor: colorSecondBottom, color: colorFirstBottom}}>기도순</BtnElementPrayer>
                    </BtnSet>
                </TopContent>
                <PrayerContentStyle style={{background:'#7BAB6E'}}> 
                        {(prayerMoreContent.length === 0) ? <EmptySpace color={false}/> : prayerMoreContent.map((content,index) =>(
                            <PrayerContent key={index} content = {content} dayToggle ={dayToggleBottomDay} countUpdate = {countUpdate} contentClick = {contentClick}
                            isShare = {isShare} shareList={shareList} clickOff = {clickOff} bottom = {true} doubleToggle ={doubleToggle}/>
                        ))}
                </PrayerContentStyle>
                {!isModify && isChecked && <Share onShare={onShare} onMove={onMove} shareToggle={shareToggle} onCheck={onCheck} isShare={isShare}
               shareLength = {shareLength} doubleToggle = {doubleToggle}></Share>}
                {modalToggle && <AnimationModal modalText = {modalText} />}
                {isChecked && <BottomMenu completeBtnClick = {completeBtnClick} modifyBtnClick = {modifyBtnClick} 
                bottom_delete_click = {bottom_delete_click} clickId = {clickId} changeCheck = {changeCheck}></BottomMenu>}
                {isModify  &&  <ModifyBar id ={clickId} valueChange = {valueChange} onModify={onModify} clickText = {clickText}/>}
                {isDeleted && <DeleteBar deleteBtnClick = {deleteBtnClick} onDeleted={onDeleted} id ={clickId}/>}
            </Background>
        </div>
    )
}


export default PrayerList; 


