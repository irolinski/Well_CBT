import React, { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "@/constants/styles/colorTheme";
import { setFilterPeriod } from "@/state/features/menus/activityLogSlice";
import { AppDispatch, RootState } from "@/state/store";

type CalendarCallbackEvent = {
  day: number;
  month: number;
  year: number;
  timestamp: string;
  dateString: string;
};

const ActivityLogCalendar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const activityLogState = useSelector((state: RootState) => state.activityLog);

  const [markedDates, setMarkedDates] = useState({});
  const [initialDate] = useState(new Date().toISOString().split("T")[0]);
  const [currentDate, setCurrentDate] = useState(initialDate);

  const getMarkedDates = () => {
    const markedDatesObj: any = {};
    activityLogState.rawData.forEach((el: any) => {
      markedDatesObj[`${el.datetime.split(" ")[0]}`] = { marked: true }; //also could add support for multiple dot colors?
    });
    setMarkedDates(markedDatesObj);
  };

  const handleFilterPeriod = (dateString: string) => {
    if (activityLogState.filterPeriod.length === 0) {
      dispatch(setFilterPeriod([dateString]));
    }

    if (activityLogState.filterPeriod.length === 1) {
      if (dateString > activityLogState.filterPeriod[0]) {
        dispatch(
          setFilterPeriod([activityLogState.filterPeriod[0], dateString]),
        );
      } else if (dateString < activityLogState.filterPeriod[0]) {
        dispatch(setFilterPeriod([dateString]));
      }
    }

    if (activityLogState.filterPeriod.length === 2) {
      // if end period date is clicked, remove it
      if (dateString === activityLogState.filterPeriod[1]) {
        dispatch(setFilterPeriod([activityLogState.filterPeriod[0]]));
      }
      if (dateString > activityLogState.filterPeriod[0]) {
        dispatch(
          setFilterPeriod([activityLogState.filterPeriod[0], dateString]),
        );
      } else if (dateString < activityLogState.filterPeriod[0]) {
        dispatch(setFilterPeriod([dateString]));
      }
    }

    if (dateString === activityLogState.filterPeriod[0]) {
      dispatch(setFilterPeriod([]));
    }
  };

  // helper function -- get all days between two days
  const getDaysArray = function (start: string, end: string) {
    const arr = [];
    for (
      const dt = new Date(start);
      dt <= new Date(end);
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(new Date(dt));
    }
    return arr;
  };

  useEffect(() => {
    // do nothing if there is no raw data
    if (activityLogState.rawData.length > 0) {
      return;
    }
    // check for marked data only if there are no filters on
    // this prevents accidental looping when managing the UI
    if (activityLogState.filterPeriod.length < 1) {
      getMarkedDates();
    }
  }, [activityLogState.filterPeriod, activityLogState.rawData]);

  // UI color changes
  useEffect(() => {
    const newMarkedDatesObj: any = {};

    activityLogState.rawData.forEach((el: any) => {
      newMarkedDatesObj[`${el.datetime.split(" ")[0]}`] = { marked: true }; //also could add support for multiple dot colors?
    });

    // if only the starting date has been picked
    if (activityLogState.filterPeriod.length === 1) {
      // color starting date in the UI
      newMarkedDatesObj[activityLogState.filterPeriod[0]] = {
        startingDay: true,
        color: Colors.mainBlue,
      };
      setMarkedDates(newMarkedDatesObj);
    }

    // if both dates (full period) are set
    if (activityLogState.filterPeriod.length === 2) {
      // get an array of dates in between
      const fetchedSelectedDateObjects = getDaysArray(
        activityLogState.filterPeriod[0],
        activityLogState.filterPeriod[1],
      );
      const selectedDates = fetchedSelectedDateObjects.map(
        (el) => new Date(el).toISOString().split("T")[0],
      );
      // color the dates in the UI
      selectedDates.forEach((el, index: number) => {
        newMarkedDatesObj[`${el}`] = {
          startingDay: index === 0,
          endingDay: index === selectedDates.length - 1,
          color: Colors.mainBlue,
        };
      });
    }
    setMarkedDates(newMarkedDatesObj);
  }, [activityLogState.filterPeriod, activityLogState.rawData]);

  return (
    <React.Fragment>
      <Calendar
        minDate={"2024-01-10"}
        maxDate={initialDate}
        onDayPress={(evt: any) => {
          handleFilterPeriod(evt.dateString);
        }}
        markedDates={markedDates}
        markingType={"period"}
        monthFormat={"MMMM yyyy"}
        onMonthChange={(evt: CalendarCallbackEvent) => {
          setCurrentDate(evt.dateString);
        }}
        firstDay={1}
        hideDayNames={false}
        disableArrowRight={currentDate === initialDate}
        disableAllTouchEventsForDisabledDays={true}
        enableSwipeMonths={true}
        theme={{
          dotColor: "#FF997C",
          arrowColor: Colors.mainBlue,
          calendarBackground: "rgba(255, 255, 255, 0)",
        }}
      />
    </React.Fragment>
  );
};
export default ActivityLogCalendar;
