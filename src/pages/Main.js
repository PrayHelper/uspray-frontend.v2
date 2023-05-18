import React, { useEffect, useState } from 'react';
import PrayerList from '../Main_component/PrayerList';
import serverapi from '../api/serverapi';
import TemplateMain from "../Main_component/TemplateMain";
const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkzYWExZjhkLWI1NDEtNGZiNS1iODE3LTg2MDczYzQwODJiZCIsImFjY2Vzc190b2tlbl9leHAiOiIyMDIzLTA1LTE5VDExOjU4OjU0LjkxNjkzNCJ9.0tMdoq74Db065CbRK5QOWBO5pq6SihdMuwj4PMmOOdE";
const name = "김정묵";
const Main = () => {
  const [clickId , setClickId] = useState(0);
  const [isChecked , setIsChecked] = useState(false);
  const [isModify, setIsModify] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [prayerContent, setPrayerContent] = useState([]);
  const [prayerMoreContent , setPrayerMoreContent] = useState([
  ])
  const onInsert = async (Dday,text) =>{
    if(text === ""){
      return alert("기도제목이 입력이 되지 않았습니다.");
    }
    else{
      var date = new Date();
      var day = addDay(date, Dday);
      var deadline = day.getFullYear() + "-" + (day.getMonth()+1) + "-" + (day.getDate());
      sendPrayList('김정묵', text, deadline);
      const getPrayList = async () => {
        const api = "/pray?sort_by=date";
        try {
          const res= await serverapi.get(api, { headers: {
            'Authorization': `${accessToken}`}});
          if (res.status === 200) {
            var prayer_content_ = [];
            var prayer_more_content_ = [];
            for(var i = 0;i<Object.keys(res.data.uncompleted).length;i++){
              var result = ddayCaculate(res.data.uncompleted[i].deadline);
                prayer_content_[i] = {
                  id : res.data.uncompleted[i].id,
                  name: name,
                  dday: result,
                  text: res.data.uncompleted[i].title,
                  checked : true,
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
                checked : true,
                count : res.data.completed[i].pray_cnt
              };
            }
            setPrayerContent(prayer_content_);
            setPrayerMoreContent(prayer_more_content_); 
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
    const api = "/pray/complete/" + id;
    console.log(id);
    try {
      const res= await serverapi.put(api,id, { headers: {
        'Authorization': `${accessToken}`}});
      if (res.status === 200) {
        var prayer_content_ = [];
        var prayer_more_content_ = [];
        for(var i = 0;i<Object.keys(res.data.uncompleted).length;i++){
          var result = ddayCaculate(res.data.uncompleted[i].deadline);
            prayer_content_[i] = {
              id : res.data.uncompleted[i].id,
              name: name,
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
        setPrayerContent(prayer_content_);
        setPrayerMoreContent(prayer_more_content_);        
      }
      } catch (e){
      alert("error CountUpdate");
      console.log(e);
    }
    
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
    // var date = new Date();
    // var day = addDay(date, 1);
    // var deadline = day.getFullYear() + "-" + (day.getMonth()+1) + "-" + (day.getDate());
    const api = "/pray/finish/"+ id;
    try{
      const res = await serverapi.put(api,id,{ headers: {
        'Authorization': `${accessToken}`}} )
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
        setPrayerContent(prayer_content_);
        setPrayerMoreContent(prayer_more_content_);
      }
    }catch(e){
      alert("error complete");
      console.log(e);
    }
  }

const modifyBtnClick = (id) =>{ // 수정하기 관련 코드
    console.log(id);
    setIsModify(!isModify);
    setIsChecked(!isChecked);
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
        setPrayerContent(prayerContent.filter(prayer => prayer.id !== id));
        setPrayerMoreContent(prayerMoreContent.filter(prayer => prayer.id !== id));
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
  try {
    const res= await serverapi.put(api,data,{ headers: {
      'Authorization': `${accessToken}`}});
    if (res.status === 200) {
      console.log("Value_Change");
    }
    } catch (e){
    alert("error Value_change");
    console.log(e);
  }
  setPrayerContent(prayerContent => prayerContent.map(PrayerContent => 
    (PrayerContent.id === id ? {...PrayerContent, text: value} : PrayerContent)));
  setIsModify(!isModify);
}

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
      console.log("sendPraryList");
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
        setPrayerContent(prayer_content_); 
        setPrayerMoreContent(prayer_more_content_);  
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
      <PrayerList prayerContent={prayerContent} setPrayerContent = {setPrayerContent} prayerMoreContent = {prayerMoreContent} setPrayerMoreContent = {setPrayerMoreContent} 
      countUpdate = {countUpdate} completeBtnClick = {completeBtnClick} modifyBtnClick = {modifyBtnClick} deleteBtnClick = {deleteBtnClick} bottom_delete_click = {bottom_delete_click}
      contentClick = {contentClick} clickId = {clickId} isChecked = {isChecked} isModify = {isModify} onModify={onModify}
      isDeleted = {isDeleted} onDeleted = {onDeleted} valueChange = {valueChange} changeCheck = {changeCheck} ddayCaculate = {ddayCaculate}/>
    </TemplateMain>
  );
};

export default Main;