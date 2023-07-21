import React, {useEffect, useState} from "react";
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
import Lottie from "react-lottie";
import LottieData from "./json/uspray.json";

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
    justify-content: space-between;
`;

const TodayPrayer = styled.div`
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 17px;
    margin: 44px 0px 13px 34px;
    color: #7BAB6E;
`;
const BtnSet = styled.div`
    display: flex;
    justify-content: center;
    align-items:center;
    margin-bottom: 8px;
    margin-top : 40px;
    margin-right: 32px;
    background-color:#7BAB6E; 
    border : none;
    border-radius : 4px;
    padding: 4px;
`;

const BtnElementDay = styled.button`
    font-size: 10px;
    padding: 2px 6px;
    border: none;
    border-radius: 2px;
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const BtnElementPrayer = styled.button`
    font-size: 10px;
    padding: 2px 6px;
    border: none;
    border-radius: 2px;
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const PrayerContentStyle = styled.div`
    background-color: #FFFFFF;
    margin: 0px 24px;
    border-radius: 16px;
    border: 1px solid #7BAB6F;
    min-height: 244px;
    padding-bottom: 20px;
`;


function PrayerList({prayerContent, setPrayerContent, prayerMoreContent, setPrayerMoreContent, countUpdate, completeBtnClick, bottom_delete_click, 
    modifyBtnClick, deleteBtnClick, isChecked, clickId,clickText, contentClick, isModify, onModify, isDeleted, onDeleted,
    valueChange,changeCheck, dDayCalculate, modalToggle, modalText,sortUpPosition,sortDownPosition,
    onMove, shareToggle, isShare, setIsShare, setshareToggle, setShareLength, shareLength,
    dayToggleTopDay , setDayToggleTopDay, dayToggleTopPrayer , setDayToggleTopPrayer,
    dayToggleBottomDay , setDayToggleBottomDay, dayToggleBottomPrayer , setDayToggleBottomPrayer, loading}){

    const defaultOptions = { //예제1
        loop: true,
        autoplay: true,
        animationData: LottieData,
        rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
        },
    };
    const [colorFirstTop, setColorFirstTop] = useState('#EBF6E8');
    const [colorSecondTop, setColorSecondTop] = useState('#7BAB6E');
    const [colorFirstBottom, setColorFirstBottom] = useState('#EBF6E8');
    const [colorSecondBottom, setColorSecondBottom] = useState('#7BAB6E');
    const [Sharelist, setShareList] = useState([]);
    const padding = (isChecked || isModify) ? "0px" : "24px";
    const {data: prayList, refetch: refetchPrayList} = usePrayList('date');
    const {data: pray_cnt_List, refetch: refetch_cnt_PrayList} = usePrayList('cnt');
    const {mutate: mutateSharePrayItem} = useShare();

    const praySort = (praylist) =>{
        let uncompletedsortedList = [];
        uncompletedsortedList = praylist.data.uncompleted.sort(function (a,b){
            return a.pray_cnt - b.pray_cnt;
        });
        console.log(uncompletedsortedList);
        return uncompletedsortedList;
    }
    
    const prayCompletedSort = (praylist) =>{
        let completedsortedList = []
        completedsortedList = praylist.data.completed.sort(function (a,b){
            return a.pray_cnt - b.pray_cnt;
        });
        console.log(completedsortedList);
        return completedsortedList;       
    }
    const getPrayList = (result, bool, pray) =>{ // bool이 true일 때 밑에 ,bool이 false이면 위에 pray가 true이면 기도순 클릭 
        if(!bool){
            let uncompletedList = [];
            if(pray){
                let sortedResult = [];
                sortedResult = praySort(result);
                sortedResult.map((uncompletedItem) => {
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
            }

            else{
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
            }
            setPrayerContent(uncompletedList);
            sortUpPosition(true);
            sortDownPosition(false);
        }
        else{
            let completedList = [];
            if(pray){
                let sortedResult = [];
                sortedResult = prayCompletedSort(result);
                sortedResult.map((completedItem) => {
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
            }
            else{
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
            }
            setPrayerMoreContent(completedList);
            sortUpPosition(false);
            sortDownPosition(true);
        }
    }
    const dayFucTopDay  =  () =>{
        if(!dayToggleTopDay){
            refetchPrayList();
            getPrayList(prayList, false, false);
            setDayToggleTopDay(!dayToggleTopDay);
            setDayToggleTopPrayer(!dayToggleTopPrayer);
            setColorSecondTop('#7BAB6E');
            setColorFirstTop('#EBF6E8');

        }
    }
    const dayFucTopPrayer = () =>{
        if(!dayToggleTopPrayer){
            refetch_cnt_PrayList();
            getPrayList(pray_cnt_List, false, true);
            setDayToggleTopPrayer(!dayToggleTopPrayer);
            setDayToggleTopDay(!dayToggleTopDay);
            setColorFirstTop('#7BAB6E');
            setColorSecondTop('#EBF6E8');
        }
    }

    const dayFucBottomDay = () =>{
        if(!dayToggleBottomDay){
            refetchPrayList();
            getPrayList(prayList, true, false);
            setDayToggleBottomDay(!dayToggleBottomDay);
            setDayToggleBottomPrayer(!dayToggleBottomPrayer);
            setColorSecondBottom('#7BAB6E');
            setColorFirstBottom('#EBF6E8');
        }
    }
    const dayFucBottomPrayer = () =>{
        if(!dayToggleBottomPrayer){
            refetch_cnt_PrayList();
            getPrayList(pray_cnt_List, true, true);
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
                onSuccess: (e) => {
                  console.log("sendShareList");
                  console.log(e.data);
                  if (navigator.share) {
                    navigator.share({
                        title: 'Web_share',
                        url: e.data,
                    });
                }else{
                    alert("공유하기가 지원되지 않는 환경 입니다.")
                }
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
                        <BtnElementDay onClick={dayFucTopDay} style={{transition: 'all 0.2s', backgroundColor: colorFirstTop, color : colorSecondTop}}>날짜순</BtnElementDay>
                        <BtnElementPrayer onClick={dayFucTopPrayer} style={{transition: 'all 0.2s', backgroundColor : colorSecondTop , color : colorFirstTop}} >기도순</BtnElementPrayer>
                    </BtnSet>
                </TopContent>
                <PrayerContentStyle>
                    {loading ? (
                        <Lottie
                        style={{scale: "0.5"}}
                        options={defaultOptions}
                        height={300}
                        width={300}
                        isClickToPauseDisabled={true}
                        />
                    ) : (
                        (prayerContent.length === 0) ? (
                        <EmptySpace color={true} />
                        ) : (
                        prayerContent.map((content, index) => (
                            <PrayerContent
                            key={index}
                            content={content}
                            dayToggle={dayToggleTopDay}
                            countUpdate={countUpdate}
                            contentClick={contentClick}
                            isShare={isShare}
                            shareList={shareList}
                            clickOff={clickOff}
                            bottom={false}
                            />
                        ))
                        )
                    )}
                </PrayerContentStyle>
                <TopContent>
                    <TodayPrayer style={{marginTop:'46px'}}>기도했어요</TodayPrayer>
                    <BtnSet>
                        <BtnElementDay onClick={dayFucBottomDay} style={{transition: 'all 0.2s', backgroundColor: colorFirstBottom, color: colorSecondBottom}}>날짜순</BtnElementDay>
                        <BtnElementPrayer onClick={dayFucBottomPrayer} style={{transition: 'all 0.2s', backgroundColor: colorSecondBottom, color: colorFirstBottom}}>기도순</BtnElementPrayer>
                    </BtnSet>
                </TopContent>
                <PrayerContentStyle style={{background:'#7BAB6E'}}> 
                {loading ? (
                        <Lottie
                        style={{scale: "0.5"}}
                        options={defaultOptions}
                        height={300}
                        width={300}
                        isClickToPauseDisabled={true}
                        />
                    ) : (
                        (prayerMoreContent.length === 0) ? <EmptySpace color={false}/> : prayerMoreContent.map((content,index) =>(
                            <PrayerContent key={index} content = {content} dayToggle ={dayToggleBottomDay} countUpdate = {countUpdate} contentClick = {contentClick}
                            isShare = {isShare} shareList={shareList} clickOff = {clickOff} bottom = {true}/>
                        ))
                        )
                }
                </PrayerContentStyle>
                {!isModify && !isChecked && <Share onShare={onShare} onMove={onMove} shareToggle={shareToggle} onCheck={onCheck} isShare={isShare}
               shareLength = {shareLength}></Share>}
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


