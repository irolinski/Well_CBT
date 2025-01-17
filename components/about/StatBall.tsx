import React from "react";
import { ColorValue, View } from "react-native";

import Text from "../global/Text";

const StatBall = ({
  ballSize,
  ballContainerSize,
  statNumber,
  ballColor,
}: {
  ballSize: number;
  ballContainerSize: number;
  statNumber: number;
  ballColor: ColorValue;
}) => {
  return (
    <View className="h-full w-full items-center justify-center">
      <View
        className="items-center justify-center rounded-full"
        style={{
          width: ballSize,
          height: ballSize,
          backgroundColor: ballColor,
        }}
      >
        <Text className="text-2xl font-bold" style={{ color: "#FFFFFF" }}>
          {statNumber}
        </Text>
      </View>
    </View>
  );
};

export default StatBall;
