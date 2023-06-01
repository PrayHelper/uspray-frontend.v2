import React, { useEffect, useState } from 'react';
import PrayerList from '../components/Main/PrayerList';
import serverapi from '../api/serverapi';
import TemplateMain from "../components/Main/TemplateMain";
import { usePrayList } from '../hooks/usePrayList';
import { useCountUpdate } from '../hooks/useCountUpdate';
import { useCompletePrayList } from '../hooks/useCompletePrayList';
const name = "김정묵";
const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE2OTgzN2E5LThiNjMtNDEyYS05NzE2LWFjNjMxMTM0MzY2NCIsImFjY2Vzc190b2tlbl9leHAiOiIyMDIzLTA2LTAyVDAzOjIzOjE3LjQ2NTQzOSJ9.-X-DTausMa7eN_aPcx3IJQeyy6v1zTGvlCezQcDa_js";
const Main = () => {
  const {data: prayList} = usePrayList('date');
  
  const [uncompletedList, setUncompletedList] = useState([]);
  const [completedList , setCompletedList] = useState([]);

  const [clickId , setClickId] = useState(0);
  const [isChecked , setIsChecked] = useState(false);
  const [isModify, setIsModify] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [clickText, setClickText] = useState("");

  const renderingData = (result) => {
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

  useEffect(()=>{
    if(!prayList) return;
    renderingData(prayList);
  },[prayList]);

  const {mutate: mutateCountUpdate} = useCountUpdate();
  const {mutate: mutateComplete} = useCompletePrayList();

  const onInsert = async (Dday,text) =>{
    if(text === ""){
      return alert("기도제목이 입력이 되지 않았습니다.");
    }
    else{
      var date = new Date();
      var day = addDay(date, Dday);
      var deadline = day.getFullYear() + "-" + (day.getMonth()+1) + "-" + (day.getDate());
      sendPrayList(name, text, deadline);
      const getPrayList = async () => {
        const api = "/pray?sort_by=date";
        try {
          const res= await serverapi.get(api, { headers: {
            'Authorization': `${accessToken}`}});
          if (res.status === 200) {
            var prayer_content_ = [];
            var prayer_more_content_ = [];
            for(let i = 0;i<Object.keys(res.data.uncompleted).length;i++){
              let result = dDayCalculate(res.data.uncompleted[i].deadline);
                prayer_content_[i] = {
                  id : res.data.uncompleted[i].id,
                  name: name,
                  dday: result,
                  text: res.data.uncompleted[i].title,
                  checked : false,
                  count : res.data.uncompleted[i].pray_cnt
                };
            }
            for(let i = 0;i<Object.keys(res.data.completed).length;i++){
              let result = dDayCalculate(res.data.completed[i].deadline);
              prayer_more_content_[i] = {
                id : res.data.completed[i].id,
                name: '김정묵',
                dday: result,
                text: res.data.completed[i].title,
                checked : false,
                count : res.data.completed[i].pray_cnt
              };
            }
            setUncompletedList(prayer_content_);
            setCompletedList(prayer_more_content_); 
            }
          } catch (e){
          alert("error prayList");
          console.log(e);
        }
      };
      setTimeout(getPrayList, 200); // 이부분은 조금 고민을 해봐야할듯합니다. 눈에 보이는지 나중에 체크 한번 해봐야할듯
      // getPrayList();
    }
  }
  const addDay = (today, Dday) =>{
      var day = new Date(today);
      day.setDate(day.getDate() + Dday);
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

const completeBtnClick = async(id) =>{ // 완료하기 관련 코드
  changeCheck();
  mutateComplete({id:id}, {
    onSuccess: (res) => {
      renderingData(res);
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
const deleteBtnClick = async(id) =>{ // 삭제하기 관련 코드
  const api = "/pray/"+ id;
    console.log(id);
    try {
      const res= await serverapi.delete(api,{ headers: {
        'Authorization': `${accessToken}`}});
      if (res.status === 200) {
        setUncompletedList(uncompletedList.filter(prayer => prayer.id !== id));
        setCompletedList(completedList.filter(prayer => prayer.id !== id));
      }
      } catch (e){
      alert("error delete");
      console.log(e);
    }
    setIsDeleted(!isDeleted);
}
const onDeleted = () =>{
  setIsDeleted(!isDeleted);
} 
const valueChange = async(id, value) =>{ // 수정하기 관련 코드
  const api = "/pray/my/" + id;
  const data = {
    "target" : name,
    "title" : value,
  }
  if(value === ""){
    return alert("이대로")
  }
  else{
    try {
      const res= await serverapi.put(api,data,{ headers: {
        'Authorization': `${accessToken}`}});
      if (res.status === 200) {
        console.log("Value_Change");
        console.log(res.data);
      }
      } catch (e){
      alert("error Value_change");
      console.log(e);
    }
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


const sendPrayList = async (name, title, dead) =>{
  const api = "/pray";
  const data = {
      'target' : `${name}`,
      'title'  : `${title}`,
      'deadline' : `${dead}`        
  }
  try{
    const res = await serverapi.post(api, data ,{ headers : {
      'Authorization' : `${accessToken}`}});
    if(res.status === 200){
      console.log("sendPraryList");
    }
  } catch(e){
      console.log(e);
  }
};

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