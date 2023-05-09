import React, { useEffect, useState } from 'react';
import PrayerList from '../Main_component/PrayerList';
import TemplateMain from '../Main_component/TemplateMain';
// import Data from "../ object/data.json";
// import axios from "axios";
import serverapi from '../api/serverapi';
let nextId = 4;
const Main = () => {
  const [click_id , setClick_id] = useState(0);
  const [isChecked , setIsChecked] = useState(false);
  const [isModify, setIsModify] = useState(false);
  const [prayer_content, setPrayer_content] = useState([]);
  const [prayer_more_content , setPrayer_more_content] = useState([
  ])
  const onInsert = async (Dday,text) =>{
    if(text === ""){
      return alert("기도제목이 입력이 되지 않았습니다.");
    }
    else if(Dday === 0){
      return alert("디데이를 입력하여 주세요.")
    }
    else{
      nextId += 1;
      var date = new Date();
      var day = addDay(date, Dday);
      var deadline = day.getFullYear() + "-" + (day.getMonth()+1) + "-" + day.getDate();
      sendPrayList('김정묵', text, deadline);
      const prayer = {
        id : 48,
        name: '김정묵',
        dday: Dday,
        text: text,
        checked : true,
        count : 0
      };
      // setPrayer_content(prayer_content => prayer_content.concat(prayer));
      // setPrayer_content([...prayer_content, prayer]);
      const getPrayList = async () => {
        const api = "/pray?sort_by=date";
        try {
          const res= await serverapi.get(api, { headers: {
            'Authorization': `${accessToken}`}});
          if (res.status === 200) {
            console.log(res.data);
            var prayer_content_ = [];
            for(var i = 0;i<Object.keys(res.data).length;i++){
              var result = ddayCaculate(res.data[i].deadline);
                prayer_content_[i] = {
                  id : res.data[i].id,
                  name: '김정묵',
                  dday: result,
                  text: res.data[i].title,
                  checked : true,
                  count : res.data[i].pray_cnt
                };
              }
            setPrayer_content(prayer_content_);
            }
          } catch (e){
          alert("error occured");
          console.log(e);
        }
      };
      setTimeout(getPrayList, 50); // 이부분은 조금 고민을 해봐야할듯합니다. 눈에 보이는지 나중에 체크 한번 해봐야할듯
      console.log(prayer_content);
    }
  }
  const addDay = (today, Dday) =>{
      var day = new Date(today);
      day.setDate(day.getDate() + Dday);
      return day;
  }
  const ChangeCheck = () =>{
    setIsChecked(!isChecked);      
  }
  
  const CountUpdate = async (id) => {
    const find_id = Object.keys(prayer_content).find(key => prayer_content[key].id === id);
    setPrayer_content(prayer_content.filter(prayer => prayer.id !== id));
    const prayer = prayer_content[find_id];
    setPrayer_more_content(prayer_more_content => prayer_more_content.concat(prayer));
    const api = "/pray/complete/" + id;
    console.log(id);
    try {
      const res= await serverapi.put(api,id, { headers: {
        'Authorization': `${accessToken}`}});
      if (res.status === 200) {
        console.log(res.data);
      }
      } catch (e){
      alert("error occured");
      console.log(e);
    }
    
  };

const ContentClick  = (e) =>{
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
    setClick_id(e);
  }

  const CompleteBtnClick = (id) =>{ // 완료하기 관련 코드
    const find_id = Object.keys(prayer_content).find(key => prayer_content[key].id === id);
    setPrayer_content(prayer_content.filter(prayer => prayer.id !== id));
    prayer_content[find_id].dday = -1;
    ChangeCheck();
  }

const ModifyBtnClick = (id) =>{ // 수정하기 관련 코드
    console.log(id);
    setIsModify(!isModify);
    setIsChecked(!isChecked);
}
const onModify = () =>{
    setIsModify(!isModify);
}
const DeleteBtnClick = async(id) =>{ // 삭제하기 관련 코드
  setIsChecked(!isChecked);
  // console.log(prayer_content);
  const api = "/pray/"+ id;
    console.log(id);
    try {
      const res= await serverapi.delete(api,{ headers: {
        'Authorization': `${accessToken}`}});
      if (res.status === 200) {
        // console.log(res.data);
        setPrayer_content(prayer_content.filter(prayer => prayer.id !== id));
        console.log(prayer_content);
      }
      } catch (e){
      alert("error occured");
      console.log(e);
    }

} 
const ValueChange = async(id, value) =>{ // 수정하기 관련 코드
  const api = "/pray/my/" + id;
  const data = {
    "target" : "김정묵",
    "title" : value,
  }
  try {
    const res= await serverapi.put(api,data,{ headers: {
      'Authorization': `${accessToken}`}});
    if (res.status === 200) {
      console.log(res.data);
    }
    } catch (e){
    alert("error occured");
    console.log(e);
  }
  setPrayer_content(prayer_content => prayer_content.map(Prayer_content => 
    (Prayer_content.id === id ? {...Prayer_content, text: value} : Prayer_content)));
  setIsModify(!isModify);
}

const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE2OTgzN2E5LThiNjMtNDEyYS05NzE2LWFjNjMxMTM0MzY2NCIsImFjY2Vzc190b2tlbl9leHAiOiIyMDIzLTA1LTE2VDA0OjAyOjIzLjA2NjAxMyJ9.kWhL0E7FC56dCLaY5PKijEKLxPUkzgOjV8DNEm97cIE";

const ddayCaculate = (res_data) =>{
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
      console.log(res.data);
    }
  } catch(e){
      console.log(e);
  }
};


useEffect(()=>{
  const getPrayList = async () => {
    const api = "/pray?sort_by=date";
    try {
      const res= await serverapi.get(api, { headers: {
        'Authorization': `${accessToken}`}});
      if (res.status === 200) {
        var prayer_content_ = [];
        for(var i = 0;i<Object.keys(res.data).length;i++){
          var result = ddayCaculate(res.data[i].deadline);
            prayer_content_[i] = {
              id : res.data[i].id,
              name: '김정묵',
              dday: result,
              text: res.data[i].title,
              checked : true,
              count : res.data[i].pray_cnt
            };
          }
        setPrayer_content(prayer_content_);
        console.log()
        }
      } catch (e){
      alert("error occured");
      console.log(e);
    }
  };
  getPrayList();  
},[])


  return (
    <TemplateMain onInsert = {onInsert}>
      <PrayerList prayer_content={prayer_content} setPrayer_content = {setPrayer_content} prayer_more_content = {prayer_more_content}  CountUpdate = {CountUpdate} 
      CompleteBtnClick = {CompleteBtnClick} ModifyBtnClick = {ModifyBtnClick} DeleteBtnClick = {DeleteBtnClick}
      ContentClick = {ContentClick} click_id = {click_id} isChecked = {isChecked} isModify = {isModify} onModify={onModify}
      ValueChange = {ValueChange} ChangeCheck = {ChangeCheck} ddayCaculate = {ddayCaculate}/>
    </TemplateMain>
  );
};

export default Main;