import React, { useEffect, useState } from "react";
import { Dimensions, SectionList, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DividerLine from "@/components/DividerLine";
import MenuNav from "@/components/global/MenuNav";
import EntryLogListPlaceholder from "@/components/home/EntryLogListPlaceholder";
import FiltersButton from "@/components/home/FiltersButton";
import JournalCard from "@/components/home/JournalCard";
import NewActivityModal from "@/components/home/NewActivityModal";
import NotificationButton from "@/components/home/NotificationsButton";
import NotificationsModal from "@/components/home/NotificationsModal";
import PlusButton from "@/components/home/PlusButton";
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
} from "@/state/features/menus/activityLogSlice";
import { AppDispatch, RootState } from "@/state/store";
import ActivityLogModal from "./modal";
import EntryLogDisplayInfo from "@/components/home/EntryLogDisplayInfo";
import LoadingIndicator from "@/components/LoadingIndicator";

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

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setIsLoading(true); // Set loading to true at the start
    try {
      const res = await fetchEntryData();
      if (!res) {
        console.error("no res!");
        return;
      }
      dispatch(setRawData(res));
      const transformedData: EntryListSection[] = transformData(
        res as EntryViewTableRow[],
      );
      if (!transformData) {
        console.error("no transformed data!");
        return;
      }

      // How to handle data if date filters are engaged
      if (
        activityLogState.filterPeriod.length > 0 ||
        activityLogState.filterCategories.length > 0
      ) {
        let filteredData = activityLogState.entryData.map((entry) => {
          let filteredDataEntries = entry.data;

          //filter by date
          if (activityLogState.filterPeriod.length > 0) {
            let filterPeriodOne: Date;
            let filterPeriodTwo: Date;
            filterPeriodOne = new Date(activityLogState.filterPeriod[0]);
            if (activityLogState.filterPeriod.length === 1) {
              filteredDataEntries = entry.data.filter(
                (el) => new Date(el.datetime) >= filterPeriodOne,
              );
            } else if (activityLogState.filterPeriod.length === 2) {
              filterPeriodTwo = new Date(activityLogState.filterPeriod[1]);
              filterPeriodTwo.setHours(23, 59, 59, 999);
              filteredDataEntries = entry.data.filter(
                (el) =>
                  new Date(el.datetime) >= filterPeriodOne &&
                  new Date(el.datetime) <= filterPeriodTwo,
              );
            }
          }

          //filter by categories
          if (activityLogState.filterCategories.length > 0) {
            filteredDataEntries = filteredDataEntries.filter((el) =>
              activityLogState.filterCategories.includes(el.activityName),
            );
          }

          // Keep the entry if there are any items left after the filtering
          return { title: entry.title, data: filteredDataEntries };
        });

        if (filteredData.length) {
          filteredData = filteredData.filter(
            (entry) => entry && entry.data && entry.data.length > 0,
          );
        }
        dispatch(setDisplayedData(filteredData));
      }

      // How to handle data if filters are not engaged

      // (usecase when the filters have been engaged but are not anymore is yet to behandled)
      if (
        activityLogState.filterPeriod.length === 0 &&
        activityLogState.filterCategories.length === 0
      ) {
        // Reset displayedData to include all transformedData in case the filters have just been turned off
        dispatch(setDisplayedData(transformedData));
        //load more if there is less than 10 on page
        if (
          //!be careful not to try to access a non-existant index! !it had once ruined the whole component!
          transformedData.length > 1 &&
          transformData.length > activityLogState.currentIndex &&
          transformedData[activityLogState.currentIndex].data.length < 10
        ) {
          dispatch(
            setDisplayedData([
              ...activityLogState.displayedData,
              transformedData[activityLogState.currentIndex],
              transformedData[activityLogState.currentIndex + 1],
            ]),
          );
          if (activityLogState.currentIndex > 2) {
            dispatch(setCurrentIndex(activityLogState.currentIndex + 2));
          } else {
            dispatch(setCurrentIndex(activityLogState.currentIndex + 1));
          }
        } else {
          displayMoreData(transformedData);
        }
        dispatch(setEntryData(transformedData));
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const displayMoreData = (dataArr: EntryListSection[]) => {
    // don't run if there are filters on
    if (activityLogState.filterPeriod.length > 0) return;
    if (activityLogState.currentIndex < dataArr.length) {
      // show loading
      setIsLoading(true);
      dispatch(
        setDisplayedData([
          ...activityLogState.displayedData,
          dataArr[activityLogState.currentIndex],
        ]),
      );
      dispatch(setCurrentIndex(activityLogState.currentIndex + 1));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activityLogState.filterPeriod, activityLogState.filterCategories]);

  return (
    <React.Fragment>
      <View className="h-full pb-8" style={{ backgroundColor: "#FBFBFB" }}>
        {/* Nav */}
        <MenuNav
          name="Entry Log"
          handleBackButtonPress={() => {
            dispatch(activityLogResetState());
          }}
        />
        <View className="mx-5 mt-8">
          <View className="mb-6 w-full items-center">
            {/* Button row */}
            <View className="mx-12 mb-6 h-12 w-full flex-row justify-between">
              <View className="-translate-y-1.5 justify-start">
                <View className="flex-row justify-start">
                  <NotificationButton />
                </View>
                <EntryLogDisplayInfo />
              </View>
              <FiltersButton />
            </View>
            <DividerLine width={windowWidth * 0.9} />
          </View>
          {/* List */}
          <View
            className="relative px-1"
            style={{ height: windowHeight * 0.75 }}
          >
            {activityLogState.displayedData.length > 0 &&
            activityLogState.entryData.length > 0 ? (
              <SectionList
                sections={activityLogState.displayedData || []}
                keyExtractor={(item: EntryViewTableRow, index: number) =>
                  `${item.id}-${index}`
                }
                onEndReached={() => displayMoreData(activityLogState.entryData)}
                renderSectionHeader={({ section: { title } }) => (
                  <View
                    className="rounded-xl pb-3"
                    style={{ backgroundColor: "#FBFBFB" }}
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
            ) : (
              <React.Fragment>
                {isLoading ? (
                  <View className="h-3/4 items-center justify-center">
                    <LoadingIndicator />
                  </View>
                ) : (
                  <EntryLogListPlaceholder />
                )}
              </React.Fragment>
            )}
          </View>
        </View>
      </View>
      <PlusButton />
      {/* Modals */}
      <ActivityLogModal />
      <NewActivityModal />
      <NotificationsModal />
    </React.Fragment>
  );
};
export default ActivityLog;
