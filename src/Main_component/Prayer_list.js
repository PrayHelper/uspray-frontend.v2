import React from "react";
import Prayer_content from "./Prayer_content";
import './Prayer_list.css';


function Prayer_list({prayer_content_, prayer_more_content_}){
    return(
        <div>
            <div className="background">
                <div className="Top_content">
                    <div className="Today_prayer">오늘의 기도</div>
                    <div className="btn_set">
                        <button className="btn_day_today">날짜순</button>
                        <button className="btn_prayer_today">기도순</button>
                    </div>
                </div>

                <div className="Prayer_content">
                    {prayer_content_.map(content =>(
                        <Prayer_content content = {content}/>
                    ))}
                </div>

                <div className="bottom_content">
                    <div className="Today_prayer_onemore">한번 더 기도</div>
                    <div className="btn_set_onemore">
                        <button className="btn_day_onemore">날짜순</button>
                        <button className="btn_prayer_onemore">기도순</button>
                    </div>
                </div>

                <div className="One_More_Prayer_content">
                    <div className="prayer_more_content">
                        {prayer_more_content_.map(content =>(
                            <Prayer_content content = {content}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Prayer_list; 