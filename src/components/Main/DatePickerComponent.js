import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from "date-fns/esm/locale";
import styled from "styled-components";

const DateStyle = styled.div`
  display: flex;
  height: 42px;
  padding-left : 30px;
`

const MydatePicker = styled(DatePicker)`
  font-weight:bold;
  color: #B7CEB0;
  border: 1px solid ;
`
const DatePickerComponent = ({startDate, dateClick, visible}) => {
    return(
      <DateStyle style={{opacity: visible ? "1" : "0"}}>
			 <MydatePicker
        locale={ko}    // 언어설정 기본값은 영어
        dateFormat="yyyy-MM-dd"    // 날짜 형식 설정
        className="input-datepicker"    // 클래스 명 지정 css주기 위해
        minDate={new Date()}    // 선택할 수 있는 최소 날짜값 지정 
        closeOnScroll={true}    // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
        // placeholderText="체크인 날짜 선택"    // placeholder
        selected={startDate}    // value
        popperPlacement="bottom-start"
        onChange={(date) => dateClick(date)}    // 날짜를 선택하였을 때 실행될 함수
        inline
      />
		</DateStyle>
    );
};

// style.input-datepicker{

// }

  export default DatePickerComponent;