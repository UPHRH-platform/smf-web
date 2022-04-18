import { useState } from "react";
import { useDatepicker, START_DATE } from "@datepicker-react/hooks";
import Month from "./Month";
import NavButton from "./NavButton";
import DatePickerContext from "./DatePickerContext";
import * as moment from "moment";

function DatePicker(props) {
  const [state, setState] = useState({
    startDate: null,
    endDate: null,
    focusedInput: START_DATE,
  });

  const {
    firstDayOfWeek,
    activeMonths,
    isDateSelected,
    isDateHovered,
    isFirstOrLastSelectedDate,
    isDateBlocked,
    isDateFocused,
    focusedDate,
    onDateHover,
    onDateSelect,
    onDateFocus,
    goToPreviousMonths,
    goToNextMonths,
  } = useDatepicker({
    startDate: state.startDate,
    endDate: state.endDate,
    focusedInput: state.focusedInput,
    onDatesChange: handleDateChange,
  });

  function handleDateChange(data) {
    if (!data.focusedInput) {
      setState({ ...data, focusedInput: START_DATE });
    } else {
      setState(data);
    }

    let sd = data.startDate;
    let ed = data.endDate;
    if (sd !== null && ed !== null) {
      let finalRange =
        moment(sd).format("DD MMM") + " - " + moment(ed).format("DD MMM");
      localStorage.setItem("selectedFilter", finalRange);
      localStorage.setItem("selectedDate", finalRange);

      setTimeout(() => {
        props.history.push({
          pathname: "/analytics",
          state: { trigger: true },
        });
      }, 150);

      setTimeout(() => {
        props.history.push({
          pathname: "/analytics",
          state: { trigger: false },
        });
      }, 200);
      localStorage.setItem("startDate", moment(sd));
      localStorage.setItem("endDate", moment(ed));
    }
  }

  return (
    <DatePickerContext.Provider
      value={{
        focusedDate,
        isDateFocused,
        isDateSelected,
        isDateHovered,
        isDateBlocked,
        isFirstOrLastSelectedDate,
        onDateSelect,
        onDateFocus,
        onDateHover,
      }}
    >
      <div
        className="d-md-flex"
        css={{
          display: "grid",
          margin: "32px 0 0",
          gridTemplateColumns: `repeat(${activeMonths.length}, 300px)`,
          gridGap: "0 64px",
        }}
      >
        <NavButton onClick={goToPreviousMonths}>
          <span className="material-icons">chevron_left</span>
        </NavButton>
        {activeMonths.map((month) => (
          <Month
            key={`${month.year}-${month.month}`}
            year={month.year}
            month={month.month}
            firstDayOfWeek={firstDayOfWeek}
          />
        ))}
        <NavButton onClick={goToNextMonths}>
          <span className="material-icons">chevron_right</span>
        </NavButton>
      </div>
    </DatePickerContext.Provider>
  );
}

export default DatePicker;
