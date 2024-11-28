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
  const [markedDates, setMarkedDates] = useState({});

  const [periodPointsNum, setPeriodPointsNum] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const activityLogState = useSelector((state: RootState) => state.activityLog);

  const getMarkedDates = () => {
    const markedDatesArr: any = {};
    activityLogState.rawData.forEach((el) => {
      markedDatesArr[`${el.datetime.split(" ")[0]}`] = { marked: true }; //also could add support for multiple dot colors?
    });
    setMarkedDates(markedDatesArr);
  };

  const handleFilterPeriod = (dateString: string) => {
    // const newState = [dateString];
    if (activityLogState.filterPeriod.length === 0) {
      dispatch(setFilterPeriod([dateString]));
    }

    if (activityLogState.filterPeriod.length === 1) {
      dispatch(setFilterPeriod([...activityLogState.filterPeriod, dateString]));
    }
    if (dateString === activityLogState.filterPeriod[0]) {
      dispatch(setFilterPeriod([]));
    }

    if (activityLogState.filterPeriod.length === 2) {
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

  useEffect(() => {
    if (activityLogState.rawData.length > 0) {
      getMarkedDates();
    }
  }, [activityLogState.rawData]);

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
