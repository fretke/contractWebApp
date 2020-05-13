import React, { Fragment, useState } from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";

function convertDate(date){
  let convertedDate = date.c.year + "-";
  if (date.c.month < 10){
    convertedDate = convertedDate.concat("0" + date.c.month);
  } else {
    convertedDate = convertedDate.concat(date.c.month);
  }

  if(date.c.day < 10){
    convertedDate = convertedDate.concat("-0" + date.c.day);
  } else {
    convertedDate = convertedDate.concat("-" + date.c.day);
  }
    return convertedDate;
}

function DatePicker(props) {
  const [selectedDate, handleDateChange] = useState(new Date());

  

  return (
    <Fragment>
      <KeyboardDatePicker
        clearable
        name="contractInit"
        value={selectedDate}
        placeholder="10/10/2018"
        onChange={date => {
            handleDateChange(date);
            props.update({name : props.name, value: convertDate(date)});
            }}
        // minDate={}
        format="yyyy-MM-dd"
      />
    </Fragment>
  );
}

export default DatePicker;
export {convertDate}