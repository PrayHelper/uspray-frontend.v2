import React, { useEffect, useState } from 'react';
import Prayer_list from '../Main_component/Prayer_list';
import Template_main from '../Main_component/Template_main';
import Data from "../ object/data.json";

let nextId = 4;
let bottomId = 1004;
const Main = () => {
  const [click_id , setClick_id] = useState(0);
  const [isChecked , setIsChecked] = useState(false);
  const [isModify, setIsModify] = useState(false);
  const [prayer_content, setPrayer_content] = useState([
    {
      id : 1, 
      name: '김정묵',
      dday:3,
      text:"안녕하세요",
      checked: false,
      count : 11
    },
    {
      id : 2,
      name: '김정묵',
      dday:2,
      text:"안녕할수있도록",
      checked: false,
      count : 10
    },
    {
      id : 3,
      name: '김정묵',
      dday:1,
      text:"안녕할까요?",
      checked: false,
      count : 10
    },
    
  ])

  const [prayer_more_content , setPrayer_more_content] = useState([
    {
      id : 1001, 
      dday:3,
      name: '김정묵',
      text:"화이팅할수있도록",
      checked: false,
      count : 5
    },
    {
      id : 1002,
      dday:2,
      name: '김정묵',
      text:"화이팅할수있도록",
      checked: false,
      count : 5

    },
    {
      id : 1003,
      dday:1,
      name: '김정묵',
      text:"화이팅할수있도록",
      checked: false,
      count : 5
    },
  ])


  const onInsert = (Dday,text) =>{
    if(text === ""){
      return alert("기도제목이 입력이 되지 않았습니다.");
    }
    else if(Dday === 0){
      return alert("디데이를 입력하여 주세요.")
    }
    else{
      const prayer = {
        id : nextId,
        name: '김정묵',
        dday: Dday,
        text: text,
        checked : true,
        count : 0
      };
      nextId += 1;
      setPrayer_content(prayer_content => prayer_content.concat(prayer));
    }
  }

  const change_Check = () =>{
    setIsChecked(!isChecked);      
  }
  
  const Count_update = (id) =>{
      setPrayer_content(prayer_content => prayer_content.map(Prayer_content => (Prayer_content.id === id ? {...Prayer_content, count: Prayer_content.count + 1} : Prayer_content)));
      // prayer_content.sort(function(a,b){
      //   if(a.count < b.count) return 1;
      //   if(a.count >= b.count) return -1;
      // });
      const find_id = Object.keys(prayer_content).find(key => prayer_content[key].id === id);
      setPrayer_content(prayer_content.filter(prayer => prayer.id !== id));
      prayer_content.map(prayer =>  prayer.id > id ? prayer.id -= 1 : prayer.id);
      console.log(prayer_content);
      const prayer = prayer_content[find_id];
      prayer.id = bottomId;
      console.log(prayer);
      bottomId += 1;
      setPrayer_more_content(prayer_more_content => prayer_more_content.concat(prayer));
  }


const Content_click  = (e) =>{
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

  const Complete_btn_click = (id) =>{
    const find_id = Object.keys(prayer_content).find(key => prayer_content[key].id === id);
    setPrayer_content(prayer_content.filter(prayer => prayer.id !== id));
    prayer_content.map(prayer =>  prayer.id > id ? prayer.id -= 1 : prayer.id);
    console.log(prayer_content);
    const prayer = prayer_content[find_id];
    prayer.id = bottomId;
    bottomId += 1;
    setPrayer_more_content(prayer_more_content => prayer_more_content.concat(prayer));
    setIsChecked(!isChecked);
  }

const Modify_btn_click = (id) =>{
    console.log(id);
    setIsModify(!isModify);
    setIsChecked(!isChecked);
}

const Delete_btn_click = (id) =>{
  setPrayer_content(prayer_content.filter(prayer => prayer.id !== id));
  prayer_content.map(prayer => prayer.id > id ? prayer.id -=1 : prayer.id);
  setIsChecked(!isChecked);
  console.log(prayer_content);
} 
const value_Change = (id, value) =>{
  setPrayer_content(prayer_content => prayer_content.map(Prayer_content => 
    (Prayer_content.id === id ? {...Prayer_content, text: value} : Prayer_content)));
  setIsModify(!isModify);
}


useEffect(()=>{
  console.log(prayer_more_content);
  prayer_more_content.sort(function(a,b){
    if(a.count < b.count) return 1;
    if(a.count >= b.count) return -1;
  });
  console.log(prayer_more_content);
},[prayer_more_content])


  return (
    <Template_main onInsert = {onInsert} change_Check={change_Check}>
      <Prayer_list prayer_content_={prayer_content} prayer_more_content_ = {prayer_more_content}  Count_update = {Count_update} 
      Complete_btn_click = {Complete_btn_click} Modify_btn_click = {Modify_btn_click} Delete_btn_click = {Delete_btn_click}
      Content_click = {Content_click} click_id = {click_id} isChecked = {isChecked} isModify = {isModify}
      value_Change = {value_Change} change_Check = {change_Check}/>
    </Template_main>
  );
};

export default Main;