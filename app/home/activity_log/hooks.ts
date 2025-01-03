import { useDispatch, useSelector } from "react-redux";
import {
  allDataByMonthType,
  EntryListSection,
  EntryViewTableRow,
  getMonthYearTitle,
} from "@/constants/models/activity_log";
import {
  setCurrentIndex,
  setDisplayedData,
  setEntryData,
  setIsLoading,
} from "@/state/features/menus/activityLogSlice";
import { AppDispatch, RootState } from "@/state/store";

 const useActivityLogActions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const activityLogState = useSelector((state: RootState) => state.activityLog);
    
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

  const displayMoreData = (dataArr: EntryListSection[]) => {
    dispatch(setIsLoading(true));
    // don't run if there are filters on
    try {
      if (
        activityLogState.filterPeriod.length > 0 ||
        activityLogState.filterCategories.length > 0
      ) {
        return;
      }
      if (activityLogState.currentIndex < dataArr.length) {
        dispatch(
          setDisplayedData([
            ...activityLogState.displayedData,
            dataArr[activityLogState.currentIndex],
          ]),
        );
        dispatch(setCurrentIndex(activityLogState.currentIndex + 1));
      }
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const getFilteredData = () => {
    try {
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
    } catch (err) {
      console.error(err);
    }
  };

  const getUnfilteredData = (dataArr: EntryListSection[]) => {
    try {
      if (
        activityLogState.filterPeriod.length === 0 &&
        activityLogState.filterCategories.length === 0
      ) {
        // Reset displayedData to include all transformedData in case the filters have just been turned off
        dispatch(setDisplayedData(dataArr));
        //Load more if there is less than 10 on page
        fillPage(dataArr, 10);
        dispatch(setEntryData(dataArr));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fillPage = (dataArr: EntryListSection[], limitNum: number) => {
    //this function instantly displays a preset number of entries once it is called
    //the effects are visible instantly, unlike calling displayMoreData few times
    //and thus it ensures a seamless UI experience

    dispatch(setIsLoading(true));
    //!be double careful not to try to access a non-existant index!
    //!it had once ruined the whole component!
    try {
      if (
        dataArr.length > 1 &&
        dataArr.length > activityLogState.currentIndex &&
        dataArr[activityLogState.currentIndex].data.length < limitNum
      ) {
        dispatch(
          setDisplayedData([
            ...activityLogState.displayedData,
            dataArr[activityLogState.currentIndex],
            dataArr[activityLogState.currentIndex + 1],
          ]),
        );
        dispatch(setCurrentIndex(activityLogState.currentIndex + 2));
      } else {
        displayMoreData(dataArr);
      }
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return {
    transformData,
    displayMoreData,
    getFilteredData,
    getUnfilteredData,
    fillPage,
  };
};

export default useActivityLogActions;