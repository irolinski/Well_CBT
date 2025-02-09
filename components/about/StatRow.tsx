import React, { ReactNode } from "react";
import { ColorValue, Dimensions, View } from "react-native";
import { Colors } from "@/constants/styles/colorTheme";
import Text from "../global/Text";
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
  indexNum,
}: {
  ballSizeParameter: number;
  caption: string;
  statNumber: number;
  icon: ReactNode;
  ballColor: ColorValue;
  indexNum?: number;
}) => {
  const windowWidth = Dimensions.get("window").width;
  const ballContainerSize = ballSizeParameter * windowWidth; // 0.6 = max, 0.25 = min
  const ballSize = 0.8 * ballContainerSize;

  if (statNumber)
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
              statNumber={statNumber}
              ballColor={ballColor}
              indexNum={indexNum}
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
              style={{ bottom: ballSize * 0.15 }}
            >
              <View className="w-full flex-row justify-start">{icon}</View>
              <Text
                className="w-full pr-4 text-lg"
                style={{ color: Colors.darkGray }}
              >
                {caption}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
};

export default StatRow;
