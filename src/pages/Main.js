import React, { useState } from 'react';
import Prayer_list from '../Main_component/Prayer_list';
import Share from '../Main_component/Share';
import Template_main from '../Main_component/Template_main';

let nextId = 4;

const Main = () => {
  const [prayer_content, setPrayer_content] = useState([
    {
      name: '김정묵',
      dday:3,
      text:"안녕할수있도록",
      checked: true
    },
    {
      name: '김정묵',
      dday:2,
      text:"안녕할수있도록",
      checked: true
    },
    {
      name: '김정묵',
      dday:1,
      text:"안녕할수있도록",
      checked: true
    },
    
  ])

  const [prayer_more_content , setPrayer_more_content] = useState([
    {
      dday:3,
      name: '김정묵',
      text:"화이팅할수있도록",
      checked: true
    },
    {
      dday:2,
      name: '김정묵',
      text:"화이팅할수있도록",
      checked: true
    },
    {
      dday:1,
      name: '김정묵',
      text:"화이팅할수있도록",
      checked: true
    },
  ])

  const onInsert = (Dday,text) =>{
    if(text === ""){
      return alert("기도제목이 입력이 되지 않았습니다.");
    }
    else{
      const prayer = {
        dday: Dday,
        name: '김정묵',
        text: text,
        checked : true
      };
      setPrayer_content(Prayer_content => Prayer_content.concat(prayer));
    }
  }
  return (
    <Template_main onInsert = {onInsert}>
      <Prayer_list prayer_content_={prayer_content} prayer_more_content_ = {prayer_more_content} />
    </Template_main>
  );
};

export default Main;