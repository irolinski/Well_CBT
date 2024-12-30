import React from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

const EntryLogDisplayInfo = () => {
  const activityLogState = useSelector((state: RootState) => state.activityLog);

  return (
    <View className="h-full flex-row items-center justify-start pb-2">
      {activityLogState.filterPeriod.length > 0 ? (
        <View className="flex-row">
          <View className="ml-1 mr-2">
            <Text className="italic" style={{ fontSize: 13, color: "#757575" }}>
              <Text style={{ fontSize: 13, color: "#757575" }}>
                {"from:"}
                {"\nto:"}
              </Text>
            </Text>
          </View>
          <View className="mb-1">
            <Text className="italic" style={{ fontSize: 13, color: "#757575" }}>
              <Text style={{ fontSize: 13, color: "#757575" }}>
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
              <Text
                className="mb-1 text-sm"
                style={{ fontSize: 13, color: "#757575" }}
              >
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
  );
};
export default EntryLogDisplayInfo;
