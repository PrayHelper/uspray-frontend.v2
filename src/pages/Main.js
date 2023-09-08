import React, { useEffect, useState } from "react";
import PrayerList from "../components/Main/PrayerList";
import TemplateMain from "../components/Main/TemplateMain";
import { usePrayList } from "../hooks/usePrayList";
import { useCountUpdate } from "../hooks/useCountUpdate";
import { useCompletePrayList } from "../hooks/useCompletePrayList";
import { usePrayDelete } from "../hooks/usePrayDelete";
import { useChangeValue } from "../hooks/useChangeValue";
import { useSendPrayItem } from "../hooks/useSendPrayItem";
import { useLocation } from "react-router";
import { useShareSocial } from "../hooks/useShareSocial";

const Main = () => {
  const { data: prayList, refetch: refetchPrayList } = usePrayList("date");
  const { data: pray_List, refetch: refetch_PrayList } = usePrayList("cnt");
  const [uncompletedList, setUncompletedList] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [clickId, setClickId] = useState(0);
  const [clickIsShare, setClickIsShare] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isModify, setIsModify] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [clickData, setClickData] = useState({});
  const [modalToggle, setmodalToggle] = useState(false);
  const [modalText, setModalText] = useState("");
  const [upPosition, setUpPosition] = useState(true);
  const [DownPosition, setDownPosition] = useState(true);
  const [isShare, setIsShare] = useState(false);
  const [shareToggle, setshareToggle] = useState(false);
  const [shareLength, setShareLength] = useState(0);
  const [dayToggleTopDay, setDayToggleTopDay] = useState(true);
  const [dayToggleTopPrayer, setDayToggleTopPrayer] = useState(false);
  const [dayToggleBottomDay, setDayToggleBottomDay] = useState(true);
  const [dayToggleBottomPrayer, setDayToggleBottomPrayer] = useState(false);
  const [loading, setisloading] = useState(true);
  const [Sharelist, setShareList] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const shareData = query.getAll('share');

  const { data: shareSocialList, refetch: refetch_shareSocialList} 
  = useShareSocial(shareData);

  const renderingData = async (result, sticker) => {
    setisloading(true);
    let uncompletedList = [];
    let completedList = [];
    if (sticker == true) {
      result.data.completed.map((completedItem) => {
        let dDay = dDayCalculate(completedItem.deadline);
        completedList.push({
          id: completedItem.id,
          name: completedItem.target,
          dday: dDay,
          text: completedItem.title,
          checked: false,
          count: completedItem.pray_cnt,
          isShare: completedItem.is_shared
        });
      });
    } else {
      result.data.uncompleted.map((uncompletedItem) => {
        let dDay = dDayCalculate(uncompletedItem.deadline);
        uncompletedList.push({
          id: uncompletedItem.id,
          name: uncompletedItem.target,
          dday: dDay,
          text: uncompletedItem.title,
          checked: false,
          count: uncompletedItem.pray_cnt,
          isShare: uncompletedItem.is_shared
        });
      });
      result.data.completed.map((completedItem) => {
        let dDay = dDayCalculate(completedItem.deadline);
        completedList.push({
          id: completedItem.id,
          name: completedItem.target,
          dday: dDay,
          text: completedItem.title,
          checked: false,
          count: completedItem.pray_cnt,
          isShare: completedItem.is_shared
        });
      });
    }
    // console.log(upPosition);
    // console.log(DownPosition);
    upPosition && setUncompletedList(uncompletedList);
    DownPosition && setCompletedList(completedList);
    setisloading(false);
  };

  const sortUpPosition = (result) => {
    setUpPosition(result);
  };
  const sortDownPosition = (result) => {
    setDownPosition(result);
  };
  useEffect(() => {
    if (!prayList) {
      setisloading(true);
      return;
    }
    // console.log("prayList");
    renderingData(prayList, false);
  }, [prayList]);


  useEffect(() => {
    if (!pray_List) {
      setisloading(true);
      return;
    }
    // console.log("pray_List");
    renderingData(pray_List, false);
  }, [pray_List]);


  useEffect(() =>{
    if(Array.isArray(shareData) && shareData.length !== 0){
      setTimeout(()=>{
        refetch_shareSocialList();
      },1000) // 근데 이부분 시간 이렇게 적용해도 괜찮은건지?
    }
  }, [shareData]);

  const { mutate: mutateCountUpdate } = useCountUpdate();
  const { mutate: mutateComplete } = useCompletePrayList();
  const { mutate: mutateDeletePrayItem } = usePrayDelete();
  const { mutate: mutateChangeValue } = useChangeValue();
  const { mutate: mutateSendPrayItem } = useSendPrayItem();


  // 기도를 입력하는 코드
  const onInsert = async (name, Dday, text) => {
    if (text === "") {
      return alert("기도제목이 입력이 되지 않았습니다.");
    } else {
      var date = new Date();
      var day = addDay(date, Dday);
      var zeroTime = setZeroTime(day);
      var deadline =
        zeroTime.getFullYear() +
        "-" +
        (zeroTime.getMonth() + 1) +
        "-" +
        zeroTime.getDate();
      mutateSendPrayItem(
        {
          target: name,
          title: text,
          deadline: deadline,
        },
        {
          onSuccess: () => {
            console.log("sendPraryList");
            setUpPosition(true);
            setDownPosition(false);
            dayToggleTopDay && refetchPrayList();
            dayToggleTopPrayer && refetch_PrayList();
            console.log(dayToggleTopPrayer);
          },
        }
      );
    }
  };

// 날짜를 넣는데에 있어서 도와주는 함수(onInsert에서 쓰임)
  const addDay = (today, Dday) => {
    var day = new Date(today);
    day.setDate(day.getDate() + Dday);
    console.log(day);
    return day;
  };

  // IsChecked를 바꾸는 함수
  const changeCheck = () => {
    setIsChecked(!isChecked);
  };

  // 하트를 눌렀을 때, 나오는 함수
  const countUpdate = async (id) => {
    setUpPosition(false);
    setDownPosition(true);
    mutateCountUpdate(
      { id: id },
      {
        onSuccess: (res) => {
          dayToggleBottomDay && refetchPrayList();
          dayToggleBottomPrayer && refetch_PrayList();
          renderingData(res, true);
          setUncompletedList(
            uncompletedList.filter((prayer) => prayer.id !== id)
          );
        },
      }
    );
  };

  // 말그대로, 밑에 있는 내용을 클릭했을때, 사용되는 함수
  const contentClick = (id, checked, shareCheck) => {
    if (isChecked === isModify) {
      if (isShare) {
        if(checked){
          clickOff(id);
        }else{
        shareList(id, !checked);
        }
        
      } else {
        setIsChecked(!isChecked);
        setClickIsShare(shareCheck);

      }
    } else {
      if (isChecked === true && isModify === false) {
        setIsChecked(!isChecked);
      } else {
        setIsModify(!isModify);
      }
    }
    setClickId(id);
  };

  // 완료, 수정, 삭제등을 하게 되었을 때, 나오는 모달창을 실행시키는 함수 
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

  // 완료하기를 눌렀을 때, 나오는 함수
  const completeBtnClick = async (id) => {
    // 완료하기 관련 코드
    changeCheck();
    mutateComplete(
      { id: id },
      {
        onSuccess: (res) => {
          setUncompletedList(
            uncompletedList.filter((prayer) => prayer.id !== id)
          );
          setCompletedList(completedList.filter((prayer) => prayer.id !== id));
          feedbackHandler("기도를 완료하였습니다.");
        },
      }
    );
  };

  // 수정하기를 눌렀을 때, 나오는 함수
  const modifyBtnClick = (id) => {
    // 수정하기 관련 코드
    // console.log(id);
    setIsModify(!isModify);
    setIsChecked(!isChecked);
    var returnValue = uncompletedList.find(function (data) {
      return data.id === id;
    });
    var returnValue_ = completedList.find(function (data) {
      return data.id === id;
    });
    var data = returnValue ? returnValue : returnValue_;
    var temp = {
      // id: data.id,
      name: data.name,
      text: data.text
    }
    setClickData(temp);
  };

  // modify를 바꾸는 함수
  const onModify = () => {
    setIsModify(!isModify);
  };

  // BottomMene에서 삭제하기를 눌렀을 때 실행되는 함수 
  const bottom_delete_click = () => {
    setIsChecked(!isChecked);
    setIsDeleted(!isDeleted);
  };

  // 삭제하기를 누른뒤, 진짜 삭제를 눌렀을 떄, 실행되는 함수
  const deleteBtnClick = async (id) => {
    mutateDeletePrayItem(
      { id: id },
      {
        onSuccess: () => {
          setUncompletedList(
            uncompletedList.filter((prayer) => prayer.id !== id)
          );
          setCompletedList(completedList.filter((prayer) => prayer.id !== id));
          feedbackHandler("기도제목이 삭제되었어요.");
        },
      }
    );
    setIsDeleted(!isDeleted);
  };
  
  // isDelete를 바꾸는 함수
  const onDeleted = () => {
    setIsDeleted(!isDeleted);
  };

  // 궁극적으로 수정하기를 눌렀을 때, 실행되는 함수
  const valueChange = async (id, value, name) => {
    console.log(value)
    if (value == "") {
      console.log(clickData);
    } else {
      mutateChangeValue(
        {
          id: id,
          data: { target: name, title: value },
        },
        {
          onSuccess: () => {
            feedbackHandler("기도제목이 수정되었어요.");
          },
        }
      );
    }
    setUncompletedList((uncompletedList) =>
      uncompletedList.map((uncompletedList) =>
        uncompletedList.id === id
          ? { ...uncompletedList, text: value }
          : uncompletedList
      )
    );
    setCompletedList((completedList) =>
      completedList.map((completedList) =>
        completedList.id === id
          ? { ...completedList, text: value }
          : completedList
      )
    );
    setIsModify(!isModify);
  };

  // dday를 계산해주는 함수
  const dDayCalculate = (res_data) => {
    var today = new Date();
    var dday = new Date(res_data);
    var result = Math.ceil((dday - today) / (1000 * 60 * 60 * 24));
    return result;
  };

  // 시간을 0으로 만들어주는 함수
  const setZeroTime = (date) => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  };

  // shareList를 초기화 해주는 함수 
  const onMove = () => {
    setshareToggle(!shareToggle);
    setIsShare(!isShare);
    setShareLength(0);
  };

  // 공유를 눌렀을 때, 하나씩 추가되는 함수 
  const shareList = (id, check_box) => {
    if (check_box) {
      setShareList([...Sharelist, id]);
      setShareLength(shareLength + 1);
      setUncompletedList((uncompletedList) =>
        uncompletedList.map((uncompletedList) =>
          Number(uncompletedList.id) === Number(id)
            ? { ...uncompletedList, checked: check_box }
            : uncompletedList
        )
      );
      setCompletedList((completedList) =>
        completedList.map((completedList) =>
          Number(completedList.id) === Number(id)
            ? { ...completedList, checked: check_box }
            : completedList
        )
      );
    }
  };

  // 공유모드에서 체크를 누르고 다시 체크를 눌렀을 때
  const clickOff = (id) =>{
    setShareLength(shareLength-1);
    setUncompletedList(prayerContent => prayerContent.map(PrayerContent => 
        (Number(PrayerContent.id) === Number(id) ? {...PrayerContent, checked:false}: PrayerContent)));
    setCompletedList(prayerMoreContent => prayerMoreContent.map(PrayerMoreContent => 
        (Number(PrayerMoreContent.id) === Number(id) ? {...PrayerMoreContent, checked:false}: PrayerMoreContent)));
}


  return (
    <TemplateMain
      onInsert={onInsert}
      setshareToggle={setshareToggle}
      shareToggle={shareToggle}
      isShare={isShare}
      setIsShare={setIsShare}
    >
      <PrayerList
        prayerContent={uncompletedList}
        setPrayerContent={setUncompletedList}
        prayerMoreContent={completedList}
        setPrayerMoreContent={setCompletedList}
        countUpdate={countUpdate}
        completeBtnClick={completeBtnClick}
        modifyBtnClick={modifyBtnClick}
        deleteBtnClick={deleteBtnClick}
        bottom_delete_click={bottom_delete_click}
        contentClick={contentClick}
        clickId={clickId}
        clickData={clickData}
        isChecked={isChecked}
        isModify={isModify}
        onModify={onModify}
        isDeleted={isDeleted}
        onDeleted={onDeleted}
        valueChange={valueChange}
        changeCheck={changeCheck}
        dDayCalculate={dDayCalculate}
        modalText={modalText}
        modalToggle={modalToggle}
        sortUpPosition={sortUpPosition}
        sortDownPosition={sortDownPosition}
        isShare={isShare}
        setIsShare={setIsShare}
        shareToggle={shareToggle}
        setshareToggle={setshareToggle}
        shareLength={shareLength}
        setShareLength={setShareLength}
        onMove={onMove}
        dayToggleTopDay={dayToggleTopDay}
        setDayToggleTopDay={setDayToggleTopDay}
        dayToggleTopPrayer={dayToggleTopPrayer}
        setDayToggleTopPrayer={setDayToggleTopPrayer}
        dayToggleBottomDay={dayToggleBottomDay}
        setDayToggleBottomDay={setDayToggleBottomDay}
        dayToggleBottomPrayer={dayToggleBottomPrayer}
        setDayToggleBottomPrayer={setDayToggleBottomPrayer}
        loading={loading}
        shareList={shareList}
        Sharelist={Sharelist}
        setShareList={setShareList}
        clickIsShare={clickIsShare}
        clickOff = {clickOff}
      />
    </TemplateMain>
  );
};

export default Main;
