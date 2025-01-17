import React, { ReactNode } from "react";
import { ColorValue, Dimensions, View } from "react-native";

import Text from "../global/Text";
import { ballSizeParameter } from "./AboutStats";
import StatBall from "./StatBall";

// setting ball size and row width takes two parameters - it is manipulated
// using left container size (height/width) (a fraction of windowWidth)
// AND a fraction of that size for the ball height/width

const StatRow = ({
  ballSizeParameter,
  caption,
  statNumber,
  icon,
  ballColor,
}: {
  ballSizeParameter: ballSizeParameter;
  caption: string;
  statNumber: number;
  icon: ReactNode;
  ballColor: ColorValue;
}) => {
  const windowWidth = Dimensions.get("window").width;
  const ballContainerSize = ballSizeParameter * windowWidth; // 0.6 = max, 0.25 = min
  const ballSize = 0.8 * ballContainerSize;

  return (
    <View className="relative w-full flex-row justify-center">
      <View className="w-full flex-row py-8">
        <View
          style={{
            width: "55%",
            height: ballSize,
          }}
        >
          <StatBall
            ballSize={ballSize}
            ballContainerSize={ballContainerSize}
            statNumber={statNumber}
            ballColor={ballColor}
          />
        </View>
        <View
          className="mx-4 items-center justify-center"
          style={{
            height: 50,
            width: 0.33 * windowWidth,
            top: ballSize * 0.6,
          }}
        >
          <View
            className="absolute w-full items-center"
            style={{ bottom: 7.5 }}
          >
            <View className="w-full flex-row justify-start">{icon}</View>
            <Text className="w-full pr-4 text-lg" style={{ color: "#757575" }}>
              {caption}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default StatRow;
