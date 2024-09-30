import React from "react";
import { View, Text } from "react-native";
const ProgressBar = ({
  currentPage,
  numOfAllPages,
}: {
  currentPage: number;
  numOfAllPages: number;
}) => {
  return (
    <View className="">
      {Array.from({ length: numOfAllPages }).map((q: unknown, i: number) => {
        return (
          <View
            className="w-4 h-4 rounded-full"
            style={
              i + 1 > currentPage
                ? { backgroundColor: "#D9D9D9" }
                : { backgroundColor: "#4391BC" }
            }
            key={i}
          ></View>
        );
      })}
    </View>
  );
};
export default ProgressBar;
