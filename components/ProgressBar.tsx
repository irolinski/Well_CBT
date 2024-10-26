import React from "react";
import { View } from "react-native";
const ProgressBar = ({
  currentPage,
  numOfAllPages,
}: {
  currentPage: number;
  numOfAllPages: number;
}) => {
  return (
    <View className="flex-row">
      {Array.from({ length: numOfAllPages }).map((q: unknown, i: number) => {
        return (
          <View
            className="mx-1 rounded-full"
            style={{
              width: 15,
              height: 15,
              backgroundColor: i + 1 > currentPage ? "#D9D9D9" : "#8DBED8",
            }}
            key={i}
          ></View>
        );
      })}
    </View>
  );
};
export default ProgressBar;
