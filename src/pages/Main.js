import React, { useState } from 'react';
import Prayer_list from '../Main_component/Prayer_list';
import Template_main from '../Main_component/Template_main';



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
    {
      name: '김정묵',
      dday:3,
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
  return (
    <Template_main >
      <Prayer_list prayer_content_={prayer_content} prayer_more_content_ = {prayer_more_content} />
    </Template_main>
  );
};

export default Main;