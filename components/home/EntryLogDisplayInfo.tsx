import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import { Colors } from "@/constants/styles/colorTheme";
import { RootState } from "@/state/store";

const EntryLogDisplayInfo = () => {
  const { t } = useTranslation("home");
  const activityLogState = useSelector((state: RootState) => state.activityLog);

  return (
    <View className="h-full flex-row items-center justify-start pb-2">
      {activityLogState.filterPeriod.length > 0 ? (
        <View className="flex-row">
          <View className="ml-1 mr-2">
            <Text
              className="italic"
              style={{ fontSize: 13, color: Colors.darkGray }}
            >
              <Text style={{ fontSize: 13, color: Colors.darkGray }}>
                {t("activity_log.from_to")}
              </Text>
            </Text>
          </View>
          <View className="mb-1">
            <Text
              className="italic"
              style={{ fontSize: 13, color: Colors.darkGray }}
            >
              <Text style={{ fontSize: 13, color: Colors.darkGray }}>
                {activityLogState.filterPeriod[0]}
                {"\n"}
                {activityLogState.filterPeriod[1] ??
                  `${new Date().toISOString().split("T")[0]}`}
              </Text>
            </Text>
          </View>
        </View>
      ) : (
        <React.Fragment>
          {Array.isArray(activityLogState.displayedData) &&
            Array.isArray(activityLogState.entryData) && (
              <Text>
                {t("activity_log.showing_current_of_total", {
                  current: activityLogState.displayedData.reduce(
                    (sum, item) => sum + item.data.length,
                    0,
                  ),
                  total:
                    activityLogState.entryData &&
                    activityLogState.entryData.reduce(
                      (sum, item) => sum + item.data.length,
                      0,
                    ),
                })}
              </Text>
            )}
        </React.Fragment>
      )}
    </View>
  );
};
export default EntryLogDisplayInfo;
