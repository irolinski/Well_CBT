import { deviceName } from "expo-device";
import React, { ReactNode, useEffect } from "react";
import { Text, View } from "react-native";
import BackButton from "@/components/global/BackButton";
import { Colors } from "@/constants/styles/colorTheme";
import {
  REFERENCE_SMALL_DEVICE_HEIGHT,
  SCREEN_HEIGHT,
  WINDOW_HEIGHT,
} from "@/constants/styles/values";
import { handleLogRelaxActivity } from "@/db/tools";

interface GroundYourselfSlideFrameProps {
  children: ReactNode;
  exerciseName: string;
  slideNum: number;
  exerciseLenght: number;
}

const CONVENTIONAL_COMPLETE_EXERCISE_TIME_MIN = 15;

export const getGroundingTime = (
  numOfCompletedPages: number,
  exerciseLength: number,
) => {
  const fractionOfPagesCompleted = numOfCompletedPages / exerciseLength;

  return Math.floor(
    CONVENTIONAL_COMPLETE_EXERCISE_TIME_MIN * fractionOfPagesCompleted,
  );
};

const GroundYourselfSlideFrame: React.FC<GroundYourselfSlideFrameProps> = ({
  children,
  exerciseName,
  slideNum,
  exerciseLenght,
}) => {
  return (
    <React.Fragment>
      <View
        className={`z-10 w-full flex-row items-center justify-between px-6 ${SCREEN_HEIGHT >= REFERENCE_SMALL_DEVICE_HEIGHT ? "mb-6 h-16 py-3" : "mt-3 h-10"}`}
        style={{
          top:
            SCREEN_HEIGHT >= REFERENCE_SMALL_DEVICE_HEIGHT
              ? WINDOW_HEIGHT * 0.055
              : 0,
        }}
      >
        <BackButton
          color={Colors.offBlack}
          handleBackButtonPress={() => {
            handleLogRelaxActivity(
              "ground_yourself",
              getGroundingTime(slideNum, exerciseLenght),
            );
          }}
        />
        <Text>{exerciseName}</Text>
      </View>
      <View
        style={{
          height: WINDOW_HEIGHT,
          paddingTop:
            SCREEN_HEIGHT >= REFERENCE_SMALL_DEVICE_HEIGHT
              ? WINDOW_HEIGHT * 0.025
              : 0,
        }}
      >
        <View className="relative mx-4 mb-10 items-center pb-4">
          {/* Exercise slides */}
          <View className="h-full w-full px-4">{children}</View>
        </View>
      </View>
    </React.Fragment>
  );
};

export default GroundYourselfSlideFrame;
