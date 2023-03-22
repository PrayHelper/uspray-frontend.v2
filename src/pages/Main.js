import React, { useState } from 'react';
import Modify_bar from '../Main_component/Modify_bar';
import Prayer_list from '../Main_component/Prayer_list';
import Template_main from '../Main_component/Template_main';


let nextId = 4;
const Main = () => {
  const [click_id , setClick_id] = useState(0);
  const [isChecked , setIsChecked] = useState(false);
  const [isModify, setIsModify] = useState(false);
  const [change_Value, setChange_Value] = useState('');
  const [prayer_content, setPrayer_content] = useState([
    {
      id : 1, 
      name: '김정묵',
      dday:3,
      text:"안녕하세요",
      checked: true,
      count : 11
    },
    {
      id : 2,
      name: '김정묵',
      dday:2,
      text:"안녕할수있도록",
      checked: true,
      count : 10
    },
    {
      id : 3,
      name: '김정묵',
      dday:1,
      text:"안녕할까요?",
      checked: true,
      count : 10
    },
    
  ])

  const [prayer_more_content , setPrayer_more_content] = useState([
    {
      id : 1, 
      dday:3,
      name: '김정묵',
      text:"화이팅할수있도록",
      checked: true,
      count : 5
    },
    {
      id : 2,
      dday:2,
      name: '김정묵',
      text:"화이팅할수있도록",
      checked: true,
      count : 5

    },
    {
      id : 3,
      dday:1,
      name: '김정묵',
      text:"화이팅할수있도록",
      checked: true,
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
        dday: Dday,
        name: '김정묵',
        text: text,
        checked : true,
        count : 0
      };
      nextId += 1;
      setPrayer_content(prayer_content => prayer_content.concat(prayer));
    }
  }

  // 숫자가 같을경우 업데이트가 살짝 이상함.
  const Count_update = (id) =>{
      setPrayer_content(prayer_content => prayer_content.map(Prayer_content => (Prayer_content.id === id ? {...Prayer_content, count: Prayer_content.count + 1} : Prayer_content)));
      prayer_content.sort(function(a,b){
        if(a.count < b.count) return 1;
        if(a.count >= b.count) return -1;
      });
      // setPrayer_content(sort_prayer);
  }


const Content_click  = (e) =>{
    if(isChecked === isModify){
      setIsChecked(!isChecked);
    }
    else{
      if(isChecked === true && isModify === false){
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
    const prayer = prayer_content[find_id];
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
  setIsChecked(!isChecked);
} 
const value_Change = (id, value) =>{
  setPrayer_content(prayer_content => prayer_content.map(Prayer_content => 
    (Prayer_content.id === id ? {...Prayer_content, text: value} : Prayer_content)));
  setIsModify(!isModify);
}
  return (
    <Template_main onInsert = {onInsert}>
      <Prayer_list prayer_content_={prayer_content} prayer_more_content_ = {prayer_more_content}  Count_update = {Count_update} 
      Complete_btn_click = {Complete_btn_click} Modify_btn_click = {Modify_btn_click} Delete_btn_click = {Delete_btn_click}
      Content_click = {Content_click} click_id = {click_id} isChecked = {isChecked} isModify = {isModify}
      value_Change = {value_Change}/>
    </Template_main>
  );
};

export default Main;