// import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import styled from "styled-components";
import {DayPicker} from "react-day-picker";
import 'react-day-picker/dist/style.css';
import { getMonth, getYear, getDate } from "date-fns";

const DateStyle = styled.div`
  display: flex;
  height: 25px;
  padding-left : 10px;
`

const DayPickers = styled(DayPicker)`
  margin: 0px;
  .rdp-months{
    background-color: white;
  } 
  .rdp-day_selected, .rdp-day_selected:focus-visible, .rdp-day_selected:hover{
    background-color: cornsilk;
  }
` 

const DatePickerComponent = ({startDate, setStartDate, dateClick, visible}) => {
  console.log(startDate);
  const onChange = (e) =>{   
    setStartDate(e);
    dateClick(e);
  }
    return(
      <DateStyle style={{opacity: visible ? "1" : "0"}}>
        <DayPickers
          mode="single"
          selected={startDate}
          onSelect={onChange}
          fromDate={new Date()}
        />
		 </DateStyle>
    );
};

  export default DatePickerComponent;
