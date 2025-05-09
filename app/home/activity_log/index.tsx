import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, SectionList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DividerLine from '@/components/DividerLine';
import MenuNav from '@/components/global/MenuNav';
import ActivityLogCard from '@/components/home/ActivityLogCard';
import ActivityLogDisplayInfo from '@/components/home/ActivityLogDisplayInfo';
import ActivityLogListPlaceholder from '@/components/home/ActivityLogListPlaceholder';
import FiltersButton from '@/components/home/FiltersButton';
import NewActivityModal from '@/components/home/NewActivityModal';
import NotificationButton from '@/components/home/NotificationsButton';
import NotificationsModal from '@/components/home/NotificationsModal';
import PlusButton from '@/components/home/PlusButton';
import LoadingIndicator from '@/components/LoadingIndicator';
import ToolHeader from '@/components/tools/ToolHeader';
import { EntryListSection, EntryViewTableRow } from '@/constants/models/home/activity_log';
import { Colors } from '@/constants/styles/colorTheme';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants/styles/values';
import { fetchEntryData } from '@/db/activity_log';
import {
    activityLogResetState, setIsLoading, setRawData
} from '@/state/features/menus/activityLogSlice';
import { AppDispatch, RootState } from '@/state/store';
import useActivityLogActions from './hooks';
import ActivityLogModal from './modal';

const ActivityLog = () => {
  const { t } = useTranslation(["home", "common"]);

  const dispatch = useDispatch<AppDispatch>();
  const activityLogState = useSelector((state: RootState) => state.activityLog);
  const isLoading = activityLogState.isLoading;
  const { transformData, displayMoreData, getFilteredData, getUnfilteredData } =
    useActivityLogActions();

  const fetchData = async () => {
    dispatch(setIsLoading(true)); // Set loading to true at the start
    try {
      const res = await fetchEntryData();
      if (!res) {
        console.error("no res!");
        Alert.alert(t("alerts.error"), t("alerts.error_db_fetching"));

        return;
      }
      dispatch(setRawData(res));
      const transformedData: EntryListSection[] = transformData(
        res as EntryViewTableRow[],
      );
      if (!transformData) {
        console.error("no transformed data!");
        Alert.alert(t("alerts.error"), t("alerts.error_db_fetching"));
        return;
      }

      // How to handle data if date filters are engaged
      getFilteredData();

      // How to handle data if filters are not engaged
      getUnfilteredData(transformedData);
    } catch (err) {
      console.error("Error fetching data:", err);
      Alert.alert(t("alerts.error"), t("alerts.error_db_fetching"));
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  useEffect(() => {
    fetchData();
  }, [activityLogState.filterPeriod, activityLogState.filterCategories]);

  return (
    <React.Fragment>
      <View
        className="h-full pb-8"
        style={{ backgroundColor: Colors.offWhite }}
      >
        {/* Nav */}
        <MenuNav
          name={t("activity_log.title")}
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
                <ActivityLogDisplayInfo />
              </View>
              <FiltersButton />
            </View>
            <DividerLine width={SCREEN_WIDTH * 0.9} />
          </View>
          {/* List */}
          <View
            className="relative px-1"
            style={{ height: SCREEN_HEIGHT * 0.75 }}
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
                    style={{ backgroundColor: Colors.offWhite }}
                  >
                    <ToolHeader style={{ marginBottom: 16, fontSize: 18 }}>
                      {t(`dates.months.${title.split(" ")[0]}.full`, {
                        ns: "common",
                      }) +
                        " " +
                        title.split(" ")[1]}
                    </ToolHeader>
                  </View>
                )}
                renderItem={({ item }: { item: EntryViewTableRow }) => (
                  <ActivityLogCard
                    toolName={item.activityName}
                    datetime={item.datetime}
                    link={`./show/${item.activityName}/${item.id}`}
                    value={item.value ? item.value : (item.value as undefined)}
                  />
                )}
                ListFooterComponent={
                  <DividerLine
                    viewStyle={{
                      marginBottom: SCREEN_HEIGHT * 0.1,
                      marginTop: SCREEN_HEIGHT * 0.05,
                    }}
                    width={SCREEN_WIDTH / 2}
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
                  <ActivityLogListPlaceholder />
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
