import React, { useEffect, useState } from 'react';
import PrayerList from '../components/Main/PrayerList';
import TemplateMain from "../components/Main/TemplateMain";
import { usePrayList } from '../hooks/usePrayList';
import { useCountUpdate } from '../hooks/useCountUpdate';
import { useCompletePrayList } from '../hooks/useCompletePrayList';
import { usePrayDelete } from '../hooks/usePrayDelete';
import { useChangeValue } from '../hooks/useChangeValue';
import { useSendPrayItem } from '../hooks/useSendPrayItem';
const name = "김정묵";

const Main = () => {
  const {data: prayList, refetch: refetchPrayList} = usePrayList('date');
  const [uncompletedList, setUncompletedList] = useState([]);
  const [completedList , setCompletedList] = useState([]);
  const [clickId , setClickId] = useState(0);
  const [isChecked , setIsChecked] = useState(false);
  const [isModify, setIsModify] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [clickText, setClickText] = useState("");
  const [modalToggle,setmodalToggle] = useState(false);
  const [modalText, setModalText] = useState("");
  const [tg, settg] = useState(true);
  const renderingData = (result) => {
    console.log(result);
    let uncompletedList = [];
    let completedList = [];
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
    setUncompletedList(uncompletedList);
    setCompletedList(completedList);
  }
  // console.log(prayList)
  useEffect(()=>{
    if(!prayList){
      // setTimeout(1000);
      settg(!tg);
      // refetchPrayList();
    }else{
      console.log("1");
      renderingData(prayList);
    }
  },[tg]);



  const {mutate: mutateCountUpdate} = useCountUpdate();
  const {mutate: mutateComplete} = useCompletePrayList();
  const {mutate: mutateDeletePrayItem} = usePrayDelete();
  const {mutate: mutateChangeValue} = useChangeValue();
  const {mutate: mutateSendPrayItem} = useSendPrayItem();

  const onInsert = async (Dday,text) =>{
    if(text === ""){
      return alert("기도제목이 입력이 되지 않았습니다.");
    }
    else{
      var date = new Date();
      var day = addDay(date, Dday);
      var zeroTime = setZeroTime(day);
      var deadline = zeroTime.getFullYear() + "-" + (zeroTime.getMonth()+1) + "-" + (zeroTime.getDate());
      console.log(deadline);
      console.log(date);
      mutateSendPrayItem({
        target: name,
        title: text,
        deadline: deadline,
      },{
        onSuccess: () => {
          console.log("sendPraryList");
          refetchPrayList();
        },
      });
      // getPrayList();
    }
  }
  const addDay = (today, Dday) =>{
      var day = new Date(today);
      day.setDate(day.getDate() + Dday);
      console.log(day);
      return day;
  }
  const changeCheck = () =>{
    setIsChecked(!isChecked);      
  }
  
  const countUpdate = async (id) => {
    mutateCountUpdate({id: id}, {
      onSuccess: (res) => {
        renderingData(res)

      }
    });
  };

const contentClick  = (e) =>{
    if(isChecked === isModify){
      setIsChecked(!isChecked);
    }
    else{
      if(isChecked === true && isModify === false){
        setIsChecked(!isChecked);
      }
      else{
        setIsModify(!isModify);
      }
    }
    setClickId(e);
  }

const feedbackHandler = (text) => { 
  // 이벤트가 실행되면 모달창이 보이게되고 내부에서 setIimeout 함수가 실행되며 
  // 일정시간후 모달창을 안보이는 상태로 변경
  setmodalToggle(true);
  setModalText(text);
  setTimeout(() => {
    setmodalToggle(false);
    setModalText("");
  }, 1000);
};

const completeBtnClick = async(id) =>{ // 완료하기 관련 코드
  changeCheck();
  mutateComplete({id:id}, {
    onSuccess: (res) => {
      renderingData(res);
      feedbackHandler("기도를 완료하였습니다.");
    }
  })
}
const modifyBtnClick = (id) =>{ // 수정하기 관련 코드
    console.log(id);
    setIsModify(!isModify);
    setIsChecked(!isChecked);
    var returnValue = uncompletedList.find(function(data){ return data.id === id});
    var returnValue_ = completedList.find(function(data){return data.id === id});
    var text = returnValue ? returnValue : returnValue_;
    setClickText(text.text);
}
const onModify = () =>{
    setIsModify(!isModify);
}
const bottom_delete_click = () =>{
  setIsChecked(!isChecked);
  setIsDeleted(!isDeleted);
}

const deleteBtnClick = async (id) => {
  mutateDeletePrayItem(
    {id: id}, {
      onSuccess: () => {
        setUncompletedList(uncompletedList.filter(prayer => prayer.id !== id));
        setCompletedList(completedList.filter(prayer => prayer.id !== id));
        feedbackHandler("기도제목이 삭제되었어요.");
      }
    }
  );
  setIsDeleted(!isDeleted);
}
const onDeleted = () =>{
  setIsDeleted(!isDeleted);
} 

const valueChange = async (id, value, name) => {
  if(value === ""){
    return alert("이대로")
  }
  else {
    mutateChangeValue(
      {
        id : id,
        data : {target : name,
        title : value},
      },{
        onSuccess: () => {
          console.log("Value_Change");
          feedbackHandler("기도제목이 수정되었어요.");
        },
      }
    );
  }
  setUncompletedList(uncompletedList => uncompletedList.map(uncompletedList => 
    (uncompletedList.id === id ? {...uncompletedList, text: value} : uncompletedList)));
  setCompletedList(completedList => completedList.map(completedList => 
    (completedList.id === id ? {...completedList, text: value} : completedList)));
  setIsModify(!isModify);
}

const dDayCalculate = (res_data) =>{
  var today = new Date();
  var dday = new Date(res_data);
  var result = Math.ceil((dday - today)/(1000*60*60*24));
  return result;
}

const setZeroTime = (date)=>{
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
}

  return (
    <TemplateMain onInsert = {onInsert}>
      <PrayerList prayerContent={uncompletedList} setPrayerContent = {setUncompletedList} prayerMoreContent = {completedList} setPrayerMoreContent = {setCompletedList} 
      countUpdate = {countUpdate} completeBtnClick = {completeBtnClick} modifyBtnClick = {modifyBtnClick} deleteBtnClick = {deleteBtnClick} bottom_delete_click = {bottom_delete_click}
      contentClick = {contentClick} clickId = {clickId} clickText = {clickText} isChecked = {isChecked} isModify = {isModify} onModify={onModify}
      isDeleted = {isDeleted} onDeleted = {onDeleted} valueChange = {valueChange} changeCheck = {changeCheck} dDayCalculate = {dDayCalculate}/>
    </TemplateMain>
  );
};

export default Main;