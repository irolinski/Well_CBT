import React, { ReactNode } from "react";
import { Text, View } from "react-native";
import { getGroundingTime } from "@/app/tools/relax/ground_yourself/GroundYourself";
import BackButton from "@/components/BackButton";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_HEIGHT } from "@/constants/styles/values";
import { handleLogRelaxActivity } from "@/db/tools";

interface GroundYourselfSlideFrameProps {
  children: ReactNode;
  exerciseName: string;
  slideNum: number;
}

const GroundYourselfSlideFrame: React.FC<GroundYourselfSlideFrameProps> = ({
  children,
  exerciseName,
  slideNum,
}) => {
  return (
    <React.Fragment>
      <View
        className="top-0 z-10 mb-6 h-16 w-full flex-row items-center justify-between px-6 py-3"
        style={{ top: SCREEN_HEIGHT * 0.055 }}
      >
        <BackButton
          color={Colors.offBlack}
          handleBackButtonPress={() => {
            handleLogRelaxActivity(
              "ground_yourself",
              getGroundingTime(slideNum),
            );
          }}
        />
        <Text>{exerciseName}</Text>
      </View>
      <View
        style={{
          height: SCREEN_HEIGHT,
          paddingTop: SCREEN_HEIGHT * 0.025,
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
