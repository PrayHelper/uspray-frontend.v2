import React, { useState } from 'react';
import Prayer_list from '../Main_component/Prayer_list';
import Template_main from '../Main_component/Template_main';


let nextId = 4;
const Main = () => {
  const [prayer_content, setPrayer_content] = useState([
    {
      id : 1, 
      name: '김정묵',
      dday:3,
      text:"안녕할수있도록",
      checked: true,
      count : 10
    },
    {
      id : 2,
      name: '김정묵',
      dday:2,
      text:"안녕할수있도록",
      checked: true,
      count : 11
    },
    {
      id : 3,
      name: '김정묵',
      dday:1,
      text:"안녕할수있도록",
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


  const count_update = (id) =>{
      setPrayer_content(prayer_content => prayer_content.map(Prayer_content => (Prayer_content.id === id ? {...Prayer_content, count: Prayer_content.count + 1} : Prayer_content)))
  }

  return (
    <Template_main onInsert = {onInsert}>
      <Prayer_list prayer_content_={prayer_content} prayer_more_content_ = {prayer_more_content}  count_update = {count_update} />
    </Template_main>
  );
};

export default Main;