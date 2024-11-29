import { Dimensions, Modal, Pressable, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Text from "@/components/global/Text";
import { AppDispatch, RootState } from "@/state/store";
import { Feather } from "@expo/vector-icons";
import {
  setFilterPeriod,
  toggleModal,
} from "@/state/features/menus/activityLogSlice";
import { Calendar } from "react-native-calendars";
import { useEffect, useState } from "react";

type CalendarCallbackEvent = {
  day: number;
  month: number;
  year: number;
  timestamp: string;
  dateString: string;
};

const ActivityLogModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const activityLogState = useSelector((state: RootState) => state.activityLog);

  const [markedDates, setMarkedDates] = useState({});

  const getMarkedDates = () => {
    const markedDatesObj: any = {};
    activityLogState.rawData.forEach((el) => {
      markedDatesObj[`${el.datetime.split(" ")[0]}`] = { marked: true }; //also could add support for multiple dot colors?
    });
    setMarkedDates(markedDatesObj);
  };

  const handleFilterPeriod = (dateString: string) => {
    if (activityLogState.filterPeriod.length === 0) {
      dispatch(setFilterPeriod([dateString]));
    }

    if (activityLogState.filterPeriod.length === 1) {
      dispatch(setFilterPeriod([...activityLogState.filterPeriod, dateString]));
    }
    if (
      dateString === activityLogState.filterPeriod[0] ||
      dateString < activityLogState.filterPeriod[0]
    ) {
      dispatch(setFilterPeriod([]));
    }

    if (activityLogState.filterPeriod.length > 0) {
      if (dateString === activityLogState.filterPeriod[1]) {
        dispatch(setFilterPeriod([activityLogState.filterPeriod[0]]));
      }
      if (
        dateString !== activityLogState.filterPeriod[0] &&
        dateString !== activityLogState.filterPeriod[1]
      ) {
        dispatch(
          setFilterPeriod([activityLogState.filterPeriod[0], dateString]),
        );
      }
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

    activityLogState.rawData.forEach((el) => {
      newMarkedDatesObj[`${el.datetime.split(" ")[0]}`] = { marked: true }; //also could add support for multiple dot colors?
    });

    // if only the starting date has been picked
    if (activityLogState.filterPeriod.length === 1) {
      // color starting date in the UI
      newMarkedDatesObj[activityLogState.filterPeriod[0]] = {
        startingDay: true,
        color: "#8DBED8",
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
          color: "#8DBED8",
        };
      });
    }
    setMarkedDates(newMarkedDatesObj);
  }, [activityLogState.filterPeriod, activityLogState.rawData]);

  //UI STATE
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const [initialDate] = useState(new Date().toISOString().split("T")[0]);
  const [currentDate, setCurrentDate] = useState(initialDate);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={activityLogState.showModal}
      className="flex-1"
    >
      <ScrollView
        onScroll={(evt) => {
          evt.nativeEvent.contentOffset.y < -175 &&
            dispatch(toggleModal(false));
        }}
      >
        <View
          className={`px-4 ${windowHeight > 850 ? "py-20" : "py-12"}`}
          style={{
            top: 0,
            width: windowWidth,
            height: windowHeight, //remove if more height needed
            backgroundColor: "#FBFBFB",
          }}
        >
          <Pressable
            onPress={() => {
              dispatch(toggleModal(false));
            }}
          >
            <View className="items-center pb-6">
              <View>
                <Feather name="chevron-down" size={24} color="black" />
              </View>
            </View>
          </Pressable>
          <View className="items-center">
            <Text className="text-xl" style={{ color: "#B8B8B8" }}>
              Settings
            </Text>
          </View>
          <View className="my-8">
            <View
              className="border-b pb-4 pt-2"
              style={{ borderColor: "#B8B8B8" }}
            >
              <Text className="text-lg" style={{ color: "#B8B8B8" }}>
                Select dates
              </Text>
              <View className="m-4 flex-row justify-around">
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
                    arrowColor: "#8DBED8",
                    calendarBackground: "rgba(255, 255, 255, 0)",
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default ActivityLogModal;
