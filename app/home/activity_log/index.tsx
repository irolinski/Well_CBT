import * as SQLite from "expo-sqlite";
import React, { useEffect } from "react";
import { Dimensions, Pressable, SectionList, View } from "react-native";
import BackButton from "@/components/BackButton";
import DividerLine from "@/components/DividerLine";
import Text from "@/components/global/Text";
import JournalCard from "@/components/JournalCard";
import ToolHeader from "@/components/ToolHeader";
import {
  allDataByMonthType,
  EntryListSection,
  EntryViewTableRow,
  getMonthYearTitle,
} from "@/constants/models/activity_log";
import { dbName } from "@/db/service";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { AppDispatch, RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import {
  activityLogResetState,
  setCurrentIndex,
  setDisplayedData,
  setEntryData,
  setRawData,
  toggleModal,
} from "@/state/features/menus/activityLogSlice";
import ActivityLogModal from "./modal";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const fetchEntryData = async () => {
  try {
    const db = await SQLite.openDatabaseAsync(dbName);
    const res = await db.getAllAsync(
      "SELECT * FROM allActivities ORDER BY datetime DESC LIMIT 45",
    );
    return res;
  } catch (err) {
    console.error(err);
  }
};

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
    // if (activityLogState.filterPeriod.length > 0) return;
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
      //if there are date filters present
      if (activityLogState.filterPeriod.length > 0) {
        const filteredData = activityLogState.entryData.map((entry) => {
          // Filter the 'data' array to keep only those items where datetime >= the specified datetime

          // this contains the actual days that fit the criteria - I need to use this to create a new temporary data object
          //instead of what i'm doing now, which is returning the full month object if there are entries that fit the criteria
          if (!entry) {
            return;
          }
          const filteredDataEntries = entry.data.filter(
            (el) =>
              new Date(el.datetime) >=
                new Date(activityLogState.filterPeriod[0]) &&
              new Date(el.datetime) <=
                new Date(activityLogState.filterPeriod[1]),
          );
          // filteredDataEntries.map((el) => {
          //   console.log(el);
          // });
          //THE BUG IS BECAUSE IT RETURNS THE WHOLE MONTH ARRAY INSTEAD OF CREATING A NEW MONTH OUT OF THOSE DAYS THAT HAVE PASSED THROUGH THE FILTER?
          // Keep the entry if there are any items left after the filtering
          // return filteredDataEntries.length > 0;
          if (filteredData.length > 0) {
            // return { ...entry, data: filteredDataEntries };
          } else {
            return null;
          }
        });

        dispatch(setDisplayedData(filteredData));
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

  return (
    <React.Fragment>
      <View className="h-full pb-8">
        {/* NAV */}
        <View
          className={`z-10 box-border w-full border-b ${windowHeight > 750 ? "pb-4 pt-16" : "top-12"}`}
          style={{
            borderColor: "#D9D9D9",
            backgroundColor: "#8DBED8",
          }}
        >
          <View className="z-10 w-full flex-row items-center justify-between">
            <View className="left-6">
              <BackButton
                color="#FBFBFB"
                handleBackButtonPress={() => {
                  dispatch(activityLogResetState());
                }}
              />
            </View>
            <View className="mx-6 flex-row justify-end">
              <ToolHeader noIndent style={{ color: "#FBFBFB" }}>
                Entry Log
              </ToolHeader>
            </View>
          </View>
        </View>
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
                    console.log("pressed");
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
                  link={`/${item.id}`}
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
      <ActivityLogModal />
    </React.Fragment>
  );
};
export default ActivityLog;
