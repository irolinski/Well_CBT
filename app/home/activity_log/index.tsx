import React, { useEffect } from "react";
import {
  Dimensions,
  Pressable,
  SectionList,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DividerLine from "@/components/DividerLine";
import Text from "@/components/global/Text";
import JournalCard from "@/components/home/JournalCard";
import ToolHeader from "@/components/tools/ToolHeader";
import {
  allDataByMonthType,
  EntryListSection,
  EntryViewTableRow,
  getMonthYearTitle,
} from "@/constants/models/activity_log";
import { fetchEntryData } from "@/db/activity_log";
import {
  activityLogResetState,
  setCurrentIndex,
  setDisplayedData,
  setEntryData,
  setRawData,
  toggleModal,
} from "@/state/features/menus/activityLogSlice";
import { AppDispatch, RootState } from "@/state/store";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import ActivityLogModal from "./modal";
import MenuNav from "@/components/global/MenuNav";
import { setShowNewActivityModal } from "@/state/features/menus/newActivityModalSlice";
import NewActivityModal from "@/components/home/NewActivityModal";
import NotificationsModal from "@/components/home/NotificationsModal";
import { setShowNotificationModal } from "@/state/features/menus/notificationModalSlice";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const transformData = (fetchedData: EntryViewTableRow[]) => {
  const allDataByMonth: allDataByMonthType =
    [] as unknown as allDataByMonthType;

  fetchedData.map((el) => {
    const monthYear = getMonthYearTitle(el.datetime);

    if (!Object.keys(allDataByMonth).includes(monthYear)) {
      allDataByMonth[monthYear] = [el];
    } else {
      let updatedArr = [...allDataByMonth[monthYear], el];
      allDataByMonth[monthYear] = updatedArr;
    }
  });

  const resultsArr: EntryListSection[] = [];
  Object.entries(allDataByMonth).map((el) => {
    const obj: EntryListSection = {
      title: el[0] as string,
      data: el[1] as EntryViewTableRow[],
    };
    resultsArr.push(obj);
  });
  return resultsArr;
};

const ActivityLog = () => {
  const dispatch = useDispatch<AppDispatch>();
  const activityLogState = useSelector((state: RootState) => state.activityLog);

  const displayMoreData = (dataArr: EntryListSection[]) => {
    // don't run if there are filters on
    if (activityLogState.filterPeriod.length > 0) return;
    if (activityLogState.currentIndex < dataArr.length) {
      dispatch(
        setDisplayedData([
          ...activityLogState.displayedData,
          dataArr[activityLogState.currentIndex],
        ]),
      );
      dispatch(setCurrentIndex(activityLogState.currentIndex + 1));
    }
  };

  useEffect(() => {
    fetchEntryData().then((res) => {
      dispatch(setRawData(res));
      const transformedData: EntryListSection[] = transformData(
        res as EntryViewTableRow[],
      );
      // How to handle data if filters are engaged
      // (also, the auto displayMoreData function has to be turned off temporarily)
      if (activityLogState.filterPeriod.length > 0) {
        let filteredData = activityLogState.entryData.map((entry) => {
          // Filter the 'data' array to keep only those items where datetime > the specified datetime
          let filteredDataEntries;
          const filterPeriodOne = new Date(activityLogState.filterPeriod[0]);

          if (activityLogState.filterPeriod.length === 1) {
            filteredDataEntries = entry.data.filter(
              (el) => new Date(el.datetime) >= filterPeriodOne,
            );
          } else if (activityLogState.filterPeriod.length === 2) {
            const filterPeriodTwo = new Date(activityLogState.filterPeriod[1]);
            filterPeriodTwo.setHours(23, 59, 59, 999);
            filteredDataEntries = entry.data.filter(
              (el) =>
                new Date(el.datetime) >= filterPeriodOne &&
                new Date(el.datetime) <= filterPeriodTwo,
            );
          }

          // Keep the entry if there are any items left after the filtering
          return { title: entry.title, data: filteredDataEntries };
        });

        filteredData = filteredData.filter((entry) => entry!.data!.length > 0);

        dispatch(setDisplayedData(filteredData));
        // how to handle data if filters are not engaged
      } else {
        if (
          transformedData.length > 1 &&
          transformedData[activityLogState.currentIndex].data.length < 10
        ) {
          dispatch(
            setDisplayedData([
              ...activityLogState.displayedData,
              transformedData[activityLogState.currentIndex],
              transformedData[activityLogState.currentIndex + 1],
            ]),
          );
          dispatch(setCurrentIndex(activityLogState.currentIndex + 2));
        } else {
          displayMoreData(transformedData);
        }
        dispatch(setEntryData(transformedData));
      }
    });
  }, [activityLogState.filterPeriod]);

  useEffect(() => {
    // console.log(activityLogState.displayedData);
  }, [activityLogState]);

  return (
    <React.Fragment>
      <View className="h-full pb-8">
        {/* NAV */}
        <MenuNav
          name="Entry Log"
          handleBackButtonPress={() => {
            dispatch(activityLogResetState());
          }}
        />
        {/* / NAV */}
        <View className="mx-5 mt-8">
          <View className="mb-6 w-full items-center">
            {/* Button row */}
            <View className="mx-12 mb-6 h-12 w-full flex-row justify-between">
              <Pressable
                className="h-full flex-row items-center justify-center rounded-lg border"
                style={{ borderColor: "#B8B8B8" }}
                onPress={() => {
                  dispatch(toggleModal(true));
                }}
              >
                <View className="mr-4 w-36 flex-row items-center justify-center">
                  <View className="relative mx-16 w-full justify-center">
                    <Text style={{ color: "#1E1E1E" }} className="text-center">
                      Filters
                    </Text>
                  </View>
                  <View className="absolute right-0">
                    <AntDesign name="calendar" size={24} color="#73848D" />
                  </View>
                </View>
              </Pressable>
              <View className="justify-between">
                <Pressable
                  className="flex-row justify-end rounded-lg"
                  style={{ borderColor: "#B8B8B8" }}
                  onPress={() => {
                    dispatch(setShowNotificationModal(true));
                  }}
                >
                  <View
                    className="h-8 w-16 -translate-y-1 items-center justify-center rounded-xl border"
                    style={{ borderColor: "#B8B8B8" }}
                  >
                    <MaterialCommunityIcons
                      name="bell"
                      size={22}
                      color="#DEC773"
                    />
                  </View>
                </Pressable>
                {activityLogState.filterPeriod.length > 0 ? (
                  <Text>
                    {activityLogState.filterPeriod[0]}
                    {" to "}
                    {activityLogState.filterPeriod[1] ??
                      `${new Date().toISOString().split("T")[0]}`}
                  </Text>
                ) : (
                  <React.Fragment>
                    {Array.isArray(activityLogState.displayedData) &&
                      Array.isArray(activityLogState.entryData) && (
                        <Text className="my-1 text-sm" style={{ fontSize: 13 }}>
                          Showing{" "}
                          {activityLogState.displayedData.reduce(
                            (sum, item) => sum + item.data.length,
                            0,
                          )}{" "}
                          of{" "}
                          {activityLogState.entryData &&
                            activityLogState.entryData.reduce(
                              (sum, item) => sum + item.data.length,
                              0,
                            )}
                        </Text>
                      )}
                  </React.Fragment>
                )}
              </View>
            </View>
            <DividerLine width={windowWidth * 0.9} />
          </View>
          {/* List */}
          <View
            className="relative px-1"
            style={{ height: windowHeight * 0.75 }}
          >
            <SectionList
              sections={activityLogState.displayedData}
              keyExtractor={(item: EntryViewTableRow, index: number) =>
                `${item.id}-${index}`
              }
              onEndReached={() => displayMoreData(activityLogState.entryData)}
              renderSectionHeader={({ section: { title } }) => (
                <View
                  className="rounded-xl pb-3"
                  style={{ backgroundColor: "#F2F2F2" }}
                >
                  <ToolHeader style={{ marginBottom: 16, fontSize: 18 }}>
                    {title}
                  </ToolHeader>
                </View>
              )}
              renderItem={({ item }: { item: EntryViewTableRow }) => (
                <JournalCard
                  toolName={item.activityName}
                  datetime={item.datetime}
                  link={`./show/${item.activityName}/${item.id}`}
                  value={item.value ? item.value : (item.value as undefined)}
                />
              )}
              ListFooterComponent={
                <DividerLine
                  viewStyle={{
                    marginBottom: windowHeight * 0.1,
                    marginTop: windowHeight * 0.05,
                  }}
                  width={windowWidth / 2}
                />
              }
            />
          </View>
        </View>
      </View>
      {/* PLUS BUTTON */}
      <TouchableOpacity onPress={() => dispatch(setShowNewActivityModal(true))}>
        <View
          className="absolute bottom-0 right-0 items-center justify-center rounded-full"
          style={{
            width: 72,
            height: 72,
            right: windowHeight * 0.04,
            bottom: windowHeight * 0.06,
            backgroundColor: "#E57353",
          }}
        >
          <Feather name="plus" size={36} color="white" />
        </View>
      </TouchableOpacity>
      <ActivityLogModal />
      <NewActivityModal />
      <NotificationsModal />
    </React.Fragment>
  );
};
export default ActivityLog;
